import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    AsyncStorage,
    Alert,
} from 'react-native';
import SortCell from "./SortCell";
import Color from "../../common/Color";
import ViewUtil from "../../util/ViewUtil";
import ArrayUtil from "../../util/ArrayUtil";
import NavigatorBar from "../../common/NavigatorBar";
import SortableListView from 'react-native-sortable-listview'
import LanguageDao, {FLAG_LANGUAGE} from "../../expand/dao/LanguageDao";


export default class SortKeyPage extends Component {

    constructor(props) {
        super(props);
        this.dataArray = [];//原始数据
        this.sortResultArray = [];//排序后新生成的数组
        this.originalArray = [];    //上次排序的结果
        this.languageDao = new LanguageDao(this.props.flag);
        this.state = {
            checkArray: [],//选中的数组

        };
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        this.languageDao.fetch()
            .then(result => {
                this.getCheckResult(result);
            })
            .catch(error => {
                console.log(error);
            })
    }

    getCheckResult(result) {
        this.dataArray = result;
        let check = [];
        for (let i = 0, len = result.length; i < len; i++) {
            let data = result[i];
            if (data.checked) {
                check.push(data);
            }
        }

        this.setState({
            checkArray: check,
        });
        this.originalArray = ArrayUtil.clone(check);
    }

    onSave() {
        if (ArrayUtil.isEqual(this.originalArray, this.state.checkArray)) {
            this.props.navigator.pop();
        } else {
            this.getSortResult();
            this.languageDao.save(this.sortResultArray)
            this.props.navigator.pop();
        }
    }

    onBack() {
        if (ArrayUtil.isEqual(this.originalArray, this.state.checkArray)) {
            this.props.navigator.pop();
        } else {
            Alert.alert(
                '提示',
                '你想在退出前保存更改吗？',
                [
                    {
                        text: 'No', onPress: () => {
                            this.props.navigator.pop();
                        }
                    },
                    {
                        text: 'Yes', onPress: () => {
                            this.onSave();
                        }
                    }
                ]
            )
        }

    }

    getSortResult() {
        this.sortResultArray = ArrayUtil.clone(this.dataArray);
        for (let i = 0, len = this.originalArray.length; i < len; i++) {
            let item = this.originalArray[i];
            let index = this.dataArray.indexOf(item);
            this.sortResultArray.splice(index,1,this.state.checkArray[i]);
        }
    }

    render() {
        let rightButton = (
            <TouchableOpacity onPress={() => this.onSave()}>
                <View>
                    <Text style={{color: 'white', fontSize: 15, marginRight: 5}}>保存</Text>
                </View>
            </TouchableOpacity>
        );
        let title = this.props.flag===FLAG_LANGUAGE.flag_language?'语言排序':'标签排序';
        return (

            <View style={styles.container}>
                <NavigatorBar
                    title={title}
                    style={{backgroundColor: Color.themeColor,}}
                    statusBar={{
                        backgroundColor: Color.themeColor,
                    }}
                    leftButton={ViewUtil.getLeftButton(() => this.onBack())}
                    rightButton={rightButton}
                />
                <SortableListView
                    style={{flex: 1}}
                    data={this.state.checkArray}
                    order={Object.keys(this.state.checkArray)}
                    onRowMoved={e => {
                        this.state.checkArray.splice(e.to, 0, this.state.checkArray.splice(e.from, 1)[0]);
                        this.forceUpdate()
                    }}
                    renderRow={row => <SortCell data={row}/>}
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
    item: {
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 0.3,
        borderBottomColor: Color.e7,
    },
    text: {
        flex: 1,
    },
});