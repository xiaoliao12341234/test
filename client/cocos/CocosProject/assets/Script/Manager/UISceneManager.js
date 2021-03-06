/*global module, require, cc, client */
/**
 * @desc 模块描述
 * @author Administrator
 */
var outModule = {};
var local = {};

var UISceneClass = require("UISceneClass");

local.sceneNodeSaveObj = {};
local.sceneNodeSaveObj.UINodeClass = undefined;
local.sceneNodeSaveObj.userMsgNodeClass = undefined;
local.sceneNodeSaveObj.netNodeClass = undefined;

/**
 * 初始化
 */
outModule.init = (mainNode) => {
    "use strict";
    let UINode = mainNode.getChildByName("UI_node");
    let userMsgNode = mainNode.getChildByName("user_msg_node");
    let netNode = mainNode.getChildByName("net_node");
    local.sceneNodeSaveObj.UINodeClass = UISceneClass.buildUINode(UINode);
    local.sceneNodeSaveObj.userMsgNodeClass = UISceneClass.buildUserMsgNode(userMsgNode);
    local.sceneNodeSaveObj.netNodeClass = UISceneClass.buildNetNode(netNode);
};

outModule.getUINode = () => {
    "use strict";
    return local.sceneNodeSaveObj.UINodeClass;
};

outModule.getUserMsgNode = () => {
    "use strict";
    return local.sceneNodeSaveObj.userMsgNodeClass;
};

outModule.getNetNode = () => {
    "use strict";
    return local.sceneNodeSaveObj.netNodeClass;
};

module.exports = outModule;