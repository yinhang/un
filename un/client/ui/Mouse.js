un.define(
    "un.client.ui.Mouse",
    [
        "un.client.Class",
        "un.client.ViewPort",
        "un.client.Screen",
        "un.client.Runner"
    ],
    function (Class, ViewPort, Screen, Runner) {
        var maxZIndex = 1000;
        var curDragObj = null;
        var curDragDOMffsetX = null, curDragDOMOffsetY = null;
        
        var mouseList = {};
        
        var runner = new Runner(function () {
            for(var name in mouseList)
            {
                var info = mouseList[name];
                info.m.post("hover", info.e);
            }
        }, 60);
        
        runner.start();
        
        function postHover(mouse, event) {
            if(mouseList[mouse])
                return;
            mouseList[mouse] = {
                m: mouse,
                e: event
            };
            updateHover(mouse, event);
        };
        
        function updateHover(mouse, event) {
            if(mouseList[mouse])
            {
                event.type = "hover";
                mouseList[mouse].e = event;
            }
        };
        
        function stopPostHover(mouse) {
            delete mouseList[mouse];
        };
        
        var Mouse = Class.define(
            function (screen, drag) {
                var self = this;
                this.screen = screen;
                var source = screen.getSource();
                if(screen.is && ( screen.is(Screen) || screen.is(ViewPort.getClass()) ))
                {
                    source.addEventListener("mousedown", function (event) {
                        event.unX = event.pageX - screen.getX();
                        event.unY = event.pageY - screen.getY();
                        if(self.post("down", event) == false)
                        {
                            return false;
                        }
                    });
                    source.addEventListener("mouseup", function (event) {
                        event.unX = event.pageX - screen.getX();
                        event.unY = event.pageY - screen.getY();
                        if(self.post("up", event) == false)
                        {
                            return false;
                        }
                    });
                    source.addEventListener("mousemove", function (event) {
                        event.unX = event.pageX - screen.getX();
                        event.unY = event.pageY - screen.getY();
                        if(self.post("move", event) == false)
                        {
                            return false;
                        }
                        updateHover(self, event);
                    });
                    source.addEventListener("dblclick", function (event) {
                        event.unX = event.pageX - screen.getX();
                        event.unY = event.pageY - screen.getY();
                        if(self.post("dblclick", event) == false)
                        {
                            return false;
                        }
                    });
                    source.addEventListener("mouseenter", function (event) {
                        event.unX = event.pageX - screen.getX();
                        event.unY = event.pageY - screen.getY();
                        if(self.post("enter", event) == false)
                        {
                            return false;
                        }
                        postHover(self, event);
                    });
                    source.addEventListener("click", function (event) {
                        event.unX = event.pageX - screen.getX();
                        event.unY = event.pageY - screen.getY();
                        if(self.post("click", event) == false)
                        {
                            return false;
                        }
                    });
                    source.addEventListener("mouseleave", function (event) {
                        event.unX = event.pageX - screen.getX();
                        event.unY = event.pageY - screen.getY();
                        if(self.post("leave", event) == false)
                        {
                            return false;
                        }
                        stopPostHover(self, event);
                    }); 
                    if(drag === true && screen.is(ViewPort.getClass()) == false)
                    {
                        source.position = "absolute";
                        var viewPortMouse = new Mouse(ViewPort);
                        self.listen("down", function (event) {
                            source.style.zIndex = ++ maxZIndex;
                            curDragObj = screen;
                            curDragDOMffsetX = event.unX;
                            curDragDOMffsetY = event.unY;
                            self.post("un_dragstart", event);
                            event.stopPropagation();
                            return false;
                        });
                        viewPortMouse.listen("up", function (event) {
                            curDragObj = null;
                            curDragDOMffsetX = null;
                            curDragDOMffsetY = null;
                            self.post("un_dragend", event);
                            event.stopPropagation();
                            return false;
                        });
                        viewPortMouse.listen("move", function (event) {
                            if(curDragObj)
                            {
                                curDragObj.setX(event.clientX - curDragDOMffsetX);
                                curDragObj.setY(event.clientY - curDragDOMffsetY);
                                self.post("un_drag", event);
                                event.stopPropagation();
                                return false;
                            }
                        });
                    } 
                }
                else
                {
                    un.throwError("un.client.ui.mouse:初始化的时候必须传入一个Screen或者ViewPort。");
                }
            },
            {
                readyDrag: function (offsetX, offsetY) {
                    var event = document.createEvent("MouseEvents");
                    event.initEvent("mousedown", false, true);
                    event.unX = offsetX || 0;
                    event.unY = offsetY || 0;
                    this.post("down", event);
                }
            }
        );
        
        return Mouse;
    }
);
