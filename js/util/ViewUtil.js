import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';

export default class ViewUtil {

    static getLeftButton(callBack) {
        return (
            <TouchableOpacity onPress={callBack}>
                <Image style={styles.image}
                       source={require('../../res/images/ic_arrow_back_white_36pt.png')}/>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    image:{
        width:30,
        height:30,
        margin: 5,
    },
});