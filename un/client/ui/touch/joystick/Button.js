un.define(
    "un.client.ui.touch.joystick.Button",
    [
        "un.client.Class",
        "un.client.Element"
    ],
    function (Class, Element) {
        var Background = Class.define(
            function (background, radius) {
                var dRadius = radius * 2;
                this._super(dRadius, dRadius);
                this.setRadius(radius);
                this.setArcX(background.getArcX());
                this.setArcY(background.getArcY());
            },
            {
                setX: function (x) {
                },
                setY: function (y) {
                },
                setArcX: function (arcX) {
                    this.arcX = arcX;
                    this._super.setX(this.arcX - this.getRadius());
                },
                setArcY: function (arcY) {
                    this.arcY = arcY;
                    this._super.setY(this.arcY - this.getRadius());
                },
                getRadius: function () {
                    return this.radius;
                },
                setRadius: function (radius) {
                    var dRadius = radius * 2;
                    this._super.setWidth(dRadius);
                    this._super.setHeight(dRadius);
                    this._super.setX(this.arcX - radius);
                    this._super.setY(this.arcY - radius);
                    this.radius = radius;
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
                    painter.getContext().fillStyle = "rgba(145,145,145,0.7)";
                    painter.begin();
                    painter.drawArc(this.getArcX(), this.getArcY(), this.getRadius(), 0, 360, false);
                    painter.fill();
                }
            },
            Element
        );
        
        return Background;
    }
);
