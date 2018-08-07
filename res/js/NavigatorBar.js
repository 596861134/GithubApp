import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, StatusBar} from 'react-native';
import PropTypes from 'prop-types';
import ViewPropTypes from 'ViewPropTypes';

const NAV_BAR_HEIGHT_ANDROID = 50;
const NAV_BAR_HEIGHT_IOS = 44;
const STATUS_BAR_HEIGHT = 20;

const StatusBarShape = {
    barStyle: PropTypes.oneOf(['default', 'light-content', 'dark-content']),
    hidden: PropTypes.bool,
    backgroundColor: PropTypes.string,
};

export default class NavigatorBar extends Component {

    static propTypes = {
        style: ViewPropTypes.style,
        title: PropTypes.string,
        titleView: PropTypes.element,
        hide: PropTypes.bool,
        rightButton: PropTypes.element,
        leftButton: PropTypes.element,
        statusBar: PropTypes.shape(StatusBarShape),
    };

    static defaultProps = {
        statusBar: {
            barStyle: 'light-content',
            hidden: false,
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            hide: false,
        };
    };

    render() {
        let status = (
            <View style={styles.statusBar}>
                <StatusBar {...this.props.statusBar}/>
            </View>
        );

        let titleView = (
            this.props.titleView ? this.props.titleView
                : <Text style={styles.title}>{this.props.title}</Text>
        );

        let content = (
            <View style={styles.navBar}>
                {this.props.leftButton}
                <View style={styles.titleView}>
                    {titleView}
                </View>
                {this.props.rightButton}
            </View>
        );

        return (
            <View style={[styles.container, this.props.style]}>
                {status}
                {content}
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'gray',
    },
    navBar: {
        justifyContent: 'space-between',
        alignItems: 'center',
        height: Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID,
        flexDirection: 'row',
    },
    titleView: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 40,
        right: 40,
        top: 0,
        bottom: 0,
    },
    title: {
        fontSize: 22,
        color: 'white',
    },
    statusBar: {
        height: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT : 0,
    },
});