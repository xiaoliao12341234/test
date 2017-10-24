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
            //初始化成功，可以进入场景
            client.excelDataManager = excelDataManager;
            client.ResourcesManager = ResourcesManager;
            client.UIPoolManager = UIPoolManager;
            client.UISceneManager = UISceneManager;
            client.EventModule = EventModule;
            //初始化
            client.UISceneManager.init(this.node);
            //测试代码
            client.UISceneManager.getUINode().addNodeWithName("test");
            client.UISceneManager.getUINode().addNodeWithName("test_1");
            client.UISceneManager.getUINode().addNodeWithName("test_3");
            client.UISceneManager.getUINode().addNodeWithName("test_2");

            var func = function (value) {
                this.showLog();
                client.showLog(value);
            };
            func = func.bind(this);
            client.EventModule.register("test", func);
            client.EventModule.register("test", func);

            client.EventModule.notify("test", 1234);

            client.EventModule.unRegister("test", func);

            client.EventModule.notify("test");

            client.ResourcesManager.test();
        });

        promise.start();
    }
});
