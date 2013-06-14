un.define(
    "un.editor.map_editor.editorview.BottomPanel",
    [
       "un.client.Class",
       "un.client.ui.widget.button.Default",
       "un.client.ui.widget.Container",
       "un.client.ui.widget.Text"
    ],
    function (Class, Button, Container, Text) {
        var BottomPanel = Class.define(
            function (editor) {
                var self = this;
                //get uiframe
                this.uiFrame = editor.getFrame();
                this._super(editor.getWidth(), Math.floor(editor.getHeight() / 16));
                //左右滚动按钮
                var buttonList = {
                    "左移": new Button("左移", 8),
                    "右移": new Button("右移", 8),
                    "上移": new Button("上移", 8),
                    "下移": new Button("下移", 8)
                };
                this.setX(0);
                this.setY(editor.getHeight());
                editor.setHeight(editor.getHeight() + this.getHeight());
                var buttonSize = {
                    width: self.getWidth() / 16,
                    height: Math.floor(self.getHeight() * 0.6)
                };
                var beginX = 8;
                for(var text in buttonList)
                {
                    var button = buttonList[text];
                    button.setWidth(buttonSize.width);
                    button.setHeight(buttonSize.height);
                    button.setY(( this.getHeight() - button.getHeight() ) / 2);
                    button.setX(beginX);
                    beginX = button.getX() + button.getWidth() + 8;
                    button.listen("mousedown", (function (_text) {
                        return function () {
                            self.post("buttondown", {
                                text: _text
                            });
                        };
                    })(text));
                    button.listen("mouseup", (function (_text) {
                        return function () {
                            self.post("buttonup", {
                                text: _text
                            });
                        };
                    })(text));
                    this.add(button);
                }
                this.infoTextTmp = ["w: ", "0", " h: ", "0", " c:", "0", " r: ", "0", " mx:", "0", " my:", "0"];
                this.sizeInfo = new Text("", 320, this.getHeight());
                this.sizeInfo.setSize(16);
                this.sizeInfo.setX(160);
                this.add(this.sizeInfo);
                this.uiFrame.add(self);
            },
            {
                setInfoTileRow: function (row) {
                    this.infoTextTmp[7] = row;
                    this.sizeInfo.setText(this.infoTextTmp.join(""));
                    this.sizeInfo.repaint();
                },
                setInfoTileCol: function (col) {
                    this.infoTextTmp[5] = col;
                    this.sizeInfo.setText(this.infoTextTmp.join(""));
                    this.sizeInfo.repaint();
                },
                setInfoMapWidth: function (width) {
                    this.infoTextTmp[1] = width;
                    this.sizeInfo.setText(this.infoTextTmp.join(""));
                    this.sizeInfo.repaint();
                },
                setInfoMapHeight: function (height) {
                    this.infoTextTmp[3] = height;
                    this.sizeInfo.setText(this.infoTextTmp.join(""));
                    this.sizeInfo.repaint();
                },
                setInfoMapX: function (mapX) {
                    this.infoTextTmp[9] = mapX;
                    this.sizeInfo.setText(this.infoTextTmp.join(""));
                    this.sizeInfo.repaint();
                },
                setInfoMapY: function (mapY) {
                    this.infoTextTmp[11] = mapY;
                    this.sizeInfo.setText(this.infoTextTmp.join(""));
                    this.sizeInfo.repaint();
                },
                paint: function () {
                    this.getPainter().clean();
                    var painter = this.getPainter();
                    var ctx = painter.getContext();
                    ctx.strokeStyle = "#c0c0c0";
                    ctx.lineWidth = 1;
                    painter.begin();
                    painter.moveTo(0, 0);
                    painter.lineTo(this.getWidth(), 1);
                    painter.stroke();
                }
            },
            Container
        );
        return BottomPanel;
    }
);