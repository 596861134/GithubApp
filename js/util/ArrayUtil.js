export default class ArrayUtil {

    static updateArray(array, item) {
        for (var i = 0, len = array.length; i < len; i++) {
            var temp = array[i];
            if (item === temp) {
                array.splice(i, 1);
                return;
            }
        }
        array.push(item);
    }

    /**
     * 克隆数组
     * @param from
     * @returns {Array}
     */
    static clone(from) {
        if (!from) return [];
        let newArray = [];
        for (let i = 0, len = from.length; i < len; i++) {
            newArray[i] = from[i];
        }
        return newArray;
    }

    /**
     * 判断两个数组是否相等
     * @param arr1
     * @param arr2
     * @returns {boolean} true 数组相等
     */
    static isEqual(arr1, arr2) {
        if (!(arr1 && arr2)) return false;
        if (arr1.length !== arr2.length) return false;
        for (let i = 0, len = arr2.length; i < len; i++) {
            if (arr1[i]!==arr2[i]){
                return false;
            }
        }
        return true;
    }

    /**
     * 将数组中指定数据移除
     * @param arr
     * @param item
     */
    static remove(arr,item){
        if (!arr) return;
        for (let i = 0, len = arr.length; i < len; i++) {
            if (item===arr[i]){
                arr.splice(i,1);
            }
        }
        
    }
}
