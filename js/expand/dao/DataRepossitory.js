import {
    AsyncStorage,
} from 'react-native';
import HttpUtils from '../../common/HttpUtils';

export default class DataRepossitory {

    /**
     * 获取缓存数据
     * @param url
     * @returns {Promise<any> | Promise}
     */
    fetchRepossitory(url){
        return new Promise((resolve,reject)=>{
            this.fetchLocalRepossitory(url)
                .then(result=>{
                    if (result){
                        console.log('缓存数据获取成功');
                        resolve(result);
                    }else {
                        console.log('缓存数据获取失败，请求网络1');
                        this.fetchNetRepossitory(url)
                            .then(result=>{
                                console.log('网络数据获取成功1');
                                resolve(result);
                            })
                            .catch(error=>{
                                console.log('网络数据获取失败1');
                                reject(error);
                            })
                    }
                })
                .catch((error)=>{
                    console.log('缓存数据获取失败，请求网络2');
                    this.fetchNetRepossitory(url)
                        .then(result=>{
                            console.log('网络数据获取成功2');
                            resolve(result);
                        })
                        .catch(error=>{
                            console.log('网络数据获取失败2');
                            reject(error);
                        })
                })
        })
    }

    /**
     * 获取网络数据
     * @param url
     * @returns {Promise<any> | Promise}
     */
    fetchNetRepossitory(url){
        return new Promise((resolve,reject)=>{
            HttpUtils.get(url)
                .then(result=>{
                    if (!result || !result.items) {
                        reject(new Error('responseData is null'));
                        return;
                    }
                    resolve(result.items);
                    console.log('开始缓存');
                    this.saveRepossitory(url,result.items)
                })
                .catch(error=>{
                    reject(error);
                }).done();
        })
    }

    /**
     * 获取本地数据
     * @returns {Promise<any> | Promise}
     */
    fetchLocalRepossitory(url){
        return new Promise((resolve,reject)=>{
            AsyncStorage.getItem(url, (error, result)=> {
                if (!error) {
                    try {
                        resolve(JSON.parse(result));
                    } catch (e) {
                        reject(e);
                        console.error(e);
                    }
                } else {
                    reject(error);
                    console.error(error);
                }
            })
        })
    }

    /**
     * 保存数据到本地
     * @param url
     * @param result
     */
    saveRepossitory(url, result) {
        if (!result || !url)return;
        let wrapData = {items: result, update_date: new Date().getTime()};
        AsyncStorage.setItem(url, JSON.stringify(wrapData), (error)=> {
            if (!error) {
                console.log('保存成功');
            } else {
                console.log('保存失败');
            }
        });
    }

    clearRepossitory(url){
        AsyncStorage.removeItem(url,(error)=>{
            if (!error){
                console.log('删除成功');
            }else{
                console.log('删除失败');
            }
        })
    }

    /**
     * 判断数据是否过时
     * @param longTime 数据的时间戳
     * @returns {boolean}
     */
    checkDate(longTime) {
        // return false;
        let currentDate = new Date();
        let targetDate = new Date();
        targetDate.setTime(longTime);
        if (currentDate.getMonth() !== targetDate.getMonth())return false;
        if (currentDate.getDate() !== targetDate.getDate())return false;
        if (currentDate.getHours() - targetDate.getHours() > 4)return false;
        // if (currentDate.getMinutes() - targetDate.getMinutes() > 1)return false;
        return true;
    }
}