un.define(
    "un.client.ui.widget.Container",
    [
        "un.client.Class",
        "un.client.ui.Widget"
    ],
    function (Class, Widget) {
        
        function addAdaptContentHandle(parent, child) {
            parent.adapt_content_handle_map = parent.adapt_content_handle_map || {};
            if(parent.adapt_content_handle_map.hasOwnProperty(child) === true)
                return;
            var handleMap = {
                resize: function () {
                    parent.eventHandle["adapt_content"]();
                },
                remove: function () {
                    child.removeListener("resize", handleMap.resizeHandle);
                    child.removeListener("remove", handleMap.removeHandle);
                }
            };
            child.listen("resize", handleMap.resize);
            child.listen("remove", handleMap.remove);
            parent.adapt_content_handle_map[child] = handleMap;
        };
        
        function removeAdaptContentHandle(parent, child) {
            child.removeListener("resize", parent.adapt_content_handle_map[child].resize);
            child.removeListener("remove", parent.adapt_content_handle_map[child].remove);
            delete parent.adapt_content_handle_map[child];
        };
        
        function addAdaptContentHandleForAll(parent) {
            var children = parent.getChildren();
            for(var i = 0, l = children.length; i < l; ++ i)
            {
                addAdaptContentHandle(parent, children[i]);
            }
        };
        
        function removeAdaptContentHandleForAll(parent) {
            var children = parent.getChildren();
            for(var i = 0, l = children.length; i < l; ++ i)
            {
                removeAdaptContentHandle(parent, children[i]);
            }
        };
        
        var Container = Class.define(
            function (width, height) {
                var self = this;
                this._super(width, height);
                this.autoAdaptContentEnabled = false;
                this.eventHandle = {
                    "adapt_content": function () {
                        self.adaptContent();
                    }
                };
            },
            {
                autoAdaptContent: function (enable) {
                    enable = ( enable === false ? false : true );
                    if(this.autoAdaptContentEnabled === enable)
                        return;
                    this.autoAdaptContentEnabled = ( enable === false ? false : true );
                    if(this.autoAdaptContentEnabled)
                    {
                        addAdaptContentHandleForAll(this);
                        this.listen("add", this.eventHandle["adapt_content"]);
                        this.adaptContent();
                    }
                    else
                    {
                        removeAdaptContentHandleForAll(this);
                        this.removeListener("add", this.eventHandle["adapt_content"]);
                    }
                },
                add: function (widget) {
                    if(this.autoAdaptContentEnabled === true)
                    {
                        addAdaptContentHandle(this, widget);
                        this._super.add(widget);
                        this.adaptContent();
                    }
                    else
                    {
                        this._super.add(widget);
                    }
                },
                paint: function () {
                    this.getPainter().clean();
                },
                adaptContent: function () {
                    var children = this.getChildren();
                    var width = 0;
                    var height = 0;
                    for(var i = 0, l = children.length; i < l; ++ i)
                    {
                        var child = children[i];
                        var childRight = child.getX() + child.getWidth();
                        var childBottom = child.getY() + child.getHeight();
                        if(childRight > width)
                            width = childRight;
                        if(childBottom > height)
                            height = childBottom;
                    }
                    this.setWidth(width);
                    this.setHeight(height);
                }
            },
            Widget
        );
        
        return Container;
    }
);
