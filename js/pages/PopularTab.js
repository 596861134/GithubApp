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
} from 'react-native';
import DataRepossitory from "../expand/dao/DataRepossitory";
import Api from "../common/Api";
import RepossitoryCell from "../expand/dao/RepossitoryCell";

export default class PopularTab extends Component{
    constructor(props) {
        super(props);
        this.dataRepossitory = new DataRepossitory();
        this.state = {
            result: '',
            dataSource:[],
            loading:false,
        }
    }

    onLoad() {
        let url = Api.serrchHeader + this.props.tabLabel + Api.serrchEnd;
        console.log('url:'+url);
        this.dataRepossitory.fetchNetRepossitory(url)
            .then((resultData)=>{
                this.setState({
                    dataSource:this.state.dataSource.concat(resultData.items),
                    loading:true,
                })
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    result: JSON.stringify(error),
                })
            })
    }


    componentWillMount() {
        this.onLoad();
    }

    space() {
        return(<View style={{height: 10, width: '100%', backgroundColor: 'white'}}/>)
    }

    renderRow(rowData){
        console.log(rowData);
        return(
            <RepossitoryCell data={rowData}/>
        )
    }


    render(){
        if (!this.state.loading) {
            return (
                <View style={styles.container}>
                    <Text>数据加载中...</Text>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <FlatList
                    style={styles.lists}
                    data={this.state.dataSource}
                    renderItem={(rowData) => this.renderRow(rowData)}
                    ListHeaderComponent={()=>this.space()}
                    ListFooterComponent={()=>this.space()}
                    ItemSeparatorComponent={()=>this.space()}
                    keyExtractor={(item)=>item.node_id}
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
    lists:{
        flex: 1,
    },
});