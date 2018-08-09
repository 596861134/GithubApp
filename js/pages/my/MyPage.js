import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    AsyncStorage,
} from 'react-native';

import Color from "../../common/Color";
import NavigatorBar from "../../common/NavigatorBar";
import CustomKeyPage from "./CustomKeyPage";

export default class MyPage extends Component{

    constructor(props) {
        super(props);
        this.state = {};
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
                }}>自定义标签</Text>

            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});