un.define(
    "un.editor.sprite_editor.widget.Timeline",
    [
        "un.client.Class",
        "un.client.Timeline",
        "un.client.ui.widget.View",
        "un.editor.sprite_editor.widget.timeline.Frame"
    ],
    function (Class, TimelineBase, View, Frame) {
        var Timeline = Class.define(
            function (sprite) {
                var self = this;
                self.sprite = sprite;
                self._super(0, 0);
                self.painter = this.getPainter();
                self.enableScroll(true);
                self.container = self.getContainer();
                self.timelineData = new TimelineBase();
                self.lastFrame = null;
                self.frameCount = 0;
                
                for(var i = 0, l = 24; i < l; ++ i)
                {
                    this.addFrame();
                }
                
            },
            {
                addFrame: function () {
                    var newFrame = new Frame(this.sprite.getWidth(), this.sprite.getHeight(), this.frameCount);
                    var self = this;
                    if(self.lastFrame)
                    {
                        newFrame.setX(self.lastFrame.getX() + self.lastFrame.getWidth() + 2);
                    }
                    else
                    {
                        newFrame.setX(0 + 2);
                    }
                    newFrame.setY(0);
                    var newFrameBottom = newFrame.getY() + newFrame.getHeight();
                    this.setHeight(newFrameBottom > this.getHeight() ? newFrameBottom : this.getHeight());
                    newFrame.setBackgroundColor(this.frameCount % 2 === 0 ? "#EDEDED" : "#EEE5DE");
                    self.lastFrame = newFrame;
                    this.add(newFrame);
                    ++ this.frameCount;
                }
            },
            View
        );
        
        return Timeline;
    }
);
