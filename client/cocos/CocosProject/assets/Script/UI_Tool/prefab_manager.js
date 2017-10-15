/*global module, require, cc */
/**
 * @desc 预制体管理模块
 * @author Administrator
 */
var log = require("log");
var globalMsg = require("global_msg");
var outModule = {};

/**
 * 这边会加载所有的需要游戏启动前就在加载内存中的预制体
 * 这样的话调用就可以是同步调用
 * @param finishCb 结束后的回调
 */
outModule.initPrefab = function (finishCb) {
    "use strict";
    var count = 0;
    globalMsg.msg.PREFAB_INIT_ARRAY.forEach(function (pathStr) {
        //加载
        cc.loader.loadRes(pathStr, function (err) {
            count++;
            if (err) {
                log.showLog(err);
                log.showLog("base_ui.addPrefab loadRes error");
            }
            if (count === globalMsg.msg.PREFAB_INIT_ARRAY.length) {
                if (finishCb) {
                    finishCb();
                }
            }
        });
    });
};

/**
 * 这边会获取初始化加载起来的预制体
 */
outModule.getPrefabSave = function (pathStr) {
    "use strict";
    return cc.loader.getRes(pathStr);
};

/**
 * 加载预制体数据
 * @param pathStr
 * @param completeCb
 */
outModule.getNodeByPrefab = function (pathStr, completeCb) {
    "use strict";
    var prefabSave,
        newNode;
    if (!pathStr) {
        log.showLog("base_ui.addPrefab pathStr is null");
        return;
    }
    if (completeCb && typeof completeCb !== "function") {
        log.showLog("base_ui.addPrefab completeCb is not function");
        return;
    }
    //看看是否已经加载了，加载了就直接去缓存的
    prefabSave = cc.loader.getRes(pathStr);
    if (prefabSave) {
        newNode = cc.instantiate(prefabSave);
        if (completeCb) {
            completeCb(newNode);
        }
        return;
    }
    cc.loader.loadRes(pathStr, function (err, prefab) {
        if (err) {
            log.showLog(err);
            log.showLog("base_ui.addPrefab loadRes error");
            return;
        }
        newNode = cc.instantiate(prefab);
        if (completeCb) {
            completeCb(newNode);
        }
    });
};

module.exports = outModule;