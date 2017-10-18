/*global module, require, cc, client */
/**
 * @desc 消息模块
 * @author Administrator
 */
var outModule = {};
var local = {};

/**
 * @type {String : []}
 */
local.eventObj = {};

/**
 * 增加监听
 * @param eventName 事件名称
 * @param cb callback.bind(UI)
 * UI结点，也就是类似于Main.js cc.Class中的this，这样就可以操作场景
 */
outModule.register = (eventName, cb) => {
    "use strict";
    if (!local.eventObj[eventName]) {
        local.eventObj[eventName] = [];
    }
    if (local.eventObj[eventName].indexOf(cb) >= 0) {
        return;
    }
    local.eventObj[eventName].push(cb);
};

/**
 * 解除监听
 * @param eventName
 * @param cb
 */
outModule.unRegister = (eventName, cb) => {
    "use strict";
    if (!local.eventObj[eventName]) {
        return;
    }
    let index = local.eventObj[eventName].indexOf(cb);
    local.eventObj[eventName].splice(index, 1);
};

outModule.notify = function() {
    "use strict";
    let eventName = arguments[0];
    if (!local.eventObj[eventName]) {
        return;
    }
    let argus = [],
        i;
    for (i = 1; i < arguments.length; i++) {
        argus.push(arguments[i]);
    }
    local.eventObj[eventName].forEach((cb) => {
        cb.apply(cb, argus);
    });
};

module.exports = outModule;
