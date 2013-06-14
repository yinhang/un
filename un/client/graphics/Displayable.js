un.define(
    "un.client.graphics.Displayable", 
    [
        "un.client.Class",
    ],
    function (Class) {
        return Class.define(
            function (width, height) {
                this.shown = true;
                this.width = width || 1;
                this.height = height || 1;
                this.x = 1;
                this.y = 1;
            }, 
            {
                //原生显示对象
                setSource: function (source) {
                    this.source = source;  
                },
                getSource: function () {
                    return this.source;
                },
                setX: function (x) {
                    this.x = x;
                },
                getX: function () {
                    return this.x;
                },
                setY: function (y) {
                    this.y = y;
                },
                getY: function () {
                    return this.y;
                },
                setHeight: function (height) {
                    this.height = height;
                },
                getHeight: function () {
                    return this.height;
                },
                setWidth: function (width) {
                    this.width = width;
                },
                getWidth: function () {
                    return this.width;
                },
                show: function () {
                    this.shown = true;
                },
                hide: function () {
                    this.shown = false;
                },
                isShown: function () {
                    return this.shown;
                }
            }
        );
    }
);
