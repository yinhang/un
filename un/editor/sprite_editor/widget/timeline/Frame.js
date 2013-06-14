un.define(
    "un.editor.sprite_editor.widget.timeline.Frame",
    [
        "un.client.Class",
        "un.client.ui.Widget",
        "un.client.ui.widget.Text"
    ],
    function (Class, Widget, Text) {
        var Frame = Class.define(
            /**
             * 
                 * @param screen
             */
            function (width, height, id)
            {
                this._super(width, height);
                var self = this;
                self.painter = this.getPainter();
                self.ctx = self.painter.getContext();
                this.backgroundColor = null;
            },
            {
                setBackgroundColor: function (color) {
                    this.backgroundColor = color;
                },
                setTime: function (time) {
                    self.time = time;
                },
                paint: function () {
                    this.ctx.fillStyle = this.backgroundColor;
                    this.ctx.fillRect(0, 0, this.getWidth(), this.getHeight());
                }
            },
            Widget
        );
        
        return Frame;
    }
);
