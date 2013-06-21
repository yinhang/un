un.define(
    "un.client.ui.widget.Frame",
    [
        "un.client.Class",
        "un.client.ui.Widget",
        "un.client.ui.Mouse",
        "un.client.ui.Touch"
    ],
    function (Class, Widget, Mouse, Touch) {
        var frameMap = {};
        function rePostEvent(name, event, frame) {
            var x = frame.getX();
            var y = frame.getY();
            var right = x + frame.getWidth();
            var bottom = y + frame.getHeight();
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
                    frame.post(name, event);
                }
                return;
            }
            var unX = event.unX;
            var unY = event.unY;
            if(unX >= x && unX <= right && unY >= y && unY <= bottom)
            {
                if(name === "mouseenter")
                {
                    frame.mouseEnter = true;
                }
                else if (name === "mouseleave")
                {
                    frame.mouseEnter = false;
                }
                if(name === "mousemove")
                {
                    if(frame.mouseEnter === false)
                    {
                        frame.post("mouseenter", event);
                        frame.mouseEnter = true;
                    }
                }
                frame.post(name, event);
            }
            else if(name === "mousemove")
            {
                if(frame.mouseEnter === true)
                {
                    frame.post("mouseleave", event);
                    frame.mouseEnter = false;
                }
            }
            else if(name === "mouseleave")
            {
                if(frame.mouseEnter === true)
                {
                    frame.post("mouseleave", event);
                    frame.mouseEnter = false;
                }
            }
        };
        
        var Frame = Class.define(
            function (screen, width, height) {
                var self = this;
                this._super(width, height);
                this.screen = screen;
                this.screen.listen("resize", function (data) {
                    self.setWidth(data.width);
                    self.setHeight(data.height);
                });
                this.mouse = new Mouse(this.screen);
                this.touch = new Touch(this.screen);
                this.mouseEnter = false;
                //转发大量鼠标事件
                this.touch.listen("start", function (event) {
                    rePostEvent("touchstart", event, self);
                });
                this.touch.listen("end", function (event) {
                    rePostEvent("touchend", event, self);
                });
                this.touch.listen("move", function (event) {
                    rePostEvent("touchmove", event, self);
                });
                this.touch.listen("cancel", function (event) {
                    rePostEvent("touchcancel", event, self);
                });
                this.mouse.listen("up", function (event) {
                    rePostEvent("mouseup", event, self);
                });
                this.mouse.listen("hover", function (event) {
                    rePostEvent("hover", event, self);
                });
                this.mouse.listen("down", function (event) {
                    rePostEvent("mousedown", event, self);
                });
                this.mouse.listen("enter", function (event) {
                    rePostEvent("mouseenter", event, self);
                });
                this.mouse.listen("leave", function (event) {
                    rePostEvent("mouseleave", event, self);
                });
                this.mouse.listen("click", function (event) {
                    rePostEvent("click", event, self);
                });
                this.mouse.listen("move", function (event) {
                    rePostEvent("mousemove", event, self);
                });
                this.screenPainter = screen.getPainter();
                this.painter = this.getPainter();
                this.updated = false;
                this.listen("update", function () {
                    self.updated = true;
                });
            },
            {
                getScreen: function () {
                    return this.screen;
                },
                cleanScreen: function () {
                    if(this.updated)
                    {
                        this.updated = false;
                        this.getScreen().getPainter().clean();
                    }
                },
                paint: function () {
                    this.painter.clean();  
                    this.post("update", this);
                }
            },
            Widget
        );
        //一个Screen只能有一个Frame.
        return {
            getFrame: function (screen) {
                var screenFrame = frameMap[screen];
                if(screenFrame)
                    return screenFrame;
                screenFrame = frameMap[screen] = new Frame(screen, screen.getWidth(), screen.getHeight());
                return screenFrame;
            }
        };
    }
);
