/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import {Navigator} from 'react-native-deprecated-custom-components';
import Boy from './test/Boy';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'home',
        };
    }

    render() {
        return (
            <View style={styles.container}>
                {/*<TabNavigator>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'home'}
                        selectedTitleStyle={{color: 'red'}}
                        title="最热"
                        renderIcon={() => <Image style={styles.images}
                                                 source={require('./res/images/ic_polular.png')}/>}
                        renderSelectedIcon={() => <Image style={[styles.images, {tintColor: 'red'}]}
                                                         source={require('./res/images/ic_polular.png')}/>}
                        onPress={() => this.setState({selectedTab: 'home'})}>
                        <View style={{flex: 1, backgroundColor: 'green'}}></View>
                    </TabNavigator.Item>

                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'profile'}
                        selectedTitleStyle={{color: 'red'}}
                        title="趋势"
                        renderIcon={() => <Image style={styles.images}
                                                 source={require('./res/images/ic_trending.png')}/>}
                        renderSelectedIcon={() => <Image style={[styles.images, {tintColor: 'red'}]}
                                                         source={require('./res/images/ic_trending.png')}/>}
                        onPress={() => this.setState({selectedTab: 'profile'})}>
                        <View style={{flex: 1, backgroundColor: 'yellow'}}></View>
                    </TabNavigator.Item>

                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'favorite'}
                        selectedTitleStyle={{color: 'red'}}
                        title="收藏"
                        renderIcon={() => <Image style={styles.images}
                                                 source={require('./res/images/ic_favorite.png')}/>}
                        renderSelectedIcon={() => <Image style={[styles.images, {tintColor: 'red'}]}
                                                         source={require('./res/images/ic_favorite.png')}/>}
                        badgeText="99+"
                        onPress={() => this.setState({selectedTab: 'favorite'})}>
                        <View style={{flex: 1, backgroundColor: 'green'}}></View>
                    </TabNavigator.Item>

                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'me'}
                        selectedTitleStyle={{color: 'red'}}
                        title="我的"
                        renderIcon={() => <Image style={styles.images}
                                                 source={require('./res/images/ic_my.png')}/>}
                        renderSelectedIcon={() => <Image style={[styles.images, {tintColor: 'red'}]}
                                                         source={require('./res/images/ic_my.png')}/>}
                        onPress={() => this.setState({selectedTab: 'me'})}>
                        <View style={{flex: 1, backgroundColor: 'yellow'}}></View>
                    </TabNavigator.Item>
                </TabNavigator>*/}

            <Navigator
                initialRoute={{
                    component:Boy,
                }}

                renderScene={(route,navigator)=>{
                    let Component = route.component;
                    return <Component navigator={navigator} {...route.params}/>
                }}/>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    images: {
        width: 22,
        height: 22,
    },
});
