import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    WebView, DeviceEventEmitter,
} from 'react-native';
import NavigatorBar from "../js/common/NavigatorBar";
import Color from "../js/common/Color";

const URL='https://www.imooc.com';

export default class WebViewTest extends Component{

    constructor(props) {
      super(props);
      this.state = {
          url:URL,
          title:'',
          canGoBack:false,
      };
    }

    goBack(){
        if (this.state.canGoBack) {
            this.webView.goBack()
        }else {
            DeviceEventEmitter.emit('showToast','已经到顶了');
        }

    }

    go(){
        this.setState({
            url:this.text,
        })
    }

    onNavigationStateChange(e){
        this.setState({
            title:e.title,
            canGoBack:e.canGoBack,
        })
    }

    render(){
        return (

            <View style={styles.container}>
                <NavigatorBar
                    title={'WebView使用'}
                    style={{backgroundColor: Color.themeColor,}}
                    statusBar={{
                        backgroundColor: Color.themeColor,
                    }}
                />

                <View style={styles.row}>
                    <Text style={styles.text} onPress={()=>{
                            this.goBack()
                        }}>返回</Text>
                    <TextInput style={styles.input}
                               defaultValue={URL}
                               onChangeText={text=>this.text=text}
                    />
                    <Text style={styles.text} onPress={()=>{
                            this.go()
                        }}>GO</Text>
                </View>

                <WebView
                    ref={webView=>this.webView=webView}
                    source={{uri:this.state.url}}
                    onNavigationStateChange={(e)=>this.onNavigationStateChange(e)}
                />

            </View>

        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    row:{flexDirection: 'row',
        width:'100%',
        height:40,
        marginTop:5,
        alignItems: 'center',
    },
    input:{
        flex: 1,
        height:'100%',
        borderWidth: 1,
        borderColor:'gray',
    },
    text:{
        width: '10%',
        textAlign:'center',
    },
});