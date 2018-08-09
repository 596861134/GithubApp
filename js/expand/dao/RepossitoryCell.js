import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';

export default class RepossitoryCell extends Component {

    render() {
        return (
            <TouchableOpacity >
                <View style={styles.root}>
                    <Text style={styles.project}>{this.props.data.item.full_name}</Text>
                    <Text style={styles.description}>{this.props.data.item.description}</Text>

                    <View style={styles.useInfo}>
                        <View style={styles.owner}>
                            <Image source={{uri: this.props.data.item.owner.avatar_url}}
                                   style={styles.ownerImg}/>
                            <Text
                                style={styles.ownerName}>{this.props.data.item.owner.login}</Text>
                        </View>

                        <View style={styles.stargazers}>
                            <Text style={styles.ownerName}>Stars:</Text>
                            <Text
                                style={styles.ownerName}>{this.props.data.item.stargazers_count}</Text>
                        </View>

                        <View style={{
                            flex: 1,
                            flexDirection: 'row-reverse',
                            alignItems: 'center'
                        }}>
                            <Image source={require('../../../res/images/ic_star.png')}
                                   style={{width: 20, height: 20}}/>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

}

const styles = StyleSheet.create({
    root: {
        justifyContent: 'center',
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10,
        padding: 5,
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderColor: '#dddddd',
        borderRadius: 2,
        shadowColor: 'gray',
        shadowOffset: {width: 0.5, height: 0.5},
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation: 5,
    },
    project: {
        fontSize: 18,
        color: 'black',
    },
    description: {
        fontSize: 15,
        color: 'gray',
        marginTop: 5,
    },
    useInfo: {
        marginTop: 5,
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    owner: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    ownerName: {
        textAlign: 'center',
        fontSize: 15,
        color: 'gray',
    },
    ownerImg: {
        width: 30,
        height: 30,
        margin: 5,
    },
    stargazers: {
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1,
    },

});