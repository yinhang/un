un.define(
    "un.client.ui.widget.View",
    [
        "un.client.Class",
        "un.client.ui.widget.Container",
        "un.client.ui.widget.view.Container",
        "un.client.ViewPort",
        "un.client.ui.Mouse",
        "un.client.ui.Touch",
        "un.client.tool.Browser"
    ],
    function (Class, WidgetContainer, Container, ViewPort, Mouse, Touch, Browser) {
        
        function getPower(distance, len) {
            return distance  / (len / 100);
        };
        
        var View = Class.define(
            function (width, height) {
                var self = this;
                this.container = new Container(width, height);
                this._super(width, height);
                this.scrollBinded = false;
                this.container.setX(0);
                this.container.setY(0);
                this._super.add(this.container);
                this.screenMouse = new Mouse(ViewPort);
                this.screenTouch = new Touch(ViewPort);
                this.animaAllow = false;
            },
            {
                paint: function () {
                    this.getPainter().clean();
                    var self = this;
                    if(self.animaAllow)
                    {
                        var container = self.container;
                        var conX = container.getX();
                        var conY = container.getY();
                        var conWidth = container.getWidth();
                        var conHeight = container.getHeight();
                        var conRight = conX + conWidth;
                        var conBottom = conY + conHeight;
                        var width = self.getWidth();
                        var height = self.getHeight();
                        var widthDiff = width - conWidth;
                        var heightDiff = height - conHeight;
                        
                        var leftExtrude = conX > 0;
                        var bottomExtrude = conBottom < height;
                        var rightExtrude = conRight < width;
                        var topExtrude = conY > 0;
                        if(leftExtrude || bottomExtrude || rightExtrude || topExtrude)
                        {
                            if(leftExtrude)
                            {
                                var speed = getPower(conX, width);
                                var newConX = conX - speed;
                                if(newConX <= 1)
                                {
                                    newConX = 0;
                                }
                                container.setX(newConX);
                            }
                            else if(rightExtrude)
                            {
                                var speed = getPower(width - conRight, width);
                                var newConX = conX + speed;
                                if(newConX + 1 >= widthDiff)
                                {
                                    newConX = widthDiff;
                                }
                                container.setX(newConX);
                            }
                            if(topExtrude)
                            {
                                var speed = getPower(conY, height);
                                var newConY = conY - speed;
                                if(newConY <= 1)
                                {
                                    newConY = 0;
                                }
                                container.setY(newConY);
                            }
                            else if(bottomExtrude)
                            {
                                var speed = getPower(height - conBottom, height);
                                var newConY = conY + speed;
                                if(newConY + 1 >= heightDiff)
                                {
                                    newConY = heightDiff;
                                }
                                container.setY(newConY);
                            }
                            this.repaint();
                        }
                        else
                        {
                            this.animaAllow = false;
                        }
                    }
                },
                add: function (widget) {
                    this.container.add(widget);
                },
                getContainer: function () {
                    return this.container;
                },
                getContainerPainter: function () {
                    return this.container.getPainter();
                },
                setWidth: function (width) {
                    var containerWidth = this.container.getWidth();
                    this.container.setWidth(containerWidth > width ? containerWidth : width);
                    this._super.setWidth(width);
                },
                setHeight: function (height) {
                    var containerHeight = this.container.getHeight();
                    this.container.setHeight(containerHeight > height ? containerHeight : height);
                    this._super.setHeight(height);
                },
                scroll: function (x, y) {
                    var self = this;
                    
                    var container = self.container;
                    var conX = container.getX();
                    var conY = container.getY();
                    var conWidth = container.getWidth();
                    var conHeight = container.getHeight();
                    var conRight = conX + conWidth;
                    var conBottom = conY + conHeight;
                    var width = self.getWidth();
                    var height = self.getHeight();
                    var dx = x - container.getX();
                    var dy = y - container.getY();
                    var rectWidth = width > height ? width : height;
                    
                    if(dx > 0)
                    {
                        if(conX > 0)
                            dx = dx / getPower(conX, rectWidth);
                    }
                    else if(dx < 0)
                    {
                        var paddingRight = width - conRight;
                        if(paddingRight > 0)
                        {
                            paddingRight = paddingRight > 1 ? paddingRight : 1;
                            dx = dx / getPower(paddingRight, rectWidth);
                        }
                    }  
                    if(dy > 0)
                    {
                        if(conY > 0)
                            dy = dy / getPower(conY, rectWidth);
                    }
                    else if(dy < 0)
                    {
                        var paddingBottom = height - conBottom;
                        if(paddingBottom > 0)
                        {
                            paddingBottom = paddingBottom > 1 ? paddingBottom : 1;
                            dy = dy / getPower(paddingBottom, rectWidth);
                        }
                    }  
                    container.setX(conX + dx);
                    container.setY(conY + dy);
                    self.repaint();
                },
                enableScroll: function (enableX, enableY) {
                    this.scrollEnabled = enableX || enableY ? true : false;
                    this.scrollXEnabled = enableX ? true : false;
                    this.scrollYEnabled = enableY ? true : false;
                    if(this.scrollEnabled != false)
                    {
                        if(this.scrollBinded == false)
                        {
                            var self = this;
                            if(Browser.mobile)
                            {                            
                                var curFinger = null;
                                this.container.listen("touchstart", function (event) {
                                    if(event.unTargetTouches.length == 1)
                                    {
                                        self.animaAllow = false;
                                        curFinger = event.unTargetTouches[0];
                                        self.lastPageX = curFinger.pageX;
                                        self.lastPageY = curFinger.pageY;
                                    }
                                });
                                this.container.listen("touchmove", function (event) {
                                    var touches = event.unTargetTouches;
                                    if(curFinger != null)
                                    {
                                        for(var i = 0, l = touches.length;i < l; ++ i)
                                        {
                                            var finger = touches[i];
                                            if(finger.identifier === curFinger.identifier)
                                            {
                                                self.animaAllow = false;
                                                var dx = 0;
                                                if(self.scrollXEnabled)
                                                    dx = finger.pageX - self.lastPageX;
                                                self.lastPageX = finger.pageX;
                                                var dy = 0;
                                                if(self.scrollYEnabled)
                                                    dy = finger.pageY - self.lastPageY;
                                                self.lastPageY = finger.pageY;
                                                if(dx != 0 || dy != 0)
                                                    self.scroll(self.container.getX() + dx, self.container.getY() + dy);
                                                return;
                                            }
                                        }   
                                    }
                                });
                                this.screenTouch.listen("end", function (event) {
                                    var touches = event.changedTouches;
                                    for(var i = 0, l = touches.length;i < l; ++ i)
                                    {
                                        var finger = touches[i];
                                        if(finger.identifier === curFinger.identifier)
                                        {
                                            self.animaAllow = true;
                                            self.repaint();
                                            curFinger = null;
                                            return;
                                        }
                                    }  
                                });
                                this.screenTouch.listen("cancel", function (event) {
                                    var touches = event.changedTouches;
                                    for(var i = 0, l = touches.length;i < l; ++ i)
                                    {
                                        var finger = touches[i];
                                        if(finger.identifier === curFinger.identifier)
                                        {
                                            self.animaAllow = true;
                                            self.repaint();
                                            curFinger = null;
                                            return;
                                        }
                                    }
                                });
                            }
                            else
                            {
                                this.container.listen("mousedown", function (event) {
                                    if(self.scrollEnabled != false)
                                    {
                                        self._mousedown = true;
                                        self.animaAllow = false;
                                        self.lastClientX = event.clientX;
                                        self.lastClientY = event.clientY;
                                    }
                                });
                                this.screenMouse.listen("up", function () {
                                    self._mousedown = false;
                                    self.animaAllow = true;
                                    self.repaint();
                                });
                                this.listen("mousemove", function (event) {
                                    if(self._mousedown === true)
                                    {
                                        if(self.scrollEnabled != false)
                                        {
                                            self.animaAllow = false;
                                            var dx = 0;
                                            if(self.scrollXEnabled)
                                                dx = event.clientX - self.lastClientX;
                                            self.lastClientX = event.clientX;
                                            var dy = 0;
                                            if(self.scrollYEnabled)
                                                dy = event.clientY - self.lastClientY;
                                            self.lastClientY = event.clientY;
                                            if(dx != 0 || dy != 0)
                                                self.scroll(self.container.getX() + dx, self.container.getY() + dy);
                                        }
                                    }
                                });
                            }
                        }
                    }
                }
            },
            WidgetContainer
        );
        
        return View;
    }
);
