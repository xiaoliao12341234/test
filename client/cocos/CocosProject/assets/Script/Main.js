/*global module, require, cc*/

var uiNodeManager = require("ui_node_manager");
var log = require("log");

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // use this for initialization
    onLoad: function () {
        "use strict";
        uiNodeManager.gameInit(this.node);
        log.showLog("finish");
    }
});
