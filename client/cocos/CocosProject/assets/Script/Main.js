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
                //测试代码
                client.UISceneManager.getUINode().addNode(
                    client.UIPoolManager.getNode(client.UIPoolManager.prefabName.test),
                    client.UIPoolManager.prefabName.test
                );
                client.UISceneManager.getUINode().addNode(
                    client.UIPoolManager.getNode(client.UIPoolManager.prefabName.test_1),
                    client.UIPoolManager.prefabName.test_1
                );
                client.UISceneManager.getUINode().addNode(
                    client.UIPoolManager.getNode(client.UIPoolManager.prefabName.test_3),
                    client.UIPoolManager.prefabName.test_3
                );
                client.UISceneManager.getUINode().addNodeWithIndex(
                    client.UIPoolManager.getNode(client.UIPoolManager.prefabName.test_2),
                    client.UIPoolManager.prefabName.test_2,
                    1
                );
            });
        });
    }
});
