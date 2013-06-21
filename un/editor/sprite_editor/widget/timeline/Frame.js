un.define(
    "un.editor.sprite_editor.widget.timeline.Frame",
    [
        "un.client.Class",
        "un.client.ui.Widget",
        "un.client.ui.widget.TextField"
    ],
    function (Class, Widget, TextField) {
        var Frame = Class.define(
            /**
             * 
                 * @param screen
             */
            function (sprite)
            {
                this._super(sprite.getWidth() + 4, sprite.getHeight() + 4);
                var self = this;
                self.sprite = sprite;
                self.painter = this.getPainter();
                self.ctx = self.painter.getContext();
                this.backgroundColor = null;
                this.frame = null;
                this._showBorder = false;
                this.textField = new TextField(this.getWidth(), 20);
                this.textField.setY(this.getHeight() + 1);
                this.textField.setValue("test测试");
                this.setHeight(this.getHeight() + 20);
                this.add(this.textField);
            },
            {
                showBorder: function () {
                    if(this._showBorder == true)
                        return;
                    this._showBorder = true;
                    this.repaint();
                },
                hideBorder: function () {
                    if(this._showBorder == false)
                        return;
                    this._showBorder = false;
                    this.repaint();
                },
                setFrame: function (frame) {
                    this.frame = frame;
                    this.repaint();
                },
                setBackgroundColor: function (color) {
                    this.backgroundColor = color;
                    this.repaint();
                },
                setTime: function (time) {
                    self.time = time;
                },
                paint: function () {
                    this.getPainter().clean();
                    if(this.frame != null)
                    {
                        this.sprite.setFrame(this.frame);
                        this.sprite.setX(2);
                        this.sprite.setY(2);
                        this.sprite.draw(this.getPainter());
                    }
                    else
                    {
                        this.ctx.fillStyle = this.backgroundColor;
                        this.ctx.fillRect(0, 0, this.getWidth(), this.getHeight());
                    }
                    if(this._showBorder)
                    {
                        this.ctx.strokeStyle = "#ff0000";
                        this.ctx.lineWidth = 2;
                        this.ctx.strokeRect(0, 0, this.getWidth(), this.getHeight());
                    }
                }
            },
            Widget
        );
        
        return Frame;
    }
);
