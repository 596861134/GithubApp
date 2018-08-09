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
        
        
        替代
        import React, {Component,PropTypes} from 'react';
        
         static propTypes = {
             style: View.propTypes.style,
         };


###踩坑3：


    解决react-native-scrollable-tab-view使用ScrollableTabBar第一次加载下划线不显示问题
    
    解决方法参考：http://www.lfenxiang.com/thread-960-1-1.html
    
    修改ScrollableTabBar.js 62行代码为：
    
    
        updateView(offset) {
            // 修复没有下划线的问题
            if (offset.value === undefined) {
                offset.value = this.props.activeTab;
            }
            const position = Math.floor(offset.value);
            const pageOffset = offset.value % 1;
            const tabCount = this.props.tabs.length;
            const lastTabPosition = tabCount - 1;

            if (tabCount === 0 || offset.value < 0 || offset.value > lastTabPosition) {
                return;
            }

            if (this.necessarilyMeasurementsCompleted(position, position === lastTabPosition)) {
                this.updateTabPanel(position, pageOffset);
                this.updateTabUnderline(position, pageOffset, tabCount);
            }
        },
