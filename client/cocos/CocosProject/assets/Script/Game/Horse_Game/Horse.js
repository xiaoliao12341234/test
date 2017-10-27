/*global module, require, cc, client */
cc.Class({
    extends: cc.Component,

    properties: {},

    // use this for initialization
    onLoad: function () {

    },

    onCollisionEnter: function (other) {
        "use strict";
        if (other.tag === 1) {
            client.EventModule.notify("horse_hunt_by_arrow");
            other.node.active = false;
        }
    }
});
