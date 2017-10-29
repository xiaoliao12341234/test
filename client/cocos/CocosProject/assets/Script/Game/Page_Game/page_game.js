/*global module, require, cc, client */

var gameData = require("page_game_data");

cc.Class({
    extends: cc.Component,

    properties: {
        //第一列总个数
        oneLineMun: 0,
        //第一列目标总个数
        oneLineTargetNum: 0,
        //第一列目标连续个数
        oneLineTargetTotalNum: 0,
        //第一列速度，越小速度越大
        oneLineSpeed: 0,
        //第二列总个数
        twoLineMun: 0,
        //第二列目标总个数
        twoLineTargetNum: 0,
        //第二列目标连续个数
        twoLineTargetTotalNum: 0,
        //第二列速度，越小速度越大
        twoLineSpeed: 0,
        //第三列总个数
        threeLineMun: 0,
        //第三列目标总个数
        threeLineTargetNum: 0,
        //第三列目标连续个数
        threeLineTargetTotalNum: 0,
        //第三列速度，越小速度越大
        threeLineSpeed: 0,
        //图集资源
        spriteFrame: {
            default: null,
            type: cc.SpriteAtlas
        },
        //1表示向上翻，-1向下翻
        direction: 1
    },

    // use this for initialization
    onLoad: function () {
        "use strict";
        this._target = client.getData("page_game").target;
        //修改目标图片资源
        this.node.getChildByName("target").getComponent(cc.Sprite).spriteFrame =
            this.spriteFrame.getSpriteFrame(this._target);
        //方向
        this.direction = (this.direction === 1 || this.direction === -1) ? this.direction : 1;
        //创建全随机数组
        this._randomArr = [
            gameData.RICE,
            gameData.HORSE,
            gameData.ABACUS,
            gameData.SHIP,
            gameData.CANNON,
            gameData.WINE,
            gameData.BOWL,
            gameData.LEAF_1,
            gameData.LEAF_2,
            gameData.LEAF_3
        ];
        //剔除目标的随机数组
        this._randomArr.splice(this._randomArr.indexOf(this._target), 1);

        //缓存控件数据
        this._line_1 = [
            this.node.getChildByName("node_1_1"),
            this.node.getChildByName("node_1_2"),
            this.node.getChildByName("node_1_3")
        ];
        this._line_2 = [
            this.node.getChildByName("node_2_1"),
            this.node.getChildByName("node_2_2"),
            this.node.getChildByName("node_2_3")
        ];
        this._line_3 = [
            this.node.getChildByName("node_3_1"),
            this.node.getChildByName("node_3_2"),
            this.node.getChildByName("node_3_3")
        ];
        //创建数据
        this.buildItemArr({
            num: this.oneLineMun,
            targetNum: this.oneLineTargetNum,
            targetTotalNum: this.oneLineTargetTotalNum,
            arrName: "lineArr_1"
        });
        this.buildItemArr({
            num: this.twoLineMun,
            targetNum: this.twoLineTargetNum,
            targetTotalNum: this.twoLineTargetTotalNum,
            arrName: "lineArr_2"
        });
        this.buildItemArr({
            num: this.threeLineMun,
            targetNum: this.threeLineTargetNum,
            targetTotalNum: this.threeLineTargetTotalNum,
            arrName: "lineArr_3"
        });

        //添加定时事件
        this._lineSelect_1 = 1;
        this._lineSelect_2 = 1;
        this._lineSelect_3 = 1;
        this.schedule(this.lineUpdate_1, this.oneLineSpeed);
        this.schedule(this.lineUpdate_2, this.twoLineSpeed);
        this.schedule(this.lineUpdate_3, this.threeLineSpeed);
        this._lineStart_1 = true;
        this._lineStart_2 = true;
        this._lineStart_3 = true;

        //按钮事件
        this.node.getChildByName('stopBtn').on('click', this.btnClick, this);
    },

    btnClick: function () {
        "use strict";
        if (this._lineStart_1) {
            this._lineStart_1 = false;
        } else {
            if (this._lineStart_2) {
                this._lineStart_2 = false;
            } else {
                this._lineStart_3 = false;
            }
        }
    },

    hide: function () {
        "use strict";
        this.unschedule(this.lineUpdate_1);
        this.unschedule(this.lineUpdate_2);
        this.unschedule(this.lineUpdate_3);
        this.node.getChildByName('stopBtn').off('click', this.btnClick);
    },

    lineUpdate_1: function () {
        "use strict";
        if (!this._lineStart_1) {
            return;
        }
        this.lineUpdate(1);
    },

    lineUpdate_2: function () {
        "use strict";
        if (!this._lineStart_2) {
            return;
        }
        this.lineUpdate(2);
    },

    lineUpdate_3: function () {
        "use strict";
        if (!this._lineStart_3) {
            return;
        }
        this.lineUpdate(3);
    },

    /**
     * 更新line
     * @param index
     */
    lineUpdate: function (index) {
        "use strict";
        let lineArr = this["lineArr_" + index];
        this["_lineSelect_" + index] = this["_lineSelect_" + index] + this.direction;
        if (this["_lineSelect_" + index] >= lineArr.length) {
            this["_lineSelect_" + index] = 0;
        }
        if (this["_lineSelect_" + index] < 0) {
            this["_lineSelect_" + index] = lineArr.length - 1;
        }
        let num_1, num_2, num_3;
        num_2 = this["_lineSelect_" + index];
        num_1 = num_2 - 1;
        if (num_1 < 0) {
            num_1 = lineArr.length - 1;
        }
        num_3 = num_2 + 1;
        if (num_3 >= lineArr.length) {
            num_3 = 0;
        }
        let numArr = [
            num_1,
            num_2,
            num_3
        ];
        let nodeLineArr = this["_line_" + index];
        nodeLineArr.forEach(function (node, index) {
            node.getComponent(cc.Sprite).spriteFrame =
                this.spriteFrame.getSpriteFrame(lineArr[numArr[index]]);
        }.bind(this));
    },

    /**
     * 停止指定line
     * @param index
     */
    lineStop: function (index) {

    },

    /**
     * 创建数据
     * @param dataObj
     * {
     *      num : 0, //总个数
     *      targetNum : 0, //这一行出现的目标总个数
     *      targetTotalNum : 0, //目标连续的个数
     *      arrName : xxx, 附加到this的属性名字
     * }
     */
    buildItemArr: function (dataObj) {
        "use strict";
        if (dataObj.targetNum > dataObj.num || dataObj.targetTotalNum > dataObj.targetNum) {
            client.showLog("page_game buildItemArr error !!!");
            return;
        }
        //先随机连续多个距离第一个的距离
        //(Num - TargetNum) * random
        let totalDis = parseInt((dataObj.num - dataObj.targetNum) * cc.random0To1());
        this[dataObj.arrName] = [];
        let i;
        //添加随机个
        for (i = 0; i < totalDis; i++) {
            this[dataObj.arrName].push(this._randomArr[parseInt(cc.random0To1() * this._randomArr.length)]);
        }
        //添加连续个
        for (i = 0; i < dataObj.targetTotalNum; i++) {
            this[dataObj.arrName].push(this._target);
        }
        //随机剩余目标item的位置
        let posArr = [];
        let length = dataObj.num - totalDis - dataObj.targetTotalNum;
        for (i = 0; i < (dataObj.targetNum - dataObj.targetTotalNum); i++) {
            let pos = cc.random0To1() * length;
            while (posArr.indexOf(pos) >= 0) {
                pos = (pos + 1) % length;
            }
            posArr.push(pos);
        }
        //添加剩下的
        for (i = 0; i < length; i++) {
            if (posArr.indexOf(i) >= 0) {
                this[dataObj.arrName].push(this._target);
            } else {
                this[dataObj.arrName].push(this._randomArr[parseInt(cc.random0To1() * this._randomArr.length)]);
            }
        }
        if (this[dataObj.arrName].length !== dataObj.num) {
            client.showLog("page_game buildItemArr finish error !!!");
        }
    }
});
