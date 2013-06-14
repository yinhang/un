un.define(
    "un.client.ui.widget.Text",
    [
        "un.client.Class",
        "un.client.ui.Widget"
    ],
    function (Class, Widget) {
        //canvas ctx2d text绘制貌似有问题，在一个canvas上多次绘制会比划越描越重。框架已经解决，很恶心的方法。
        var Text = Class.define(
            function (text, width, height) {
                var self = this;
                this._super(width, height);
                this.setText(text);
                this.painter = this.getPainter();
                this.setSize(width > height ? height : width);
                this.setColor("#000000");
                this.ctx = this.painter.getContext();
                this.selfRepaintCall = 0;
                //标记为text节点
                this._text_widget = true;
            },
            {
                getText: function () {
                    return this.text;
                },
                setColor: function (color) {
                    this.color = color;
                },
                getColor: function () {
                    return this.color;
                },
                setText: function (text) {
                    this.text = text;
                },
                setSize: function (size) {
                    this.size = size;
                },
                getSize: function () {
                    return this.size
                },
                paint: function () {
                    this.painter.clean();
                    var width = this.getWidth();
                    var height = this.getHeight();
                    var text = this.getText();
                    if(text && text.length > 0)
                    {
                        this.ctx.fillStyle = this.color;
                        this.ctx.textBaseline = "top";
                        this.ctx.font = this.size + "px";
                        this.ctx.fillText(text, 0,  0);
                    }
                }
            },
            Widget
        );
        
        return Text;
    }
);
