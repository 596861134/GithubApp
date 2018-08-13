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
import DataRepossitory from "../expand/dao/DataRepossitory";
import Api from "../common/Api";
import RepossitoryCell from "../expand/dao/RepossitoryCell";
import Color from '../common/Color'
import RepossitoryDetail from "./RepossitoryDetail";

export default class PopularTab extends Component {
    constructor(props) {
        super(props);
        this.dataRepossitory = new DataRepossitory();
        this.state = {
            result: '',
            dataSource: [],
            loading: false,
            isLoading: false,
        }
    }

    onLoad() {
        this.setState({
            dataSource: [],
            isLoading: true,
        });
        let url = Api.serrchHeader + this.props.tabLabel + Api.serrchEnd;
        console.log('url:' + url);
        this.dataRepossitory.fetchRepossitory(url)
            .then((result) => {
                let items = result && result.items ? result.items : result ? result : [];
                this.setState({
                    dataSource: this.state.dataSource.concat(items),
                    loading: true,
                    isLoading: false,
                });
                if(result && result.update_date && !this.dataRepossitory.checkDate(result.update_date)){
                    DeviceEventEmitter.emit('showToast','数据过时');
                    this.dataRepossitory.clearRepossitory(url);
                    this.dataRepossitory.fetchNetRepossitory(url);
                }else{
                    DeviceEventEmitter.emit('showToast','显示缓存数据');
                }
            })
            .then((items) => {
                if (!items || items.length === 0)return;
                this.setState({
                    dataSource: this.state.dataSource.concat(items),
                    loading: true,
                    isLoading: false,
                });
                DeviceEventEmitter.emit('showToast','显示网络数据');
            })
            .catch(error => {
                console.log(JSON.stringify(error));
                this.setState({
                    isLoading: false,
                })
            })
    }


    componentWillMount() {
        this.onLoad();
    }

    space() {
        return (<View style={{height: 10, width: '100%', backgroundColor: 'white'}}/>)
    }

    renderRow(rowData) {
        // console.log(rowData);
        return (
            <RepossitoryCell
                onSelect={()=>this.onSelect(rowData)}
                data={rowData}/>
        )
    }

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
        // if (!this.state.loading) {
        //     return (
        //         <View style={styles.container}>
        //             <Text>数据加载中...</Text>
        //         </View>
        //     )
        // }

        return (
            <View style={styles.container}>
                <FlatList
                    style={styles.lists}
                    data={this.state.dataSource}
                    renderItem={(rowData) => this.renderRow(rowData)}
                    // ListHeaderComponent={()=>this.space()}
                    // ListFooterComponent={()=>this.space()}
                    ItemSeparatorComponent={() => this.space()}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isLoading}
                            onRefresh={() => this.onLoad()}
                            color={[Color.themeColor]}
                            tintColor={Color.themeColor}
                            title={'loading...'}
                            titleColor={Color.themeColor}
                        />
                    }
                    keyExtractor={(item) => item.node_id}
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