import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    AsyncStorage,
} from 'react-native';
import Color from "../js/common/Color";
import NavigatorBar from "../js/common/NavigatorBar";
import Toast, {DURATION} from 'react-native-easy-toast'
const KEY = 'KEY';

export default class AsyncStorageTest extends Component {

    onSave() {
        if (this.text){
            AsyncStorage.setItem(KEY,this.text,(error)=>{
                if (!error){
                    this.toast.show('保存成功',DURATION.LENGTH_SHORT);
                }else{
                    this.toast.show('保存失败:'+error,DURATION.LENGTH_SHORT);
                }
            })
        } else {
            this.toast.show('保存内容不能为空',DURATION.LENGTH_SHORT);
        }

    }

    onRead() {
        AsyncStorage.getItem(KEY,(error,result)=>{
            if (!error){
                if (result!=='' && result!==null){
                    this.toast.show(result,DURATION.LENGTH_SHORT);
                }else{
                    this.toast.show('KEY不存在',DURATION.LENGTH_SHORT);
                }
            } else {
                this.toast.show('取出失败:'+error,DURATION.LENGTH_SHORT);
            }
        })
    }

    onDel() {
        AsyncStorage.removeItem(KEY,(error)=>{
            if (!error){
                this.toast.show('删除成功',DURATION.LENGTH_SHORT);
            }else{
                this.toast.show('删除失败:'+error,DURATION.LENGTH_SHORT);
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigatorBar
                    title={'趋势'}
                    style={{backgroundColor: Color.themeColor,}}
                    statusBar={{
                        backgroundColor: Color.themeColor,
                    }}
                />
                <TextInput
                    onChangeText={text=>this.text=text}
                    style={{
                        width: "100%",
                        height: 30,
                        borderWidth: 1,
                        borderColor: 'gray',
                    }}
                />

                <View style={styles.button}>
                    <Text style={styles.text} onPress={() => this.onSave()}>保存</Text>
                    <Text style={styles.text} onPress={() => this.onRead()}>读取</Text>
                    <Text style={styles.text} onPress={() => this.onDel()}>清空</Text>
                </View>
                <Toast ref={toast=>this.toast=toast }/>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    button: {
        width: "100%",
        marginTop: 5,
        flexDirection: 'row',
    },
    text: {
        flex: 1
    },
});