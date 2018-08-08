import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
} from 'react-native';

import NavigatorBar from '../common/NavigatorBar';
// import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view';
import ScrollableTabView,{DefaultTabBar} from 'react-native-scrollable-tab-view';
import PopularTab from './PopularTab';

export default class PopularPage extends Component {

    render() {
        return (
            <View style={styles.container}>
                <NavigatorBar
                    title={'最热'}
                    style={{backgroundColor: '#6495ED',}}
                    statusBar={{
                        backgroundColor: '#6495ED',
                    }}
                />
                <ScrollableTabView
                    renderTabBar={() => <DefaultTabBar />}
                    tabBarUnderlineStyle={{backgroundColor:'#6495ED'}}
                    tabBarBackgroundColor='#FFFFFF'
                    tabBarActiveTextColor='#6495ED'
                    tabBarInactiveTextColor='#000000'
                    tabBarTextStyle={{fontSize: 15,paddingTop: 15}}
                    // renderTabBar={()=><ScrollableTabBar />}
                >
                    <PopularTab tabLabel='JAVA'>JAVA</PopularTab>
                    <PopularTab tabLabel='IOS'>IOS</PopularTab>
                    <PopularTab tabLabel='Android'>Android</PopularTab>
                    <PopularTab tabLabel='JavaScript'>JavaScript</PopularTab>
                </ScrollableTabView>

            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    images: {
        width: 22,
        height: 22,
    },
});