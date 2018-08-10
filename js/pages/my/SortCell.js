import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
} from 'react-native';
import Color from "../../common/Color";

export default class SortCell extends Component {
    render() {
        console.log(this.props.row);
        return (
            <TouchableHighlight
                underlayColor={'#eee'}
                delayLongPress={500}
                style={styles.touch}
                {...this.props.sortHandlers}
            >
                <View style={styles.container}>
                    <Image style={styles.image}
                           source={require('../../../res/images/ic_sort.png')}/>
                    <Text style={styles.text}>{this.props.data.name}</Text>
                </View>

            </TouchableHighlight>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 0.3,
        borderBottomColor: Color.e7,
    },
    image: {
        tintColor: Color.themeColor,
        width: 20,
        height: 20
    },
    text: {
        textAlign: 'center',
        marginLeft: 10
    },
    touch: {
        padding: 5,
        backgroundColor: '#F8F8F8',
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
});