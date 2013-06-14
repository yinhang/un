un.define(
    "un.client.Element",
    [
        "un.client.Class",
        "un.client.graphics.Displayable"
    ],
    function (Class, Displayable) {
        var Element = Class.define(
            function (width, height) {
                this._super(width, height);
            },
            {
                clean: function (painter) {
                    painter.clearRect(this.getX(), this.getY(), this.getWidth(), this.getHeight());
                }
            },
            Displayable
        );
        
        return Element;
    }
);
