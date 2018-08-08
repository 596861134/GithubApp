import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
import HomePage from './HomePage';

export default class Splash extends Component{

    componentDidMount() {
        this.timer = setTimeout(()=>{
            this.props.navigator.resetTo({
                component:HomePage,
            })
        },2000)
    }

    componentWillUnmount() {
        this.timer&&clearTimeout(this.timer);
    }

    render(){
        return <View style={{height:'100%',justifyContent: 'center',alignItems: 'center'}}>
            <Text>欢迎</Text>
        </View>
    }

}