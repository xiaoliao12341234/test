/*global module, require, cc*/

var uiSceneManager = require("ui_scene_manager");
var prefabManager = require("prefab_manager");
var game = require("game");
var log = require("log");

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // use this for initialization
    onLoad: function () {
        "use strict";
        var mainRootNode = this.node;
        prefabManager.initPrefab(function () {
            uiSceneManager.gameManagerInit(mainRootNode);
            game.gameInit();
        });
    }
});
