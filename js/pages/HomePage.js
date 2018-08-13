import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    DeviceEventEmitter,
} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
import TabNavigator from 'react-native-tab-navigator';
import PopularPage from './PopularPage';
import MyPage from "./my/MyPage";
import Color from '../common/Color'
import AsyncStorageTest from '../../test/AsyncStorageTest'
import Toast, {DURATION} from 'react-native-easy-toast'
import WebViewTest from "../../test/WebViewTest";
import TrendingTest from "../../test/TrendingTest";

export default class HomePage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'home',
        };
    }

    componentDidMount() {
        // this.listener = DeviceEventEmitter.addListener('',);
        this.listener = DeviceEventEmitter.addListener('showToast',text=>{
            this.toast.show(text,DURATION.LENGTH_SHORT);
        } )
    }

    componentWillUnmount() {
        this.listener&&this.listener.remove();
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
                        <PopularPage {...this.props}/>
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
                        <AsyncStorageTest />
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
                        {/*<WebViewTest />*/}
                        <TrendingTest />
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
                        <MyPage {...this.props}/>
                    </TabNavigator.Item>
                </TabNavigator>
                <Toast ref={toast=>this.toast=toast }/>
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