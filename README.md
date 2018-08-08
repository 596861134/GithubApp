####  常见bug：https://www.jianshu.com/p/e6d8d57fe6a6
###踩坑1：
    React-Native到0.44版本后Navigator 不能用的问题
    新升级  到0.46版本以后 Navigator 不能使用报错。
    
    'Navigator is deprecated and has been removed from this package. It can now be installed ' +
    'and imported from `react-native-deprecated-custom-components` instead of `react-native`. ' +
    'Learn about alternative navigation solutions at http://facebook.github.io/react-native/docs/navigation.html'
    
     
    
    解决方案：
    
      1、cd 当前目录
    
      2、npm install react-native-deprecated-custom-components --save
    
      3、import {Navigator} from 'react-native-deprecated-custom-components';
      
###踩坑2：
    使用
    import PropTypes from 'prop-types';
    import ViewPropTypes from 'ViewPropTypes';
    
    代替
    import React, {Component,PropTypes} from 'react';
    
     static propTypes = {
         style: View.propTypes.style,
     };

     