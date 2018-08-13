import {
    AsyncStorage,
} from 'react-native';
import HttpUtils from '../../common/HttpUtils';
import GitHubTrending from "../../common/trending/GitHubTrending";

export var FLAG_STORAGE = {flag_popular: 'popular', flag_trending: 'trending'};

export default class DataRepossitory {

    constructor(flag) {
        this.flag = flag;
        if (flag === FLAG_STORAGE.flag_trending) this.trending = new GitHubTrending();
    }

    /**
     * 获取缓存数据
     * @param url
     * @returns {Promise<any> | Promise}
     */
    fetchRepossitory(url) {
        return new Promise((resolve, reject) => {
            this.fetchLocalRepossitory(url)
                .then(result => {
                    if (result) {
                        resolve(result);
                    } else {
                        this.fetchNetRepossitory(url)
                            .then(result => {
                                resolve(result);
                            })
                            .catch(error => {
                                reject(error);
                            })
                    }
                })
                .catch((error) => {
                    this.fetchNetRepossitory(url)
                        .then(result => {
                            resolve(result);
                        })
                        .catch(error => {
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
    fetchNetRepossitory(url) {
        return new Promise((resolve, reject) => {
            if (this.flag === FLAG_STORAGE.flag_popular) {
                HttpUtils.get(url)
                    .then(result => {
                        if (!result || !result.items) {
                            reject(new Error('responseData is null'));
                            return;
                        }
                        resolve(result.items);
                        this.saveRepossitory(url, result.items)
                    })
                    .catch(error => {
                        reject(error);
                    }).done();
            } else {
                this.trending.fetchTrending(url)
                    .then((result) => {
                        if (!result) {
                            reject(new Error('responseData is null'));
                            return;
                        }
                        resolve(result);
                        this.saveRepossitory(url, result)

                    }).catch((error) => {
                    reject(error);
                });
            }
        })
    }

    /**
     * 获取本地数据
     * @returns {Promise<any> | Promise}
     */
    fetchLocalRepossitory(url) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(url, (error, result) => {
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
        if (!result || !url) return;
        let wrapData = {items: result, update_date: new Date().getTime()};
        AsyncStorage.setItem(url, JSON.stringify(wrapData), (error) => {
            if (!error) {
                console.log('保存成功');
            } else {
                console.log('保存失败');
            }
        });
    }

    clearRepossitory(url) {
        AsyncStorage.removeItem(url, (error) => {
            if (!error) {
                console.log('删除成功');
            } else {
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
        if (currentDate.getMonth() !== targetDate.getMonth()) return false;
        if (currentDate.getDate() !== targetDate.getDate()) return false;
        if (currentDate.getHours() - targetDate.getHours() > 4) return false;
        // if (currentDate.getMinutes() - targetDate.getMinutes() > 1)return false;
        return true;
    }
}