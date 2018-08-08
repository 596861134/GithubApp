import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
} from 'react-native';

import {Navigator} from 'react-native-deprecated-custom-components';
import NavigatorBar from '../common/NavigatorBar';
import DataRepossitory from '../expand/dao/DataRepossitory';
import Api from '../common/Api';
import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view';
import PopularTab from './PopularTab';

export default class PopularPage extends Component {

    constructor(props) {
        super(props);
        this.dataRepossitory = new DataRepossitory();
        this.state = {
            result: '',
        }
    }

    onLoad() {
        let url = this.getUrl(this.text);
        console.log('url:'+url);
        this.dataRepossitory.fetchNetRepossitory(url)
            .then(result => {
                console.log(result);
                this.setState({
                    result: result,
                })

            })
            .catch(error => {
                console.log(error);
                this.setState({
                    result: error,
                })
            })
    }

    getUrl(key) {
        return Api.serrchHeader + key + Api.serrchEnd;
    }

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
                <ScrollableTabView initialPage={0} renderTabBar={()=><ScrollableTabBar />}>
                    <PopularTab tabLabel='java'>JAVA</PopularTab>
                    <PopularTab tabLabel='ios'>IOS</PopularTab>
                    <PopularTab tabLabel='android'>Android</PopularTab>
                    <PopularTab tabLabel='javaScript'>JavaScript</PopularTab>
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