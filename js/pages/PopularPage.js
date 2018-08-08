import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
} from 'react-native';

import {Navigator} from 'react-native-deprecated-custom-components';
import NavigatorBar from '../common/NavigatorBar';
import DataRepossitory from '../expand/dao/DataRepossitory';
import Api from '../common/Api';
import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view';

export default class PopularPage extends Component {

    constructor(props) {
        super(props);
        this.dataRepossitory = new DataRepossitory();
        this.state = {
            result: '',
        }
    }

    onLoad() {
        let url = this.getUrl(this.text);
        console.log('url:'+url);
        this.dataRepossitory.fetchNetRepossitory(url)
            .then(result => {
                console.log(result);
                this.setState({
                    result: result,
                })

            })
            .catch(error => {
                console.log(error);
                this.setState({
                    result: error,
                })
            })
    }

    getUrl(key) {
        return Api.serrchHeader + key + Api.serrchEnd;
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigatorBar
                    title={'最热'}
                    style={{backgroundColor: '#6495ED',}}
                    statusBar={{
                        backgroundColor: '#6495ED',
                    }}
                />

                <Text onPress={() => {
                    this.onLoad()
                }}>获取数据</Text>

                <TextInput
                    style={{height: 30, width: '90%', borderWidth:1,borderColor: 'gray', borderRadius: 5,}}
                    onChangeText={text => this.text = text}
                />

                <Text style={{flex: 1, fontSize: 10, color: 'black'}}>
                    {this.state.result}
                </Text>

            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    images: {
        width: 22,
        height: 22,
    },
});