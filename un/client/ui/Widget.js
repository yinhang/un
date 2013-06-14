un.define(
    "un.client.ui.Widget",
    [
        "un.client.Class",
        "un.client.ui.widget.Node",
        "un.client.graphics.Canvas"
    ],
    function (Class, Node, Canvas) {
        
        function rePostEvent(name, event, widget) {
            var x = widget.getScreenX();
            var y = widget.getScreenY();
            var right = x + widget.getWidth();
            var bottom = y + widget.getHeight();
            if(name == "touchstart" || name == "touchmove" || name == "touchend" || name == "touchcancel")
            {
                var canRePost = false;
                var touches = event.touches;
                event.unTargetTouches = [];
                var canPost = false;
                for(var i = 0, l = touches.length;i < l; ++ i)
                {
                    var finger = touches[i];
                    if(finger.pageX >= x && finger.pageX <= right
                        && finger.pageY >= y && finger.pageY <= bottom)
                        {
                            finger.unX = finger.pageX - x;
                            finger.unY = finger.pageY - y;
                            event.unTargetTouches.push(finger);
                            canRePost = true;
                        }
                }
                if(canRePost)
                {
                    widget.post(name, event);
                }
                return;
            }
            var unX = event.unX;
            var unY = event.unY;
            if(unX >= x && unX <= right && unY >= y && unY <= bottom)
            {
                if(name === "mouseenter")
                {
                    widget.mouseEnter = true;
                }
                else if (name === "mouseleave")
                {
                    widget.mouseEnter = false;
                }
                if(name === "mousemove")
                {
                    if(widget.mouseEnter === false)
                    {
                        widget.post("mouseenter", event);
                        widget.mouseEnter = true;
                    }
                }
                widget.post(name, event);
            }
            else if(name === "mousemove")
            {
                if(widget.mouseEnter === true)
                {
                    widget.post("mouseleave", event);
                    widget.mouseEnter = false;
                }
            }
            else if(name === "mouseleave")
            {
                if(widget.mouseEnter === true)
                {
                    widget.post("mouseleave", event);
                    widget.mouseEnter = false;
                }
            }
        };
        
        var eventListenerList = {
            "mouseenter": function (event) {
                event.unWidget = this;
                rePostEvent("mouseenter", event, this);
            },
            "mouseleave": function (event) {
                event.unWidget = this;
                rePostEvent("mouseleave", event, this);
            },
            "click": function (event) {
                event.unWidget = this;
                rePostEvent("click", event, this);
            },
            "mousedown": function (event) {
                event.unWidget = this;
                rePostEvent("mousedown", event, this);
            },
            "mouseup": function (event) {
                event.unWidget = this;
                rePostEvent("mouseup", event, this);
            },
            "mousemove": function (event) {
                event.unWidget = this;
                rePostEvent("mousemove", event, this);
            },
            "hover": function (event) {
                event.unWidget = this;
                rePostEvent("hover", event, this);
            },
            "touchstart": function (event) {
                event.unWidget = this;
                rePostEvent("touchstart", event, this);
            },
            "touchmove": function (event) {
                event.unWidget = this;
                rePostEvent("touchmove", event, this);
            },
            "touchend": function (event) {
                event.unWidget = this;
                rePostEvent("touchend", event, this);
            },
            "touchcancel": function (event) {
                event.unWidget = this;
                rePostEvent("touchcancel", event, this);
            }
        };
        
        var dependEventList = {
            "mouseenter": [
                "mousemove"
            ],
            "mouseleave": [
                "mousemove"
            ]
        };
        
        function addEventListener(name, widget, parent) {
            var listener = eventListenerList[name];
            if(listener)
            {
                widget.eventList = widget.eventList || {};
                widget.eventList[name] = function () {
                    listener.apply(widget, arguments);
                };
                parent.listen(name, widget.eventList[name]);
                var dependEvents = dependEventList[name];
                if(dependEvents)
                {
                    for(var i = 0, l = dependEvents.length; i < l; ++ i)
                    {
                        addEventListener(dependEvents[i], widget, parent);
                    } 
                }
            }
        };
        
        function addAllEventListener(widget, parent) {
            for(var listenName in eventListenerList)
            {
                addEventListener(listenName, widget, parent);
            }
        };
        
        function removeAllEventListener(parent, widget) {
            var listenerList = widget.eventList;
            if(listenerList)
            {
                for(var listenName in listenerList)
                {
                    parent.removeListener(listenName, listenerList[listenName]);
                    listenerList[listenName] = null;
                }
            }
        };
        
        var Widget = Class.define(
            function (width, height) {
                var self = this;
                this.node = new Node(this);
                this.lastSize = {
                    width: 0,
                    height: 0
                };
                this._super(width, height);
                this.setZIndex(0);
                this.mouseEnter = false;
                //listen parent widget's events
                this.listen("add", function (parent) {
                    if(self.eventList)
                    {
                        for(var name in self.eventList)
                        {
                            if(self.eventList[name] == null)
                                addEventListener(name, self, parent);
                        }
                    }
                });
                this.listen("remove", function (parent) {
                    if(self.eventList)
                        removeAllEventListener(parent, self);
                });
                //记录是否有text子widget以及是否为text widget，以修复text重复绘制比划加重的问题
                this._has_textwidget_child = false;
                this._text_widget = false;
                //
                this.paint_allow = false;
                this.repaint();
            },
            {
                listen: function (name, callback) {
                    if(( this.eventList == undefined || this.eventList[name] == null))
                    {
                        var parentWidget = this.getParent();
                        if(parentWidget)
                            addEventListener(name, this, parentWidget);
                        else
                        {
                            this.eventList = this.eventList || {};
                            this.eventList[name] = null;
                        }
                    }
                    this._super.listen(name, callback);
                },
                setWidth: function (width) {
                    this._super.setWidth(width);
                    if(this.lastSize.width != width)
                    {
                        this.lastSize.width = width;
                        this.post("resize", this);
                    }
                },
                setHeight: function (height) {
                    this._super.setHeight(height);
                    if(this.lastSize.height != height)
                    {
                        this.lastSize.height = height;
                        this.post("resize", this);
                    }
                },
                repaint: function () {
                    this.paint_allow = true;
                    this.post("repaint", true);
                },
                getNode: function () {
                    return this.node;
                },
                add: function (widget) {
                    var self = this;
                    //记录是否有text子节点
                    if(widget._has_textwidget_child === true || widget._text_widget === true)
                    {
                        this._has_textwidget_child = true; 
                    }
                    //
                    widget.remove();
                    this.node.addChildNode(widget);
                    widget.post("add", this);
                    var repaintListener = function () {
                        self.repaint();
                    };
                    var removeListener = function () {
                        widget.removeListener("repaint", repaintListener);
                        widget.removeListener("remove", removeListener);
                    };
                    widget.listen("repaint", repaintListener);
                    widget.listen("remove", removeListener);
                },
                getChildren: function () {
                    return this.node.getChildNodeList();
                },
                remove: function () {
                    var oldParent = this.getParent();
                    if(oldParent)
                    {
                        oldParent.getNode().removeChildNode(this);
                        this.post("remove", oldParent);
                    }
                },
                getParent: function () {
                    return this.node.getParent();
                },
                destroy: function () {
                    
                },
                getScreen: function () {
                    parent = this.getParent();
                    var screen = null;
                    while(parent != null) {
                        screen = parent.getScreen();
                        if(screen)
                            return screen;
                        parent = parent.getParent();
                    } 
                    return null;
                },
                getScreenX: function () {
                    var parent = this;
                    var x = 0;
                    do {
                        x += parent.getX();
                        parent = parent.getParent();
                    } while(parent != null)
                    return x;
                },
                getScreenY: function () {
                    var parent = this;
                    var y = 0;
                    do {
                        y += parent.getY();
                        parent = parent.getParent();
                    } while(parent != null)
                    return y;
                },
                setZIndex: function (zIndex) {
                    this.zIndex = zIndex;
                },
                getZIndex: function () {
                    return this.zIndex;
                },
                paint: function () {
                    this.getPainter().clean();
                },
                reDraw: function () {
                    
                },
                drawMe: function () {
                    //允许重绘标志==true or 拥有text子节点 则开始重绘
                    if(this.paint_allow == true || this._has_textwidget_child === true)
                    {
                        this.paint_allow = false;
                        this.redraw_childwidget_allow = true;
                        this.paint();
                    }
                },
                refreshParent: function () {
                    var parentContext = this.getParent() || this.getScreen();
                    if(parentContext)
                    {
                        parentContext.getPainter().drawCanvas(this);
                        // var parentPainterContext = parentContext.getPainter().getContext();
                        // var parentWidth = parentContext.getWidth();
                        // var parentHeight = parentContext.getHeight();
                        // var width = this.getWidth();
                        // var height = this.getHeight();
                        // var x = this.getX();
                        // var y = this.getY();
                        // var right = x + width;
                        // var bottom = y + height;
                        // var clipX = 0, clipY = 0;
                        // var drawX = x;
                        // var drawY = y;
                        // if(x > parentWidth || right < 0 || y > parentHeight || bottom < 0)
                        // {
                            // return;
                        // }
                        // if(x < 0)
                        // {
                            // clipX = x * -1;
                            // drawX = 0;
                        // }
                        // if(y < 0)
                        // {
                            // clipY = y * -1;
                            // drawY = 0;
                        // }
                        // var clipWidth = width - clipX, clipHeight = height - clipY;
                        // if(right > parentWidth)
                            // clipWidth = width - ( right - parentWidth ) - clipX;
                        // if(bottom > parentHeight)
                            // clipHeight = height - ( bottom - parentHeight ) - clipY;
                        // parentPainterContext.drawImage(this.getSource(), clipX, clipY, clipWidth , clipHeight, drawX, drawY, clipWidth, clipHeight);
                    }
                },
                drawChildren: function () {
                    if(this.redraw_childwidget_allow == true)
                    {
                        this.redraw_childwidget_allow = false;
                        var widgetList = this.node.getChildWidgetList();
                        //z-index
                        for(var i = 0, l = widgetList.length; i < l; ++ i)
                        {
                            //widget
                            var subWidgetList = widgetList[i];
                            for(var ii = subWidgetList.length - 1; ii >= 0; -- ii)
                            {
                                subWidgetList[ii].draw();
                            }  
                        }
                    }
                },
                draw: function () {
                    this.drawMe();
                    this.drawChildren();
                    this.refreshParent();
                }
            },
            Canvas
        );
        
        return Widget;
    }
);
