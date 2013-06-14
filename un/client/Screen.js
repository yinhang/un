un.define(
    "un.client.Screen",
    [
        "un.client.Class",
        "un.client.graphics.Canvas"
    ],
    function (Class, Canvas) {
        return Class.define(
            function (parent, width, height) {
                this._super(width, height);
                parent.appendChild(this.getSource());
                this.screenPainter = this.getPainter();
                this.msgX = 0;
                this.msgPadding = 0;
                this.msgFontSize = this.getWidth() / 50;
                this.msgFontSize = this.msgFontSize <= 10 ? 10 : this.msgFontSize;
                this.msgY = this.msgFontSize;
                this.source = this.getSource();
            },
            {
                getX: function () {
                    return this.source.offsetLeft;
                },
                getY: function () {
                    return this.source.offsetTop;
                },
                setWidth: function (width) {
                    var self = this;
                    this._super.setWidth(width);
                    this.post("resize", {
                       width: self.getWidth(),
                       height: self.getHeight()
                    });
                },
                setHeight: function (height) {
                    var self = this;
                    this._super.setHeight(height);
                    this.post("resize", {
                       width: self.getWidth(),
                       height: self.getHeight()
                    });
                },
                setX: function () {},
                setY: function () {},
                showFps: function () {
                    self = this;
                    un.use("un.client.tool.Fps", function (Fps) {
                        self.fps = new Fps();
                        self.showFps = function (show) {
                            var context = self.screenPainter.getContext();
                            self.fps.record();
                            self.print("fps: " + self.fps.getFps(), self.msgPadding, self.msgPadding);
                        };
                        self.showFps();
                    });
                },
                print: function (msg, x, y) {
                    msg += "";
                    var context = this.screenPainter.getContext();
                    context.fillStyle = "#ffffff";
                    context.textBaseline = "top";
                    context.font = this.msgFontSize + "px sans-serif";
                    var right = x + msg.length * this.msgFontSize + this.msgPadding;
                    if(right >= this.getWidth())
                    {
                        y += ( this.msgFontSize + this.msgPadding );
                        x = this.msgPadding;
                    }
                    context.fillText(msg, x, y);
                    context.fillStyle = "#000000";
                    context.fillText(msg, x + 1, y + 1);
                    this.msgX = x + msg.length * this.msgFontSize + this.msgPadding;
                    this.msgY = y;
                },
                printNext: function (msg) {
                    if(this.msgX >= this.getWidth())
                    {
                        this.msgX = this.msgPadding;
                        this.msgY += this.msgFontSize + this.msgPadding;
                    }
                    this.print(msg, this.msgX, this.msgY);
                },
                cleanMsg: function () {
                    this.screenPainter.clearRect(0, 0, this.getWidth(), this.msgY + this.msgFontSize);
                    this.msgX = self.msgPadding;
                    this.msgY = self.msgPadding;
                }
            },
            Canvas
        );
    }
);
