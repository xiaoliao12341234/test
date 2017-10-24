/*global module, require, cc, client */
/**
 * @desc UI工具类
 * @author Administrator
 */
var outModule = {};

outModule.destroyPrefab = (prefabPath) => {
    "use strict";
    let dep = cc.loader.getDependsRecursively(prefabPath);
    let unusualDep = dep.filter((uuid) => {
        return !(client.ResourcesManager.judgeIsUsualRes(uuid));
    });
    cc.loader.release(unusualDep);
};

module.exports = outModule;
