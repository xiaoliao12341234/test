/*global module, require, cc, client */
/**
 * @desc excel数据加载/读取模块
 * @author Administrator
 */
var outModule = {};
//存储读取成功的excel文件
outModule.excelDataObj = {};

/**
 * 加载resources下的json文件，这个是一个异步过程，加载成功后才能进行下一步
 */
outModule.init = (finishCb) => {
    "use strict";
    cc.loader.loadResDir('Excel_Data', function (err, objects, urls) {
        if (err) {
            client.showLog("ExcelDataManager : init err");
            return;
        }
        objects.forEach((data, index) => {
            let arr = urls[index].split("/");
            outModule.excelDataObj[arr[arr.length - 1]] = objects[index];
        });
        if (finishCb) {
            finishCb();
        }
    });
};

module.exports = outModule;
