/*global module, require, cc */
/**
 * @desc 游戏主模块
 * @author Administrator
 */
var outModule = {};
var prefabManager = require("prefab_manager");
var uiSceneManager = require("ui_scene_manager");
var log = require("log");

outModule.gameInit = function () {
    "use strict";
    //测试
    var newNode,
        uiSceneNodeObj;
    newNode = cc.instantiate(prefabManager.getPrefabSave("prefab/test"));
    uiSceneNodeObj = uiSceneManager.getNodeObj(uiSceneManager.UIN);
    uiSceneNodeObj.addChildNode(newNode, "test", undefined);
};

module.exports = outModule;