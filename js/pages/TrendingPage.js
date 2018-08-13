import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
} from 'react-native';
import Api from "../common/Api";
import Color from "../common/Color";
import TrendingTab from "./TrendingTab";
import TimeSpan from "../model/TimeSpan";
import NavigatorBar from "../common/NavigatorBar";
import LanguageDao from "../expand/dao/LanguageDao";
import {FLAG_LANGUAGE} from "../expand/dao/LanguageDao";
import ScrollableTabView, {ScrollableTabBar} from "react-native-scrollable-tab-view";
import Popover from 'react-native-popover-view'

var timeSpanArray = [
    new TimeSpan('今天', Api.today),
    new TimeSpan('本周', Api.week),
    new TimeSpan('本月', Api.monthly)];


export default class TrendingPage extends Component {

    constructor(props) {
        super(props);
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_language);
        this.state = {
            data: [],
            isVisible: false,
            timeSpan: timeSpanArray[0],
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

    showPopover() {
        this.setState({isVisible: true});
    }

    closePopover() {
        this.setState({isVisible: false});
    }

    renderTitleView() {
        return (
            <View>
                <TouchableOpacity ref={ref => this.touchable = ref} onPress={() => {
                    this.showPopover()
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            fontSize: 22,
                            color: 'white'
                        }}>趋势 {this.state.timeSpan.showText}</Text>
                        <Image style={{width: 12, height: 12, marginLeft: 5}}
                               source={require('../../res/images/ic_spinner_triangle.png')}/>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        let content = (this.state.data.length > 0 ?
                <ScrollableTabView
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
                            <TrendingTab key={i}
                                         timeSpan={this.state.timeSpan}
                                         tabLabel={lan.name}
                                         {...this.props}>{lan.path}</TrendingTab> : null)
                    })
                    }

                </ScrollableTabView> : null
        );

        let timeSpanView = (
            <Popover
                isVisible={this.state.isVisible}
                fromView={this.touchable}
                placement='bottom'
                onClose={() => this.closePopover()}>
                {timeSpanArray.map((resule, i, arr) => {
                    let len = arr[i];
                    return <TouchableOpacity key={i} style={{width: 90}}>
                        <Text style={{
                            color: 'black',
                            textAlign: 'center',
                            margin: 5
                        }}
                              onPress={() => this.onSelectSpan(len)}
                        >{len.showText}</Text>
                    </TouchableOpacity>
                })
                }
            </Popover>
        );

        return (
            <View style={styles.container}>
                <NavigatorBar
                    titleView={this.renderTitleView()}
                    style={{backgroundColor: Color.themeColor,}}
                    statusBar={{
                        backgroundColor: Color.themeColor,
                    }}
                />
                {content}
                {timeSpanView}
            </View>
        )
    }

    onSelectSpan(len) {
        this.setState({
            isVisible: false,
            timeSpan: len,
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});