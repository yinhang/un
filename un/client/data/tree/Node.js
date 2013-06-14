un.define(
    "un.client.data.tree.Node", 
    [
        "un.client.Class"
    ], 
    function (Class) {
        var Node = Class.define(
            function (data, parent) {
                this.data = data;
                this.parent = parent;
                this.childNodeList = [];
                this.childNodeIndex = {};
            },
            {
                getData: function () {
                    return this.data;
                },
                getParent: function () {
                    return this.parent;
                },
                addChildNode: function (node) {
                    if(this.childNodeIndex.hasOwnProperty(node) == false)
                    {
                        this.childNodeIndex[node] = this.childNodeList.push(node) - 1;
                        node.parent = this;
                    }
                },
                getChildNodeList: function () {
                    return this.childNodeList;
                },
                removeChildNode: function (node) {
                    if(this.childNodeIndex.hasOwnProperty(node) == true)
                    {
                        this.childNodeList.splice(this.childNodeIndex[node], 1);
                        delete this.childNodeIndex[node];
                        node.parent = null;
                    }
                }
            }
        );
        
        return Node;
    }
);
