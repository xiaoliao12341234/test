/*global module, require, cc, client */

var BaseUI = require("BaseUI");

cc.Class({
    extends: BaseUI,

    properties: {
        _player: null,
        /**
         * {
         *      node : cc.Node,
         *      speed : Number
         * }
         */
        _arrowArr: [],
        //左右可移动的最大距离
        maxDis: 0,
        _speed: 0,
        //点击一次增加的速度
        addSpeed: 0,
        //最大速度
        maxSpeed: 0,
        //箭矢创建间隔
        createTime: 0,
        //马刷新的间隔
        horseUpdateTime: 0,
        //每次生成的箭矢的最大数量
        maxNum: 0,
        _label: null,
        _count: 0,
        //箭矢最大速度
        arrowMaxSpeed: 0,
        //箭矢最小速度
        arrowMinSpeed: 0,
        //箭矢刷新间隔
        arrowUpdateTime: 0,
        _maxY : 0
    },

    // use this for initialization
    onLoad: function () {
        "use strict";
        this._player = this.node.getChildByName("player");
        this._arrow = this.node.getChildByName("arrow_father");
        this._label = this.node.getChildByName("count");
        //分数重置
        this._count = 0;
        //绑定马的动画
        var seq = cc.repeatForever(
            cc.sequence(
                cc.moveBy(0.3, 0, 10),
                cc.moveBy(0.3, 0, -10)
            ));
        this._player.runAction(seq);
        //按钮事件
        this.node.getChildByName("leftBtn").on('click', this.leftBtnClick, this);
        this.node.getChildByName("rightBtn").on('click', this.rightBtnClick, this);
        //开始定时器
        this.schedule(this.horseUpdate, this.horseUpdateTime);
        this.schedule(this.arrowUpdate, this.arrowUpdateTime);
        this.schedule(this.createArrow, this.createTime);
        //绑定消息
        client.EventModule.register("horse_hunt_by_arrow", (function () {

            this._count++;
            this._label.getComponent(cc.Label).string = this._count;
        }).bind(this));
        //计算箭矢的消失距离
        this._maxY = this.node.height / 2 + this._maxY.height;
    },

    //马刷新
    horseUpdate: function () {
        "use strict";
        let nowPosX = this._player.getPositionX() + this.horseUpdateTime * this._speed;
        nowPosX = (nowPosX > this.maxDis) ? this.maxDis : nowPosX;
        nowPosX = (nowPosX < (-1 * this.maxDis)) ? (-1 * this.maxDis) : nowPosX;
        this._player.setPositionX(nowPosX);
    },

    arrowUpdate: function () {
        "use strict";
        this._arrowArr.forEach((nodeObj) => {
            if (nodeObj.node.active) {
                let nowY = nodeObj.node.getPositionY() + nodeObj.speed * this.arrowUpdateTime;
                nodeObj.node.setPositionY(nowY);
                if (nowY >= this._maxY) {
                    nodeObj.node.active = false;
                }
            }
        });
    },

    hide: function () {
        _super();
        this.unschedule(this.horseUpdate);
        this.unschedule(this.arrowUpdate);
        this.unschedule(this.createArrow);
    },

    /**
     * 获取缓存在arrow数组中的active = false的node
     */
    getArrowInArr: function (num) {
        "use strict";
        let i, len, returnArr = [], count = 0;
        for (i = 0, len = this._arrowArr.length; i < len; i++) {
            if (this._arrowArr[i].node.active === false) {
                returnArr.push(this._arrowArr[i]);
                count++;
                if (count >= num) {
                    return returnArr;
                }
            }
        }
        return returnArr;
    },

    createArrow: function () {
        "use strict";
        let createNum = parseInt(cc.random0To1() * this.maxNum) + 1;
        let arrowArr = this.getArrowInArr(createNum);
        let i;
        for (i = arrowArr.length; i < createNum; i++) {
            let node = cc.instantiate(this._arrow);
            let speed = (this.arrowMaxSpeed - this.arrowMinSpeed) * cc.random0To1() + this.arrowMinSpeed;
            let arrowObj = {
                node: node,
                speed: speed
            };
            this.node.addChild(node);
            arrowArr.push(arrowObj);
            this._arrowArr.push(arrowObj);
        }
        arrowArr.forEach((nodeObj) => {
            let num_1 = cc.random0To1();
            let num_2 = cc.random0To1();
            nodeObj.node.setPositionX((num_1 < 0.5 ? -1 : 1) * num_2 * this.maxDis);
            nodeObj.node.active = true;
            nodeObj.node.setPositionY(this._arrow.getPositionY());
        });
    },

    leftBtnClick: function () {
        "use strict";
        if (this._speed <= -1 * this.maxSpeed) {
            return;
        }
        this._speed = this._speed - this.addSpeed;
        this._speed = (this._speed < (-1 * this.maxSpeed) ? (-1 * this.maxSpeed) : this._speed);
    },

    rightBtnClick: function () {
        "use strict";
        if (this._speed >= this.maxSpeed) {
            return;
        }
        this._speed = this._speed + this.addSpeed;
        this._speed = this._speed > this.maxSpeed ? this.maxSpeed : this._speed;
    }
});
