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
import ScrollableTabView,{ScrollableTabBar,DefaultTabBar} from 'react-native-scrollable-tab-view';
import PopularTab from './PopularTab';

export default class PopularPage extends Component {

    constructor(props) {
      super(props);
      this.state = {
          tabShow: false,
      };
    }

    componentDidMount() {
        this.timer = setTimeout(() => {
            this.setState({
                tabShow: true
            });
        }, 0)
    }

    componentWillUnmount() {
        this.timer&&clearTimeout(this.timer);
    }

    render() {
        if (this.state.tabShow){
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
                        renderTabBar={()=><ScrollableTabBar />}
                        tabBarUnderlineStyle={{backgroundColor:'#FFFFFF',height: 1}}
                        tabBarBackgroundColor='#6495ED'
                        tabBarActiveTextColor='#FFFFFF'
                        tabBarInactiveTextColor='#e7e7e7'
                        tabBarTextStyle={{fontSize: 15}}
                    >
                        <PopularTab tabLabel='JAVA'>JAVA</PopularTab>
                        <PopularTab tabLabel='IOS'>IOS</PopularTab>
                        <PopularTab tabLabel='Android'>Android</PopularTab>
                        <PopularTab tabLabel='JavaScript'>JavaScript</PopularTab>
                    </ScrollableTabView>

                </View>
            )
        }

        return(
            <View />
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