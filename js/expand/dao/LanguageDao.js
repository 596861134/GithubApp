import {
    AsyncStorage,
} from 'react-native';
import keys from '../../../res/data/keys';
import langs from '../../../res/data/langs';

export let FLAG_LANGUAGE = {flag_language: 'language_dao_language', flag_key: 'language_dao_key'};

export default class LanguageDao {
    constructor(flag) {
        this.flag = flag;
    }

    fetch() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(this.flag, (error, result) => {
                if (error) {
                    reject(error)
                } else {
                    if (result) {
                        try {
                            resolve(JSON.parse(result))
                        } catch (e) {
                            reject(e)
                        }
                    } else {
                        let data = this.flag === FLAG_LANGUAGE.flag_key ? keys : langs;
                        this.save(data);
                        resolve(data);
                    }
                }
            })
        })
    }

    save(data){
        AsyncStorage.setItem(this.flag,JSON.stringify(data),(error,result)=>{

        })
    }

    del(){
        return new Promise((resolve) => {
            AsyncStorage.clear((error)=>{
                if (!error){
                    resolve('清除成功');
                }else{
                    resolve('清除失败');
                }
            })
        })
    }

}