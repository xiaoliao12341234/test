/*global module, require, cc, client */

require("Global");
var excelDataManager = require("ExcelDataManager");
var UIPoolManager = require("UIPoolManager");
var UISceneManager = require("UISceneManager");

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // use this for initialization
    onLoad: function () {
        "use strict";
        excelDataManager.init(() => {
            UIPoolManager.init(() => {
                //初始化成功，可以进入场景
                client.excelDataManager = excelDataManager;
                client.UIPoolManager = UIPoolManager;
                client.UISceneManager = UISceneManager;
                //初始化
                client.UISceneManager.init(this.node);
            });
        });
    }
});
