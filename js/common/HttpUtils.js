import ContentType from './ContentType';
import HttpMethod from './HttpMethod';

export default class HttpUtils {

    static get(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(response => response.json())
                .then(result => {
                    resolve(result);
                })
                .catch(error => {
                    reject(error);
                })
        })
    }

    static post(url, data) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: HttpMethod.POST,
                headers: {
                    'Accept': ContentType.JSON,
                    'Content-Type': ContentType.JSON,
                },
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(result => {
                    resolve(result);
                })
                .catch(error => {
                    reject(error);
                })
        })
    }

    /**
     * 文件上传
     * @param url   上传的url
     * @param data  上传的文件路径uri
     * @param name  文件名称
     * @returns {Promise<any> | Promise}
     */
    static upload(url, data, name) {
        return new Promise((resolve, reject) => {
            let formData = new FormData();
            let file = {uri: data, type: ContentType.UPLOAD, name: name};   //这里的key(uri和type和name)不能改变,
            formData.append("files",file);   //这里的files就是后台需要的key

            fetch(url,{
                method:HttpMethod.POST,
                headers:{
                    'Content-Type':ContentType.UPLOAD,
                },
                body:formData,
            })
                .then((response) => response.json() )
                .then((result)=>{
                    resolve(result);
                })
                .then((error)=>{
                    reject(error);
                })
        })
    }

}