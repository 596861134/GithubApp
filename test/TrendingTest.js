import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
} from 'react-native';
import Color from "../js/common/Color";
import NavigatorBar from "../js/common/NavigatorBar";
import Api from "../js/common/Api";
import GitHubTrending from "../js/common/trending/GitHubTrending";

export default class TrendingTest extends Component {

    constructor(props) {
      super(props);
      this.trending = new GitHubTrending();
      this.state = {
          data:'',
      };
    }

    onLoad(){
        let url = Api.trending+this.text;
        this.trending.fetchTrending(url)
            .then((data)=> {
                this.setState({
                    data:JSON.stringify(data),
                })
            }).catch((error)=> {
            this.setState({
                data:error,
            })
        });
    }

    render() {
        return (
            <View style={{flex: 1,backgroundColor:'white'}}>
                <NavigatorBar
                    title={'Trending使用'}
                    style={{backgroundColor: Color.themeColor,}}
                    statusBar={{
                        backgroundColor: Color.themeColor,
                    }}
                />
                <TextInput
                    style={{width:'100%', height:40, borderWidth: 1, borderColor:'gray'}}
                    onChangeText={text => this.text = text}
                />

                <Text style={{width:'100%',height:40, textAlign:'center'}}
                      onPress={()=>this.onLoad()}
                >获取数据</Text>
                <Text>
                    {this.state.data}
                </Text>
            </View>
        )
    }

}