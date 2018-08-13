import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
    AsyncStorage,
    Alert,
} from 'react-native';
import NavigatorBar from "../../common/NavigatorBar";
import Color from "../../common/Color";
import ViewUtil from "../../util/ViewUtil";
import LanguageDao, {FLAG_LANGUAGE} from "../../expand/dao/LanguageDao";
import CheckBox from 'react-native-check-box'
import ArrayUtil from "../../util/ArrayUtil";

export default class CustomKeyPage extends Component {

    constructor(props) {
        super(props);
        this.isRemove = this.props.isRemoveKey?true:false;
        this.languageDao = new LanguageDao(this.props.flag);
        this.changeValues = [];
        this.state = {
            data: [],
            isClick: false,
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

    onSave() {
        if (this.changeValues.length === 0) {
            this.props.navigator.pop();
            return;
        }

        for (let i = 0, len = this.changeValues.length; i < len; i++) {
            ArrayUtil.remove(this.changeValues,this.changeValues[i]);
        }

        this.languageDao.save(this.state.data);
        this.props.navigator.pop();

    }

    onBack() {
        if (this.changeValues.length > 0) {
            Alert.alert(
                '提示',
                '你想在退出前保存更改吗？',
                [
                    {
                        text: 'No', onPress: () => {
                            this.props.navigator.pop();
                        }
                    }, {
                    text: 'Yes', onPress: () => {
                        this.onSave();
                    }
                }
                ]
            )
        } else {
            this.props.navigator.pop();
        }
    }

    onClick(data) {
        if (!this.isRemove) data.checked = !data.checked;
        ArrayUtil.updateArray(this.changeValues, data);
        this.setState({
            isClick: !this.state.isClick,
        })
    }

    renderCheckBox(data) {
        let leftText = data.name;
        let isCheck = this.isRemove?false:data.checked;
        return (
            <CheckBox
                style={{flex: 1, padding: 10}}
                onClick={() => this.onClick(data)}
                isChecked={isCheck}
                leftText={leftText}
                checkedImage={<Image source={require('../../../res/images/ic_check_box.png')}
                                     style={{tintColor: Color.themeColor}}/>}
                unCheckedImage={<Image
                    source={require('../../../res/images/ic_check_box_outline_blank.png')}
                    style={{tintColor: Color.themeColor}}/>}
            />);
    }

    renderView() {
        if (!this.state.data || this.state.data.length === 0) return null;
        let length = this.state.data.length;
        let views = [];
        for (let i = 0, l = length - 2; i < l; i += 2) {
            views.push(
                <View key={i} style={styles.item}>
                    {this.renderCheckBox(this.state.data[i])}
                    {this.renderCheckBox(this.state.data[i + 1])}
                </View>
            )
        }

        views.push(
            <View key={length - 1}>
                <View style={styles.item}>
                    {length % 2 === 0 ? <Text
                        style={styles.text}>{this.renderCheckBox(this.state.data[length - 2])}</Text> : null}
                    {this.renderCheckBox(this.state.data[length - 1])}
                </View>
            </View>);
        return views;

    }

    render() {
        let title = this.isRemove?'标签移除':'自定义标签';
        title=this.props.flag===FLAG_LANGUAGE.flag_language?'自定义语言':title;
        let rightButton = (
            <TouchableOpacity onPress={() => this.onSave()}>
                <View>
                    <Text style={{color: 'white', fontSize: 15, marginRight: 5}}>
                        {this.isRemove?'移除':'保存'}
                    </Text>
                </View>
            </TouchableOpacity>
        );

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
                <ScrollView>
                    {this.renderView()}
                </ScrollView>

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