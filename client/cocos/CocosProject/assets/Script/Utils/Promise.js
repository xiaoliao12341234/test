/*global module, require, cc, client */
/**
 * @desc ES5 Promise 模拟实现
 * @author Administrator
 */
var outModule = {};
var local = {};

local.Promise = function () {
    "use strict";
    //存储then的函数
    var cbArr = [];
    this.then = (cb) => {
        cbArr.push(cb);
        return this;
    };
    this.next = (value) => {
        let len = cbArr.length;
        if (len > 0) {
            cbArr[len - 1](value);
            cbArr.pop();
        }
    };
    this.start = () => {
        cbArr.reverse();
        this.next();
    };
    this.finish = () => {
        //清除缓存
        cbArr = undefined;
    };
};

outModule.createPromise = () => {
    "use strict";
    return new local.Promise();
};

module.exports = outModule;
