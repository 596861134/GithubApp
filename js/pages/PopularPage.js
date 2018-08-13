import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
} from 'react-native';

import Color from '../common/Color'
import PopularTab from './PopularTab';
import NavigatorBar from '../common/NavigatorBar';
import LanguageDao, {FLAG_LANGUAGE} from "../expand/dao/LanguageDao";
import ScrollableTabView, {ScrollableTabBar, DefaultTabBar} from 'react-native-scrollable-tab-view';

export default class PopularPage extends Component {

    constructor(props) {
        super(props);
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.state = {
            data: [],
        };
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        this.languageDao.fetch()
            .then(result => {
                console.log(result);
                this.setState({
                    data: result,
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        let content = this.state.data.length > 0 ? <ScrollableTabView
            renderTabBar={() => <ScrollableTabBar/>}
            tabBarUnderlineStyle={{backgroundColor: 'white', height: 1}}
            tabBarBackgroundColor='#2196F3'
            tabBarActiveTextColor='white'
            tabBarInactiveTextColor='#e7e7e7'
            tabBarTextStyle={{fontSize: 15}}
        >
            {this.state.data.map((resule, i, arr) => {
                let lan = arr[i];
                return (lan.checked ?
                    <PopularTab key={i} tabLabel={lan.name} {...this.props}>{lan.path}</PopularTab> : null)
            })
            }
        </ScrollableTabView> : null;

        return (
            <View style={styles.container}>
                <NavigatorBar
                    title={'最热'}
                    style={{backgroundColor: Color.themeColor,}}
                    statusBar={{
                        backgroundColor: Color.themeColor,
                    }}
                />
                {content}
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