import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
import Splash from './Splash';

function Setup() {
    class Root extends Component {

        renderScene(route, navigator){
            let Component = route.component;
            return <Component navigator={navigator} {...route.params}/>
        }

        render() {
            return (
                <Navigator
                    initialRoute={{
                        component: Splash,
                    }}
                    renderScene={
                        (route, navigator) => this.renderScene(route, navigator)
                    }/>
            )
        }
    }

    return <Root/>
}

export default Setup;