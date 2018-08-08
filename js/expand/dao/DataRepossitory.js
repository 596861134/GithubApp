
import HttpUtils from '../../common/HttpUtils';

export default class DataRepossitory {

    fetchNetRepossitory(url){
        return new Promise((resolve,reject)=>{
            HttpUtils.get(url)
                .then(result=>{
                    resolve(JSON.stringify(result));
                })
                .catch(error=>{
                    reject(JSON.stringify(error));
                })
        })

    }
}