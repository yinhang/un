un.define(
    "un.client.graphics.Image", 
    [
        "un.client.graphics.Displayable", 
        "un.client.Class"
    ], 
    function (Displayable, Class) {
        return Class.define(
            function (image) {
                this._super(image.width, image.height);
                this.setSource(image);
            },
            {
                setHeight: function () {},
                setWidth: function () {}
            },
            Displayable
        );
    }
);
