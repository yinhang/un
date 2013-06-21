un.define(
    "un.client.ui.widget.TextField",
    [
        "un.client.Class",
        "un.client.ui.Widget",
        "un.client.ui.widget.Text"
    ],
    function (Class, Widget, Text) {
        var TextField = Class.define(
            function (width, height) {
                var self = this;
                this._super(width, height);
                this.text = new Text("", width, height);
                this.add(this.text);
            },
            {
                getValue: function () {
                    return this.text.getText();
                },
                setValue: function (value) {
                    this.text.setText(value);
                },
                paint: function () {
                    var painter = this.getPainter();
                    painter.clean();
                    var ctx = painter.getContext();
                    var fontSize = this.text.getSize();
                    var offsetX = this.text.measureSize().width + fontSize / 8;
                    var marginTopBottom = fontSize / 8;
                    ctx.strokeStyle = "#000000";
                    ctx.lineWidth = 1;
                    ctx.moveTo(offsetX, marginTopBottom);
                    ctx.lineTo(offsetX, fontSize - marginTopBottom );
                    ctx.stroke();
                }
            },
            Widget
        );
        
        return TextField;
    }
);
