import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    AsyncStorage,
} from 'react-native';

import Color from "../../common/Color";
import SortKeyPage from "./SortKeyPage";
import CustomKeyPage from "./CustomKeyPage";
import NavigatorBar from "../../common/NavigatorBar";
import Toast, {DURATION} from 'react-native-easy-toast'
import LanguageDao, {FLAG_LANGUAGE} from "../../expand/dao/LanguageDao";

export default class MyPage extends Component{

    constructor(props) {
        super(props);
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.state = {

        };
    }


    render() {
        return (
            <View style={styles.container}>
                <NavigatorBar
                    title={'我的'}
                    style={{backgroundColor: Color.themeColor,}}
                    statusBar={{
                        backgroundColor: Color.themeColor,
                    }}
                />

                <Text onPress={()=>{
                    this.props.navigator.push({
                        component:CustomKeyPage,
                        params:{...this.props}
                    })
                }} style={styles.item}>自定义标签</Text>

                <Text onPress={()=>{
                    this.props.navigator.push({
                        component:SortKeyPage,
                        params:{...this.props}
                    })
                }} style={styles.item}>标签排序</Text>

                <Text onPress={()=>{
                    this.languageDao.del()
                        .then(result=>{
                            this.toast.show(result,DURATION.LENGTH_SHORT);
                        })
                }} style={styles.item}>清除缓存</Text>

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
    item:{
        width:"100%",
        height:50,
        padding: 10,
        fontSize:16,
    },
});