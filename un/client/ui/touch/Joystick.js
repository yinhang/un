un.define(
    "un.client.ui.touch.Joystick",
    [
        "un.client.Screen",
        "un.client.Class",
        "un.client.ui.touch.joystick.Background",
        "un.client.Element",
        "un.client.ui.touch.joystick.Button"
    ],
    function (Screen, Class, Background, Element, Button) {
        var Joystick = Class.define(
            function (screen, x, y, radius) {
                var self = this;
                this.background = new Background(x, y, radius);
                var screenSource = screen.getSource();
                this._super(this.background.getWidth(), this.background.getHeight());
                this.button = new Button(this.background, Math.floor(this.background.getRadius() * 0.8));
                var startBtnTouchX = 0;
                var startBtnTouchY = 0;
                var startBtnX = 0;
                var startBtnY = 0;
                var curTouch = null;
                this.trueBtnArcX = self.button.getArcX();
                this.trueBtnArcY = self.button.getArcY();
                this.mathD2ATmp = Math.PI / 180;
                screenSource.addEventListener("touchstart", function (event) {
                    var touches = event.touches;
                    for(var i = 0, l = touches.length; i < l; ++ i)
                    {
                        var touch = touches[i];
                        var clientX = touch.clientX;
                        var clientY = touch.clientY;
                        var buttonArcX = self.button.getArcX();
                        var buttonArcY = self.button.getArcY();
                        var a = clientX - screenSource.offsetLeft - buttonArcX;
                        var b = clientY - screenSource.offsetTop - buttonArcY;
                        var c = Math.sqrt(a * a + b * b);
                        if(c <= self.button.getRadius())
                        {
                            curTouch = touch;
                            startBtnTouchX = clientX; 
                            startBtnTouchY = clientY; 
                            startBtnX = self.trueBtnArcX;
                            startBtnY = self.trueBtnArcY;
                            break;
                        }
                    }
                });
                screenSource.addEventListener("touchmove", function (event) {
                    var touches = event.touches;
                    for(var i = 0, l = touches.length; i < l; ++ i)
                    {
                        var touch = touches[i];
                        if(( curTouch && ( curTouch.identifier === touch.identifier )))
                        {
                            self.trueBtnArcX = startBtnX + touch.clientX - startBtnTouchX;
                            self.trueBtnArcY = startBtnY + touch.clientY - startBtnTouchY;
                            break;
                        }
                    }
                });
                screenSource.addEventListener("touchend", function (event) {
                    var touches = event.changedTouches;
                    for(var i = 0, l = touches.length; i < l; ++ i)
                    {
                        var touch = touches[i];
                        if(( curTouch && ( curTouch.identifier === touch.identifier )))
                        {
                            curTouch = null;
                            startBtnTouchX = 0;
                            startBtnTouchY = 0;
                            startBtnX = 0;
                            startBtnY = 0;
                            self.trueBtnArcX = self.background.getArcX();
                            self.trueBtnArcY = self.background.getArcY();
                            break;
                        }
                    }
                });
            },
            {
                getButton: function () {
                    return this.button;
                },
                getBackground: function () {
                    return this.background;
                },
                getX: function () {
                    var backgroundX = this.background.getX();
                    var buttonX = this.button.getX();
                    return backgroundX < buttonX ? backgroundX : buttonX;
                },
                getAngle: function () {
                    return ( Math.atan2(this.trueBtnArcY - this.background.getArcY(), this.trueBtnArcX - this.background.getArcX()) / ( this.mathD2ATmp ) );
                },
                getStrength: function () {
                    var a = this.trueBtnArcY - this.background.getArcY();
                    var b = this.trueBtnArcX - this.background.getArcX();
                    return Math.sqrt(a * a + b * b);
                },
                getY: function () {
                    var backgroundY = this.background.getX();
                    var buttonY = this.button.getY();
                    return backgroundY < buttonY ? backgroundY : buttonY;
                },
                getWidth: function () {
                    var backgroundRight = this.background.getX() + this.background.getWidth();
                    var buttonRight = this.button.getX() + this.button.getWidth();
                    return backgroundRight > buttonRight ? backgroundRight - this.getX() : buttonRight - this.getX();
                },
                getHeight: function () {
                    var backgroundBottom = this.background.getY() + this.background.getHeight();
                    var buttonBottom = this.button.getY() + this.button.getHeight();
                    return backgroundBottom > buttonBottom ? backgroundBottom - this.getY() : buttonBottom - this.getY();
                },
                setX: function (x) {
                    this._super.setX(x);
                    this.background.setX(x);
                    this.button.setArcX(this.background.getArcX());
                },
                setY: function (y) {
                    this._super.setY(y);
                    this.background.setY(y);
                    this.button.setArcY(this.background.getArcY());
                },
                getRadius: function () {
                    return this.background.getRadius();
                },
                setRadius: function (radius) {
                    this.background.setRadius(radius);
                    this.button.setRadius(Math.floor(this.background.getRadius() * 0.8));
                },
                setWidth: function (width) {
                },
                setHeight: function (height) {
                },
                draw: function (painter) {
                    this.button.setArcX(this.trueBtnArcX);
                    this.button.setArcY(this.trueBtnArcY);
                    this.background.draw(painter);
                    this.button.draw(painter);
                }
            },
            Element
        );
        
        return Joystick;
    }
);
