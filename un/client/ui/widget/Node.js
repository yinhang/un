un.define(
    "un.client.ui.widget.Node",
    [
        "un.client.Class",
        "un.client.data.tree.Node"
    ],
    function (Class, TreeNode) {
        var Node = Class.define(
            function (widget) {
                this._super(widget);
                this.widget = widget;
                this.widgetList = [];
                this.zIndexIndex = {};
                this.maxZIndex = null;
                this.minZIndex = null;
                this.widgetIndex = {};
            },
            {
                getParent: function () {
                    var parent = this._super.getParent();
                    return parent ? parent.getData() : null;  
                },
                addChildNode: function (widget) {
                    var newWidgetZIndex = widget.getZIndex();
                    //命中索引直接插入
                    if(this.zIndexIndex.hasOwnProperty(newWidgetZIndex) == true)
                    {
                        this.widgetIndex[widget] = this.widgetList[this.zIndexIndex[newWidgetZIndex]].push(widget) - 1;
                        this._super.addChildNode(widget.getNode());
                        return;
                    }
                    if(this.widgetList.length <= 0)
                    {
                        this.maxZIndex = newWidgetZIndex;
                        this.minZIndex = newWidgetZIndex;
                        this.zIndexIndex[this.maxZIndex] = 0;
                        this.widgetList[0] = [widget];
                        this._super.addChildNode(widget.getNode());
                        this.widgetIndex[widget] = 0;
                        return;
                    }
                    else if(newWidgetZIndex > this.maxZIndex)
                    {
                        var newMaxZIndexIndex = this.zIndexIndex[this.maxZIndex];
                        while(this.maxZIndex < newWidgetZIndex)
                        {
                            ++ newMaxZIndexIndex;
                            ++ this.maxZIndex;
                            this.widgetList[newMaxZIndexIndex] = [];
                            this.zIndexIndex[this.maxZIndex] = newMaxZIndexIndex;
                        }
                        this.add(widget);
                        return;
                    }
                    else if(newWidgetZIndex < this.minZIndex)
                    {
                        while(this.minZIndex > newWidgetZIndex)
                        {
                            -- this.minZIndex;
                            this.widgetList.splice(0, 0, widget);
                        }
                        this.add(widget);
                        return;
                    }
                },
                removeChildNode: function (widget) {
                    var zIndex = widget.getZIndex();
                    if(this.zIndexIndex.hasOwnProperty(zIndex) == true && this.widgetIndex.hasOwnProperty(widget) == true)
                    {
                        //在组件列表中去除，并且删除索引。
                        this.widgetList[this.zIndexIndex[zIndex]].splice(this.widgetIndex[widget], 1);
                        delete this.widgetIndex[widget];
                        this._super.removeChildNode(widget.getNode());
                    }
                },
                getChildWidgetListByIndex: function (zIndex) {
                    return this.widgetList[zIndex];
                },
                getChildWidgetList: function () {
                    return this.widgetList;
                },
                getChildNodeList: function () {
                    var childNodeList = this._super.getChildNodeList();
                    var chindNodeDataList = [];
                    for(var i = 0, l = childNodeList.length; i < l; ++ i)
                    {
                        chindNodeDataList.push(childNodeList[i].getData());
                    }
                    return chindNodeDataList;
                }
            },
            TreeNode
        );
        
        return Node;
    }
);
