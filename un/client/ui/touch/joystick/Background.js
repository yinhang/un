un.define(
    "un.client.ui.touch.joystick.Background",
    [
        "un.client.Class",
        "un.client.Element"
    ],
    function (Class, Element) {
        var Background = Class.define(
            function (x, y, radius) {
                var self = this;
                var dRadius = radius * 2;
                this._super(dRadius, dRadius);
                this.setX(x);
                this.setY(y);
                this._super.setWidth(radius);
                this._super.setHeight(radius);
                this.arcX = this.getX() + radius;
                this.arcY = this.getY() + radius;
                this.setRadius(radius);
            },
            {
                setX: function (x) {
                    this._super.setX(x);
                    this.arcX = x + this.getRadius();
                },
                setY: function (y) {
                    this._super.setY(y);
                    this.arcY = y + this.getRadius();
                },
                getRadius: function () {
                    return this.radius;
                },
                setRadius: function (radius) {
                    var dRadius = radius * 2;
                    this._super.setWidth(dRadius);
                    this._super.setHeight(dRadius);
                    this.radius = radius;
                    this.setX(this.arcX - radius);
                    this.setY(this.arcY - radius);
                },
                getArcX: function () {
                    return this.arcX;
                },
                getArcY: function () {
                    return this.arcY;
                },
                setWidth: function (width) {
                },
                setHeight: function (height) {
                },
                draw: function (painter) {
                    var context = painter.getContext();
                    context.strokeStyle = "rgba(145,145,145,0.25)";
                    context.lineWidth = 1;
                    painter.begin();
                    painter.drawArc(this.getArcX(), this.getArcY(), this.getRadius(), 0, 360, false);
                    painter.stroke();
                }
            },
            Element
        );
        
        return Background;
    }
);
