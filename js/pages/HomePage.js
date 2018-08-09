import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
import TabNavigator from 'react-native-tab-navigator';
import PopularPage from './PopularPage';
import Color from '../common/Color'

export default class HomePage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'home',
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <TabNavigator>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'home'}
                        selectedTitleStyle={{color: Color.themeColor}}
                        title="最热"
                        renderIcon={() => <Image style={styles.images}
                                                 source={require('../../res/images/ic_polular.png')}/>}
                        renderSelectedIcon={() => <Image style={[styles.images, {tintColor: Color.themeColor}]}
                                                         source={require('../../res/images/ic_polular.png')}/>}
                        onPress={() => this.setState({selectedTab: 'home'})}>
                        <PopularPage />
                    </TabNavigator.Item>

                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'profile'}
                        selectedTitleStyle={{color: Color.themeColor}}
                        title="趋势"
                        renderIcon={() => <Image style={styles.images}
                                                 source={require('../../res/images/ic_trending.png')}/>}
                        renderSelectedIcon={() => <Image style={[styles.images, {tintColor: Color.themeColor}]}
                                                         source={require('../../res/images/ic_trending.png')}/>}
                        onPress={() => this.setState({selectedTab: 'profile'})}>
                        <View style={{flex: 1, backgroundColor: 'yellow'}}></View>
                    </TabNavigator.Item>

                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'favorite'}
                        selectedTitleStyle={{color: Color.themeColor}}
                        title="收藏"
                        renderIcon={() => <Image style={styles.images}
                                                 source={require('../../res/images/ic_favorite.png')}/>}
                        renderSelectedIcon={() => <Image style={[styles.images, {tintColor: Color.themeColor}]}
                                                         source={require('../../res/images/ic_favorite.png')}/>}
                        badgeText="99+"
                        onPress={() => this.setState({selectedTab: 'favorite'})}>
                        <View style={{flex: 1, backgroundColor: 'green'}}></View>
                    </TabNavigator.Item>

                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'me'}
                        selectedTitleStyle={{color: Color.themeColor}}
                        title="我的"
                        renderIcon={() => <Image style={styles.images}
                                                 source={require('../../res/images/ic_my.png')}/>}
                        renderSelectedIcon={() => <Image style={[styles.images, {tintColor: Color.themeColor}]}
                                                         source={require('../../res/images/ic_my.png')}/>}
                        onPress={() => this.setState({selectedTab: 'me'})}>
                        <View style={{flex: 1, backgroundColor: 'yellow'}}></View>
                    </TabNavigator.Item>
                </TabNavigator>
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