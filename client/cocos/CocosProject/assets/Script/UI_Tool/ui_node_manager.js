/*global module, require, cc*/

/**
 * Created by Administrator on 2017/10/14.
 * 这个文件封装了对四个节点的操作
 * background_node 存储背景，背景会加入到这个节点中
 * UI_node UI层，所有的用户UI将存储在这个节点
 * user_msg_node，用户消息层，弹出框等东西会加入到这个节点
 * net_node，网络延迟表示层，这个层次只会有一个表现
 */

var outModule = {};
var local = {};
var log = require("log");

//四个节点的简写
outModule.BN = "BN";
outModule.UIN = "UIN";
outModule.UMN = "UMN";
outModule.NN = "NN";

/**
 * 初始化游戏框架
 * @param mainNode 主节点
 */
outModule.gameInit = function (mainNode) {
    "use strict";
    var backgroundNode,
        UINode,
        userMsgNode,
        netNode,
        backgroundNodeObj,
        UINodeObj,
        userMsgNodeObj,
        netNodeObj;
    //获取四个节点
    backgroundNode = mainNode.getChildByName("background_node");
    UINode = mainNode.getChildByName("UI_node");
    userMsgNode = mainNode.getChildByName("user_msg_node");
    netNode = mainNode.getChildByName("net_node");
    //封装节点
    backgroundNodeObj = local.buildBackgroundNode(backgroundNode);
    UINodeObj = local.buildUINode(UINode);
    userMsgNodeObj = local.buildUserMsgNode(userMsgNode);
    netNodeObj = local.buildNetNode(netNode);
    //存在在本地数据中
    local.nodeSaveObj = {};
    local.nodeSaveObj[outModule.BN] = backgroundNodeObj;
    local.nodeSaveObj[outModule.UIN] = UINodeObj;
    local.nodeSaveObj[outModule.UMN] = userMsgNodeObj;
    local.nodeSaveObj[outModule.NN] = netNodeObj;
};

/**
 * 获取指定的node object
 */
outModule.getNodeObj = function (type) {
    "use strict";
    return local.nodeSaveObj[type];
};

//**************************** 内部函数 ****************************//
/**
 * 为节点Object添加通用的属性
 * 传入前需要确保Object已经封装好
 * {
 *      node : node,
 *      属性_1 : 属性_1,
 *      .....
 * }
 * @param nodeObject
 */
local.buildNormalNode = function (nodeObject) {
    "use strict";
    nodeObject.childTagArray = [];
    /**
     * 为指定的节点添加一个子节点
     * localZOrder 默认为1
     */
    nodeObject.addChildNode = function (node, tag, localZOrder) {
        if (!node) {
            log.showLog("addChildNode node is null");
            return;
        }
        //tag作为标记节点用，是一定要提供的
        if (!tag) {
            log.showLog("addChildNode tag is null");
            return;
        }
        //如果存在统一标签的节点，需要返回
        if (nodeObject.childTagArray.indexOf(tag) >= 0) {
            log.showLog("addChildNode tag exits");
            return;
        }
        localZOrder = localZOrder || 1;
        nodeObject.node.addChild(node, localZOrder, tag);
        nodeObject.childTagArray.push(node);
    };
    /**
     * 移除所有的节点
     */
    nodeObject.removeAllNode = function () {
        nodeObject.node.removeAllChildren();
        nodeObject.childTagArray = [];
    };
    /**
     * 移除指定tag的节点
     * @param tag
     */
    nodeObject.removeChildByTag = function (tag) {
        var index = nodeObject.childTagArray.indexOf(tag);
        if (index < 0) {
            log.showLog("removeChildByTag tag not exits");
            return;
        }
        nodeObject.node.removeChildByTag(tag);
        nodeObject.childTagArray.splice(index, 1);
    };
    /**
     * 移除count个节点
     * @param count
     * @param isHead 是否从头（childTagArray的第一个tag）开始移除，默认false
     */
    nodeObject.removeNodeByCount = function (count, isHead) {
        var tagArr;
        isHead = isHead || false;
        tagArr = nodeObject.childTagArray.slice(isHead ? 0 : -1, isHead ? count : -1 * (count + 1));
        tagArr.forEach(function (tag) {
            nodeObject.removeChildByTag(tag);
        });
    };
    /**
     * 根据tag获取节点
     * @param tag
     */
    nodeObject.getNodeByTag = function (tag) {
        if (nodeObject.childTagArray.indexOf(tag) < 0) {
            return undefined;
        }
        return nodeObject.node.getChildByTag(tag);
    };
    /**
     * 根据tag获取节点的index，-1表示不存在
     * @param tag
     */
    nodeObject.getIndexByTag = function (tag) {
        return nodeObject.childTagArray.indexOf(tag);
    };
    /**
     * 获取是否存在某个子节点
     * @param tag
     */
    nodeObject.getNodeExits = function (tag) {
        return nodeObject.getIndexByTag(tag) !== -1;
    };
};

/**
 * 封装节点
 * @param node
 * @returns {{node: *}}
 */
local.buildBackgroundNode = function (node) {
    "use strict";
    var nodeObject = {
        node: node
    };
    local.buildNormalNode(nodeObject);
    return nodeObject;
};

/**
 * 封装节点
 * @param node
 * @returns {{node: *}}
 */
local.buildUINode = function (node) {
    "use strict";
    var nodeObject = {
        node: node
    };
    local.buildNormalNode(nodeObject);
    return nodeObject;
};

/**
 * 封装节点
 * @param node
 * @returns {{node: *}}
 */
local.buildUserMsgNode = function (node) {
    "use strict";
    var nodeObject = {
        node: node
    };
    local.buildNormalNode(nodeObject);
    return nodeObject;
};

/**
 * 封装节点
 * @param node
 * @returns {{node: *}}
 */
local.buildNetNode = function (node) {
    "use strict";
    var nodeObject = {
        node: node
    };
    local.buildNormalNode(nodeObject);
    return nodeObject;
};

module.exports = outModule;