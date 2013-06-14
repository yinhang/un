un.define(
    "un.client.ui.widget.button.Default",
    [
        "un.client.Class",
        "un.client.ui.widget.Button",
        "un.client.ui.Mouse",
        "un.client.ViewPort"
    ],
    function (Class, Button, Mouse, ViewPort) {
        var Default = Class.define(
            function (text, textSize) {
                this._super(text, 0, 0);
                var self = this;
                this.fontSize = textSize;
                this.offsetX = 0;
                this.offsetY = 0;
                this.painter = this.getPainter();
                this.ctx = this.painter.getContext();
                this.listen("add", function (parent) {
                    var oldWidth = self.getWidth();
                    var oldHeight = self.getHeight();
                    if(oldWidth == 0 || oldHeight == 0 || oldWidth == undefined || oldWidth == null || oldHeight == undefined || oldHeight == null)
                    {
                        self.setWidth(parent.getWidth() / 8);
                        self.setHeight(self.getWidth() / 16 * 9);
                    }
                });
                var viewPortMouse = new Mouse(ViewPort);
                var defCursor = null;
                this.borderColor = "#828282";
                this.fontColor = "#000000";
                this.backgroundColor = "#ffffff";
                this.listen("mouseenter", function () {
                    self.offsetX = 0;
                    self.offsetY = 0;
                    self.borderColor = "#8A8A8A";
                    self.fontColor = "#000000";
                    self.backgroundColor = "#ffffff";
                    defCursor = self.getScreen().getSource().style.cursor;
                    self.getScreen().getSource().style.cursor = "pointer";
                    self.repaint();
                });
                this.listen("mouseleave", function () {
                    self.offsetX = 0;
                    self.offsetY = 0;
                    self.borderColor = "#828282";
                    self.fontColor = "#000000";
                    self.backgroundColor = "#ffffff";
                    self.getScreen().getSource().style.cursor = defCursor;
                    self.repaint();
                });
                this.listen("mouseup", function () {
                    self.offsetX = 0;
                    self.offsetY = 0;
                    self.borderColor = "#8A8A8A";
                    self.fontColor = "#000000";
                    self.backgroundColor = "#ff0000";
                    self.repaint();
                });
                viewPortMouse.listen("up", function () {
                    self.offsetX = 0;
                    self.offsetY = 0;
                    self.borderColor = "#828282";
                    self.fontColor = "#000000";
                    self.backgroundColor = "#ffffff";
                    self.getScreen().getSource().style.cursor = defCursor;
                    self.repaint();
                });
                this.listen("mousedown", function () {
                    self.offsetX = 1;
                    self.offsetY = 1;
                    self.borderColor = "#000000";
                    self.backgroundColor = "#ffffff";
                    self.fontColor = "#000000";
                    self.repaint();
                });
            },
            {
                setTextSize: function (size) {
                    this.fontSize = size;
                },
                paint: function () {
                    this.painter.clean();
                    var width = this.getWidth();
                    var height = this.getHeight();
                    this.ctx.fillStyle = this.backgroundColor;
                    this.painter.fillRect(0, 0, width, height);
                    this.ctx.strokeStyle = this.borderColor;
                    this.ctx.lineWidth = width / 10;
                    this.painter.drawRect(0, 0, width, height);
                    var text = this.getText();
                    if(text && text.length > 0)
                    {
                        this.ctx.fillStyle = this.fontColor;
                        this.ctx.textBaseline = "top";
                        var contentWidth = width - this.ctx.lineWidth * 2;
                        var fontSize = null;
                        if(this.hasOwnProperty("fontSize"))
                            fontSize = this.fontSize;
                        else
                        {
                            fontSize = Math.ceil(contentWidth / 6);
                        }
                        this.ctx.font = fontSize + "px Times New Roman";
                        var textSize = fontSize * text.length;
                        var x = width >= textSize ? ( width - textSize ) / 2 : this.ctx.lineWidth;
                        var y = height >= fontSize ? ( height - fontSize ) / 2 : this.ctx.lineWidth;
                        this.ctx.fillText(text, this.offsetX + x,  this.offsetY + y);
                    }
                }
            },
            Button
        );
        
        return Default;
    }
);
