import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    DeviceEventEmitter,
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import PopularPage from './PopularPage';
import MyPage from "./my/MyPage";
import Color from '../common/Color'
import AsyncStorageTest from '../../test/AsyncStorageTest'
import Toast, {DURATION} from 'react-native-easy-toast'
import TrendingPage from "./TrendingPage";

export default class HomePage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'home',
        };
    }

    componentDidMount() {
        this.listener = DeviceEventEmitter.addListener('showToast',text=>{
            this.toast.show(text,DURATION.LENGTH_SHORT);
        } )
    }

    componentWillUnmount() {
        this.listener&&this.listener.remove();
    }

    renderTab(selectedTab,title,image,Component){
        return <TabNavigator.Item
            selected={this.state.selectedTab === selectedTab}
            selectedTitleStyle={{color: Color.themeColor}}
            title= {title}
            renderIcon={() => <Image style={styles.images}
                                     source={image}/>}
            renderSelectedIcon={() => <Image style={[styles.images, {tintColor: Color.themeColor}]}
                                             source={image}/>}
            onPress={() => this.setState({selectedTab: selectedTab})}>
            <Component {...this.props}/>
        </TabNavigator.Item>
    }

    render() {
        return (
            <View style={styles.container}>
                <TabNavigator>
                    {this.renderTab('home','最热',require('../../res/images/ic_polular.png'),PopularPage)}
                    {this.renderTab('profile','趋势',require('../../res/images/ic_trending.png'),TrendingPage)}
                    {this.renderTab('favorite','收藏',require('../../res/images/ic_favorite.png'),AsyncStorageTest)}
                    {this.renderTab('me','我的',require('../../res/images/ic_my.png'),MyPage)}
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