/*global module, require, cc, client */
/**
 * @desc BaseUI类，所有的UI场景都需要继承这个
 * @author Administrator
 */
cc.Class({
    extends: cc.Component,

    properties: {
        //name可以用于标记
        _name : undefined
    },

    show : () => {
        "use strict";
        this.node.active = true;
    },

    hide : () => {
        "use strict";
        if (client.UIPoolManager.getIsLoadPrefab(this._name)) {
            client.UIPoolManager.hideNode(this._name);
            return;
        }
        client.UIPoolManager.destroyNode(this._name, this.node);
    }
});
