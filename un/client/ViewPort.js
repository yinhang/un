un.define(
    "un.client.ViewPort", 
    [
        "un.client.graphics.Displayable", 
        "un.client.Class"
    ], 
    function (Displayable, Class) {
        var ViewPort = Class.define(
            function () {
                this.setSource(window);
                this._super(this.getSource().innerWidth, this.getSource().innerHeight);
            },
            {
                getWidth: function () {
                    return this.getSource().innerWidth;
                },
                getHeight: function () {
                    return this.getSource().innerHeight;
                },
                setX: function () {
                    
                },
                setY: function () {
                    
                },
                setWidth: function () {
                    
                },
                setHeight: function () {
                    
                }
            },
            Displayable
        );
        return new ViewPort();
    }
);
