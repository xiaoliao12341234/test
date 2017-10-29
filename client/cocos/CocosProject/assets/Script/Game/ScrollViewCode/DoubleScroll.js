/*global module, require, cc, client */

cc.Class({
    extends: cc.Component,

    properties: {
        formatItem: {
            default: null,
            type: cc.Node
        },
        scale: 0,
        _content_1 : null,
        _content_2 : null
    },

    onLoad: function () {
        "use strict";

        this._content_1 = cc.find('scrollview_1/view/Mask_1/content', this.node);
        this._content_2 = cc.find('scrollview_1/view/Mask_2/content', this.node);

        this.buildData();
        this.buildDoubleScroll();
        //绑定事件
        this.node.getChildByName('scrollview_1').on('scrolling', this.scrollingCb, this);
        this.scale = this.scale ? this.scale : 1.3;
    },

    scrollingCb: function () {
        "use strict";
        this._content_2.setPositionX(this._content_1.getPositionX() * this.scale);
    },

    onDestroy: function () {
        "use strict";
        this.node.getChildByName('scrollview_1').off('scrolling', this.scrollingCb);
    },

    /**
     * 创建第二个圆环
     */
    buildDoubleScroll: function () {
        "use strict";
        //填充数据
        let addNode = cc.find("scrollview_1/view/Mask_2/content", this.node);
        const ITEM_NUM = 40;
        const COLORS = [
            cc.Color.RED,
            cc.Color.GREEN,
            cc.Color.BLUE
        ];
        let initX = this.formatItem.getPositionX();
        let addX = this.formatItem.width;
        for (let i = 0; i < ITEM_NUM; i++) {
            let newNode = cc.instantiate(this.formatItem);
            //改变遮罩类型
            newNode.getChildByName('sprite').Color = COLORS[i % 3];
            newNode.getChildByName('label').getComponent(cc.Label).string = (i + 1);
            newNode.setPositionX(initX + i * addX);
            newNode.children.forEach((node) => {
                node.height = node.height * this.scale;
            });
            newNode.height = newNode.height * this.scale;
            addNode.addChild(newNode);
        }
        addNode.scaleX = this.scale;
        addNode.width = addX * ITEM_NUM * this.scale;
        this._content_2.setPositionX(this._content_1.getPositionX() * this.scale);
    },

    /**
     * 填充数据
     */
    buildData: function () {
        "use strict";
        const ITEM_NUM = 40;
        const COLORS = [
            cc.Color.RED,
            cc.Color.GREEN,
            cc.Color.BLUE
        ];
        let initX = this.formatItem.getPositionX();
        let addX = this.formatItem.width;
        for (let i = 1; i < ITEM_NUM; i++) {
            let newNode = cc.instantiate(this.formatItem);
            newNode.getChildByName('sprite').Color = COLORS[i % 3];
            newNode.getChildByName('label').getComponent(cc.Label).string = (i + 1);
            newNode.setPositionX(initX + i * addX);
            this.formatItem.parent.addChild(newNode);
        }
        this.formatItem.parent.width = addX * ITEM_NUM;
    },

    /**
     * 创建圆环事件
     */
    createRingScrollView: function () {

    }
});
