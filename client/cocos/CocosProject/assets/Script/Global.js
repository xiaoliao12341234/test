/*global module, require, cc */
/**
 * @desc 全局模块
 * @author Administrator
 */
var client = {};

//Excel管理模块
client.excelManager = undefined;
//UI场景管理模块
client.UIPoolManager = undefined;
//UI节点管理模块
client.sceneNodeManager = undefined;

//全局数据
client.globalData = {};
client.globalData.PROJECT_NAME = "PROJECT_1";

/**
 * 显示log
 * @param object
 */
client.showLog = (object) => {
    "use strict";
    if (object === undefined) {
        cc.log(client.globalData.PROJECT_NAME + " : " + "undefined");
        return;
    }
    if (object === null) {
        cc.log(client.globalData.PROJECT_NAME + " : " + "null");
        return;
    }
    if (typeof object === "object") {
        let key;
        for (key in object) {
            if (object.hasOwnProperty(key)) {
                cc.log(client.globalData.PROJECT_NAME + " : " + "key is " + key);
                client.showLog(object[key]);
            }
        }
    } else {
        cc.log(client.globalData.PROJECT_NAME + " : " + object);
    }
};

//Manager
client.excelDataManager = undefined;
client.UIPoolManager = undefined;
client.UISceneManager = undefined;

//Module
client.EventModule = undefined;

window.client = client;