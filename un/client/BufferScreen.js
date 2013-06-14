un.define(
    "un.client.BufferScreen",
    [
        "un.client.Class",
        "un.client.Screen"
    ],
    function (Class, Screen) {
        return Class.define(
            function (parent, width, height) {
                this._super(document.createElement("div"), width, height);
                var parentScreen = new Screen(parent, width, height);
                this.parentScreenPainter = parentScreen.getPainter();
            },
            {
                flush: function () {
                    this.parentScreenPainter.drawCanvas(this);
                }
            },
            Screen
        );
    }
);
