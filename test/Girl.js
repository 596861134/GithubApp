import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import styles from './styles';
import NavigatorBar from '../js/common/NavigatorBar';


export default class Girl extends Component {

    renderImage(image) {
        return (
            <TouchableOpacity onPress={()=>{
                this.props.navigator.pop();
            }}>
                <Image style={styles.image} source={image}/>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigatorBar title={'Girl'}
                              style={{backgroundColor: '#FFC1C1',}}
                              statusBar={{
                                  backgroundColor: '#FFC1C1',

                              }}
                              leftButton={
                                  this.renderImage(require('../res/images/ic_arrow_back_white_36pt.png'))
                              }
                              rightButton={
                                  this.renderImage(require('../res/images/ic_star.png'))
                              }
                />
                <Text style={styles.text}>I am Girl</Text>
                <Text style={styles.text}>我收到了：{this.props.what}</Text>
                <Text style={styles.text} onPress={() => {
                    this.props.onCallBack('大白兔');
                    this.props.navigator.pop();
                }}>回赠</Text>

            </View>
        )
    }

}