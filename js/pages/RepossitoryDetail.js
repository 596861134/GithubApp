import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    WebView,
    DeviceEventEmitter,
} from 'react-native';
import Color from "../common/Color";
import NavigatorBar from "../common/NavigatorBar";
import ViewUtil from "../util/ViewUtil";
import Api from "../common/Api";

export default class RepossitoryDetail extends Component {

    constructor(props) {
        super(props);
        this.url = this.props.data.item.html_url?this.props.data.item.html_url:Api.github+this.props.data.item.url;
        this.state = {
            url: this.url,
            title: this.props.data.item.full_name?this.props.data.item.full_name:this.props.data.item.fullName,
            canGoBack: false,
        };
    }

    onBack() {
        if (this.state.canGoBack) {
            this.webView.goBack()
        } else {
            this.props.navigator.pop();
            // DeviceEventEmitter.emit('showToast', '已经到顶了');
        }

    }

    go() {
        this.setState({
            url: this.text,
        })
    }

    onNavigationStateChange(e) {
        this.setState({
            // title: e.title,
            canGoBack: e.canGoBack,
        })
    }

    render() {
        console.log("uri:"+ this.state.url);
        return (
            <View style={styles.container}>

                <NavigatorBar
                    title={this.state.title}
                    style={{backgroundColor: Color.themeColor,}}
                    statusBar={{
                        backgroundColor: Color.themeColor,
                    }}
                    leftButton={ViewUtil.getLeftButton(() => this.onBack())}
                />

                <WebView
                    ref={webView => this.webView = webView}
                    source={{uri: this.state.url}}
                    startInLoadingState={true}
                    onNavigationStateChange={(e) => this.onNavigationStateChange(e)}
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
});