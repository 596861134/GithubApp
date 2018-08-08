
import HttpUtils from '../../common/HttpUtils';

export default class DataRepossitory {

    fetchNetRepossitory(url){
        return new Promise((resolve,reject)=>{
            HttpUtils.get(url)
                .then(result=>{
                    resolve(result);
                })
                .catch(error=>{
                    reject(error);
                })
        })

    }
}