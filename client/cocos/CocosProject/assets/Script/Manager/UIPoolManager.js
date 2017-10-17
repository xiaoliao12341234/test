/*global module, require, cc, client */
/**
 * @desc UI池
 * 所有的UI节点一开始只会加载预制体，不会加载成实例的node
 * 生成实例的node以后，将存储在这个模块中，不会销毁
 * node隐藏的话也只是把active设置为false，这样就不会渲染更新了
 * cc.instantiate是一个消耗很大的过程，所以这边选择保存node
 * @author Administrator
 */
var outModule = {};
var local = {};

//存储预制体的名字
outModule.prefabName = {};
outModule.prefabName.test = "test";
outModule.prefabName.test_1 = "test_1";
outModule.prefabName.test_2 = "test_2";
outModule.prefabName.test_3 = "test_3";

//这个列表中的预制体在游戏初始化的时候都会被加载起来
//只存储prefab/UI/下的节点
local.loadPrefabNameArr = [
    outModule.prefabName.test,
    outModule.prefabName.test_1,
    outModule.prefabName.test_2,
    outModule.prefabName.test_3
];

//存储预制体
local.prefabSaveObj = {};
//存储实例化的节点
local.nodeSaveObj = {};

/**
 * 模块初始化
 * @param finishCb
 */
outModule.init = (finishCb) => {
    "use strict";
    let urls = local.loadPrefabNameArr.map((str) => {
        return "prefab/UI/" + str;
    });
    cc.loader.loadResArray(urls, (err, assets) => {
        if (err) {
            client.showLog(err);
            return;
        }
        assets.forEach((prefab) => {
            local.prefabSaveObj[prefab.name] = prefab;
        });
        if (assets.length === local.loadPrefabNameArr.length) {
            if (finishCb) {
                finishCb();
            }
        }
    });
};

/**
 * 根据定义的名字获取一个节点
 * @param name
 */
outModule.getNode = (name) => {
    "use strict";
    if (local.loadPrefabNameArr.indexOf(name) < 0) {
        client.showLog("UIPoolManager : getNode name is not loaded");
        return;
    }
    if (local.nodeSaveObj[name]) {
        return local.nodeSaveObj[name];
    }
    //在node缓存中不存在的话就重新实例化一个
    let newNode = cc.instantiate(local.prefabSaveObj[name]);
    local.nodeSaveObj[name] = newNode;
    return newNode;
};

/**
 * 显示一个节点
 * @param name
 */
outModule.showNode = (name) => {
    "use strict";
    if (!local.nodeSaveObj[name]) {
        return;
    }
    local.nodeSaveObj[name].active = true;
};

/**
 * 隐藏一个节点
 * @param name
 */
outModule.hideNode = (name) => {
    "use strict";
    if (!local.nodeSaveObj[name]) {
        return;
    }
    local.nodeSaveObj[name].active = false;
};

/**
 * 摧毁一个节点
 * 通常情况下不需要销毁节点
 * @param name
 */
outModule.destroyNode = (name) => {
    "use strict";
    if (!local.nodeSaveObj[name]) {
        return;
    }
    local.nodeSaveObj[name].destroy();
    local.nodeSaveObj[name] = undefined;
};

module.exports = outModule;