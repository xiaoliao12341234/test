/*global module, require, cc*/

/**
 * @desc 封装的log模块
 * @author Administrator
 */

var globalMsg = require("global_msg");
var outModule = {};


outModule.showLog = function (object) {
    "use strict";
    var key;
    if (!object && object !== 0) {
        cc.log(globalMsg.msg.PROJECT_NAME + " log : " + "object is null");
        return;
    }
    if (typeof object !== "object") {
        cc.log(globalMsg.msg.PROJECT_NAME + " log : " + object);
        return;
    }
    if (object.length === undefined) {
        //Object
        cc.log(globalMsg.msg.PROJECT_NAME + " log : " + "type is Object");
        for (key in object) {
            if (object.hasOwnProperty(key)) {
                cc.log(globalMsg.msg.PROJECT_NAME + " log : " + key + " : " + object[key]);
            }
        }
    } else {
        cc.log(globalMsg.msg.PROJECT_NAME + " log : " + "type is Array");
        object.forEach(function (data, index) {
            cc.log(globalMsg.msg.PROJECT_NAME + " log : " + index + " : " + data);
        });
    }
};

module.exports = outModule;