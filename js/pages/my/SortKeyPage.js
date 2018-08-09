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

export default class SortKeyPage extends Component {

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

    onSave() {

    }

    onBack() {
        this.props.navigator.pop();
    }

    onClick() {

    }


    render() {
        let rightButton = (
            <TouchableOpacity onPress={() => this.onSave()}>
                <View>
                    <Text style={{color: 'white', fontSize: 15, marginRight: 5}}>保存</Text>
                </View>
            </TouchableOpacity>
        );

        return (
            <View style={styles.container}>
                <NavigatorBar
                    title={'标签排序'}
                    style={{backgroundColor: Color.themeColor,}}
                    statusBar={{
                        backgroundColor: Color.themeColor,
                    }}
                    leftButton={ViewUtil.getLeftButton(() => this.onBack())}
                    rightButton={rightButton}
                />
                <ScrollView>


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