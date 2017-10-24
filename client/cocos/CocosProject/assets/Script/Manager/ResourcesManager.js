/*global module, require, cc, client */
/**
 * @desc 资源管理器
 * @author Administrator
 */
var outModule = {};
var local = {};

var MyPromise = require("Promise");

var initFlag = false;

local.resObj = {};
local.uuidSave = [];

const DIR = [
    {
        name : "Sprite",
        type : cc.SpriteFrame
    }
];

/**
 * 初始化函数
 * @param finishCb
 */
outModule.init = (finishCb) => {
    "use strict";
    if (initFlag) {
        return;
    }
    let promise = MyPromise.createPromise();
    local.uuidSave = [];
    DIR.forEach((obj) => {
        promise.then(() => {
            if (!local.resObj[obj.name]) {
                local.resObj[obj.name] = {};
            }
            cc.loader.loadResDir("res/Usual/" + obj.name, obj.type, (err, assets, urls) => {
                if (err) {
                    client.showLog(err);
                    return;
                }
                assets.forEach((res, index) => {
                    let arr = urls[index].split("/");
                    local.resObj[obj.name][arr] = res;
                    //这边加一个点表示文件名 + "." + 后缀
                    local.uuidSave.push(urls[index] + ".");
                });
                promise.next();
            });
        });
    });
    promise.then(() => {
        if (finishCb) {
            finishCb();
            initFlag = true;
        }
    });
    promise.start();
};

/**
 * 判断是否是通用资源
 * 通用资源是不会被销毁的
 */
outModule.judgeIsUsualRes = (uuid) => {
    "use strict";
    return local.uuidSave.indexOf(uuid) >= 0;
};

const PREFAB_DIR = [
    "Unusual_ui",
    "Usual_ui"
];

/**
 * 测试方法
 * 加载所有的prefab，检查是否在Unusual res和usual res中存在错误
 * Unusual res的资源uuid应该只能被检查到一次
 */
outModule.test = () => {
    "use strict";
    let promise = MyPromise.createPromise();
    let uuidObj = {};
    if (!initFlag) {
        client.showLog("ResourcesManager test initFlag = false");
        return;
    }
    PREFAB_DIR.forEach((name) => {
        promise.then(() => {
            cc.loader.loadResDir("prefab/UI/" + name, (err, assets, urls) => {
                if (err) {
                    client.showLog(err);
                    return;
                }
                urls.forEach((url) => {
                    var dep = cc.loader.getDependsRecursively(url);
                    dep.forEach((uuid) => {
                        if (uuid.indexOf("library/imports/") >= 0) {
                            return;
                        }
                        if (!uuidObj[uuid]) {
                            uuidObj[uuid] = {
                                urls : [url],
                                count : 1
                            };
                            return;
                        }
                        uuidObj[uuid].count++;
                        uuidObj[uuid].urls.push(url);
                    });
                });
                promise.next();
            });
        });
    });
    promise.then(() => {
        let key;
        for (key in uuidObj) {
            if (uuidObj.hasOwnProperty(key)) {
                //有问题，引用了两次却没有存在usual中
                let keyStr = key.split('assets/resources/')[1];
                keyStr = keyStr.split(".")[0] + ".";
                if (uuidObj[key].count > 1 && local.uuidSave.indexOf(keyStr) < 0) {
                    client.showLog("ResourcesManager test : " + key + " res error");
                    uuidObj[key].urls.forEach((url) => {
                        client.showLog("ResourcesManager test : " + url + " prefab error");
                    });
                }
            }
        }
    });
    promise.start();
};

module.exports = outModule;
