/*global module, require, cc, client */
/**
 * @desc UI池
 * 所有的UI节点一开始只会加载预制体，不会加载成实例的node
 * 生成实例的node以后，将存储在这个模块中，不会销毁
 * node隐藏的话也只是把active设置为false，这样就不会渲染更新了
 * cc.instantiate是一个消耗很大的过程，所以这边选择保存node
 * 修改了加载方式，现在是resources/prefab/UI下所有的prefab
 *
 * 这个UI池存储的是常用的UI场景和不常用UI场景
 * 常用UI是会存储node，hide只是把active设置为false
 * 不常用UI不会存储任何数据，hide会销毁场景和场景特有资源
 * @author Administrator
 */
var outModule = {};
var local = {};

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
    cc.loader.loadResDir("prefab/UI", (err, assets, urls) => {
        if (err) {
            client.showLog(err);
            return;
        }
        assets.forEach((prefab, index) => {
            let arr = urls[index].split("/");
            local.prefabSaveObj[arr[arr.length - 1]] = prefab;
        });
        if (finishCb) {
            finishCb();
        }
    });
};

/**
 * 根据定义的名字获取一个节点
 * @param name
 */
outModule.getNode = (name) => {
    "use strict";
    if (!local.prefabSaveObj[name]) {
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