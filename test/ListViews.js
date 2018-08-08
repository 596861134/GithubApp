import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    RefreshControl,
    TouchableOpacity,
    FlatList,
} from 'react-native';

import NavigatorBar from '../res/js/NavigatorBar';

let data = {
    "result": [
        {
            "email": "f.lee@taylor.edu",
            "fullName": "张三张三张三张三"
        },
        {
            "email": "g.jackson@hall.net",
            "fullName": "张三张三张三张三张三"
        },
        {
            "email": "l.hall@rodriguez.com",
            "fullName": "张三张三张三张三"
        },
        {
            "email": "q.lopez@davis.io",
            "fullName": "张三张三张三张三"
        },
        {
            "email": "c.gonzalez@perez.net",
            "fullName": "张三张三张三"
        },
        {
            "email": "a.johnson@williams.net",
            "fullName": "张三张三"
        },
        {
            "email": "i.anderson@lopez.edu",
            "fullName": "张三张三"
        },
        {
            "email": "r.lee@davis.org",
            "fullName": "张三张三"
        },
        {
            "email": "o.young@lee.edu",
            "fullName": "张三张三张三张三张三"
        },
        {
            "email": "j.wilson@williams.org",
            "fullName": "张三张三张三张三张三"
        },
        {
            "email": "z.walker@jackson.io",
            "fullName": "张三张三"
        },
        {
            "email": "j.martinez@brown.gov",
            "fullName": "张三张三张三张三"
        },
        {
            "email": "y.martin@lewis.io",
            "fullName": "张三张三张三张三"
        },
        {
            "email": "w.taylor@gonzalez.org",
            "fullName": "张三张三"
        },
        {
            "email": "j.thomas@garcia.org",
            "fullName": "张三张三张三张三"
        }
    ],
    "statusCode": 0
};

var Dimensions = require('Dimensions');
var ScreenWidth = Dimensions.get('window').width;
var ScreenHeight = Dimensions.get('window').height;

export default class ListViews extends Component{

    _keyExtractor = (item, index) => index;

    constructor(props) {
      super(props);
      this.state = {
          dataSource: data.result,
          isLoading: true,
      };
    }

    renderRow(rowData) {
        return (
            <View>
                <TouchableOpacity >
                    <Text style={styles.item}>
                        {rowData.item.fullName}
                    </Text>
                    <Text style={styles.item}>
                        {rowData.item.email}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    space() {
        return(<View style={{height: 1, width: '100%', backgroundColor: 'black'}}/>)
    }

    renderFooter() {
        return (
            <View>
                <Image
                    style={{width: ScreenWidth, height: 60}}
                    source={{uri: 'https://www.zhaoxi.net/images/mymake/2014/9/201409011731173116.gif'}}/>
            </View>
        )
    }

    onReload() {
        setTimeout(()=> {
            this.setState({
                isLoading: false
            })

        }, 2000);
    }

    render(){
        return(
            <View style={styles.container}>
                <NavigatorBar title='ListView' />

                <FlatList
                    style={styles.lists}
                    data={this.state.dataSource}
                    renderItem={(rowData) => this.renderRow(rowData)}
                    ItemSeparatorComponent={()=>this.space()}
                    keyExtractor={this._keyExtractor}
                    ListFooterComponent={()=>this.renderFooter()}
                    ListHeaderComponent={()=>this.renderFooter()}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isLoading}
                            onRefresh={this.onReload()}
                        />
                    }
                />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    item: {
        height: 40,
        padding: 5,
        fontSize:20,
        color:'black',
    },
    lists:{
        flex: 1,
    },
});