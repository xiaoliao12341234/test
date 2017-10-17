/*global module, require, cc, client */
/**
 * @desc 构建 UIScene 中用到的层次节点
 * 特别注意，这边所有的结点移除都不会清除内存
 * @author Administrator
 */
var outModule = {};

class baseNode {
    //这边传入的node将会被封装
    constructor (node) {
        this._node = node;
    }

    /**
     * 添加一个子节点
     * UI场景的tag最好从UIPoolManager获取
     * ZOrder默认为1
     * 这边不提供由ZOrder来确定排序的功能，需要在添加逻辑中助理
     */
    addNode (node, tag) {
        this._node.addChild(node, 1, tag);
    }

    /**
     * 在指定index的位置加入一个节点
     * 如果index位置以后都有节点的话，将会移除这些节点
     * @param node
     * @param tag
     * @param index
     */
    addNodeWithIndex (node, tag, index) {
        if (!node) {
            client.showLog("UISceneClass : addNodeWithIndex node is null");
            return;
        }
        if (!tag) {
            client.showLog("UISceneClass : addNodeWithIndex tag is null");
            return;
        }
        if (index >= 0 && index < this._node.childrenCount) {
            let i;
            for (i = this._node.childrenCount - 1; i >= index; i--) {
                this._node.removeChild(this._node.children[i], false);
            }
        }
        this.addNode(node, tag);
    }

    /**
     * 移除节点
     * @param tag
     */
    removeChild (tag) {
        this._node.removeChildByTag(tag, false);
    }

    /**
     * 移除所有结点
     */
    removeAllChild () {
        this._node.removeAllChildren(false);
    }
}

/**
 * UI层
 */
class UINode extends baseNode {
    constructor (node) {
        super(node);
    }
}

/**
 * 用户弹出消息层
 */
class userMsgNode extends baseNode {
    constructor (node) {
        super(node);
    }
}

/**
 * 网络延迟消息层
 */
class netNode extends baseNode {
    constructor (node) {
        super(node);
    }
}

outModule.buildUINode = (node) => {
    return new UINode(node);
};

outModule.buildUserMsgNode = (node) => {
    return new userMsgNode(node);
};

outModule.buildNetNode = (node) => {
    return new netNode(node);
};

module.exports = outModule;