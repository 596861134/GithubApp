import React, {Component} from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import Girl from './Girl';
import NavigatorBar from '../js/common/NavigatorBar';

export default class Boy extends Component {

    constructor(props) {
        super(props);
        this.state = {
            what: '',
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigatorBar
                    title={'Boy'}
                    style={{backgroundColor: '#EE6363',}}
                    statusBar={{
                        backgroundColor: '#EE6363',
                    }}
                />
                <Text style={styles.text}>I am Boy</Text>
                <Text style={styles.text}
                      onPress={() => {
                          this.props.navigator.push({
                              component: Girl,
                              name: 'Girl',
                              params: {
                                  what: '一枝玫瑰',
                                  onCallBack: (what) => {
                                      this.setState({
                                          what: what,
                                      })
                                  }
                              }
                          })
                      }}
                >我向女孩送一朵花</Text>
                <Text style={styles.text}>{this.state.what}</Text>

            </View>
        )
    }

}
