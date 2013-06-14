un.define(
    "un.client.ui.widget.popmenu.Item",
    [
        "un.client.Class",
        "un.client.ui.Widget",
        "un.client.ui.widget.Text"
    ],
    function (Class, Widget, Text) {
        
        var Item = Class.define(
            function (text, width, height, listenerList) {
                var self = this;
                this.text = new Text(text, width, height);
                var txtWidth = this.text.getWidth();
                var txtHeight = this.text.getHeight();
                var vmargin = Math.ceil(txtWidth / 8);
                var hmargin = Math.ceil(txtHeight / 4);
                this._super(txtWidth + hmargin * 2, txtHeight + vmargin * 2);
                this.text.setX(hmargin);
                this.text.setY(vmargin);
                this.add(this.text);
                this.hover = false;
                this.listen("mouseenter", function () {
                    self.hover = true;
                    self.repaint();
                });
                this.listen("mouseleave", function () {
                    self.hover = false;
                    self.repaint();
                });
                for(var eventName in listenerList)
                {
                    this.listen(eventName, listenerList[eventName]);
                }
            },
            {
                getText: function () {
                    return this.text.getText();  
                },
                paint: function () {
                    var painter = this.getPainter();
                    var ctx = painter.getContext();
                    painter.clean();
                    if(this.hover)
                    {
                        ctx.fillStyle = "#E6E6FA";
                        painter.fillRect(1, 1, this.getWidth() - 2, this.getHeight() - 2);
                    }
                    this.text.draw();
                }
            },
            Widget
        );
        
        return Item;
    }
);
