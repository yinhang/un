un.define(
    "un.client.ui.widget.Button",
    [
        "un.client.Class",
        "un.client.ui.Widget"
    ],
    function (Class, Widget) {
        
        var Button = Class.define(
            function (text, width, height) {
                var self = this;
                this._super(width, height);
                this.setText(text);
                this.painter = this.getPainter();
            },
            {
                getText: function () {
                    return this.text;
                },
                setText: function (text) {
                    this.text = text;
                }
            },
            Widget
        );
        
        return Button;
    }
);
