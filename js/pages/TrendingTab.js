import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    FlatList,
    RefreshControl,
    DeviceEventEmitter,
} from 'react-native';
import Api from "../common/Api";
import Color from "../common/Color";
import DataRepossitory, {FLAG_STORAGE} from "../expand/dao/DataRepossitory";
import RepossitoryDetail from "./RepossitoryDetail";
import TrendingCell from "../expand/dao/TrendingCell";

export default class TrendingTab extends Component {

    constructor(props) {
        super(props);
        this.dataRepossitory = new DataRepossitory(FLAG_STORAGE.flag_trending);
        this.state = {
            result: '',
            dataSource: [],
            loading: false,
            isLoading: false,
        }
    }

    componentWillMount() {
        this.onLoad(this.props.timeSpan);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.timeSpan!==this.props.timeSpan) {
            this.onLoad(nextProps.timeSpan)
        }
    }

    onRefresh(){
        this.onLoad(this.props.timeSpan);
    }

    onLoad(timeSpan) {
        this.setState({
            dataSource: [],
            isLoading: true,
        });
        let url = this.getUrl(timeSpan);
        console.log('url:' + url);
        // this.cacheData(url);//优先从缓存获取数据，判断逻辑有问题
        this.netWorkData(url);//直接从网络获取数据
    }

    getUrl(timeSpan) {
        return Api.trending + this.props.tabLabel + timeSpan.searchText;
    }

    /**
     * 从网络获取数据
     * @param url
     */
    netWorkData(url) {
        this.dataRepossitory.fetchNetRepossitory(url)
            .then((result) => {
                let items = result && result.items ? result.items : result ? result : [];
                this.setState({
                    dataSource: this.state.dataSource.concat(items),
                    loading: true,
                    isLoading: false,
                });
            })
            .catch(error => {
                console.log(JSON.stringify(error));
                this.setState({
                    isLoading: false,
                })
            })
    }

    /**
     * list分割线
     * @returns {*}
     */
    space() {
        return (<View style={{height: 10, width: '100%', backgroundColor: 'white'}}/>)
    }

    renderRow(rowData) {
        console.log(JSON.stringify(rowData))
        return (
            <TrendingCell
                onSelect={()=>this.onSelect(rowData)}
                data={rowData}/>
        )
    }

    /**
     * item点击事件处理
     * @param item
     */
    onSelect(item){
        console.log('item:'+item);
        this.props.navigator.push({
            component:RepossitoryDetail,
            params:{
                data:item,
                ...this.props,
            }
        })
    }


    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    style={styles.lists}
                    data={this.state.dataSource}
                    renderItem={(rowData) => this.renderRow(rowData)}
                    ItemSeparatorComponent={() => this.space()}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isLoading}
                            onRefresh={() => this.onRefresh()}
                            color={[Color.themeColor]}
                            tintColor={Color.themeColor}
                            title={'loading...'}
                            titleColor={Color.themeColor}
                        />
                    }
                    keyExtractor={(item) => item.fullName}
                />

            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    lists: {
        flex: 1,
    },
});