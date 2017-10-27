/*global module, require, cc, client */

require("Global");
var excelDataManager = require("ExcelDataManager");
var ResourcesManager = require("ResourcesManager");
var UIPoolManager = require("UIPoolManager");
var UISceneManager = require("UISceneManager");
var MyPromise = require("Promise");
var EventModule = require("EventModule");

cc.Class({
    extends: cc.Component,

    properties: {

    },

    showLog : () => {
        "use strict";
        client.showLog("success");
    },

    // use this for initialization
    onLoad: function () {
        "use strict";
        let promise = MyPromise.createPromise();
        promise.then(() => {
            excelDataManager.init(() => {
                promise.next();
            });
        }).then(() => {
            ResourcesManager.init(() => {
                promise.next();
            });
        }).then(() => {
            UIPoolManager.init(() => {
                promise.next();
            });
        }).then(() => {
            //启动碰撞
            cc.director.getCollisionManager().enabled = true;
            cc.director.setDisplayStats(false);
            //初始化成功，可以进入场景
            client.excelDataManager = excelDataManager;
            client.ResourcesManager = ResourcesManager;
            client.UIPoolManager = UIPoolManager;
            client.UISceneManager = UISceneManager;
            client.EventModule = EventModule;
            //初始化
            client.UISceneManager.init(this.node);
            //测试骑马游戏
            client.UIPoolManager.loadUIPrefab("horse_game", (node) => {
                client.UISceneManager.getUINode().addNode(node, "horse_game");
            });
        });

        promise.start();
    }
});
