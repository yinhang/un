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
            function (tileViewer) {
                var self = this;
                self.tileViewer = tileViewer;
                self._super(0, 0);
                self.painter = this.getPainter();
                self.enableScroll(true);
                self.container = self.getContainer();
                self.timelineData = new TimelineBase();
                self.lastFrame = null;
                self.frameCount = 0;
                this.frameList = [];
                for(var i = 0, l = 24; i < l; ++ i)
                {
                    this.addFrame();
                }
                self.tileViewer.listen("tiledrag", function (data) {
                    //clean frame status
                    if(self.hoverFrame != null)
                    {
                        self.hoverFrame.hideBorder();
                        self.hoverFrame = null;
                    }
                    var screen = self.getScreen();
                    var tileSprite = data.getSprite();
                    var tileX = tileSprite.getX() + data.getX();
                    var tileY = tileSprite.getY() + data.getY();
                    var tileRight = tileX + tileSprite.getWidth();
                    var tileBottom = tileY + tileSprite.getHeight();
                    var screenX = screen.getX(), screenY = screen.getY();
                    var screenWidth = screen.getWidth(), screenHeight = screen.getHeight();
                    if(tileRight > screenX && tileX < screenWidth && tileBottom > screenY && tileY < screenHeight)
                    {
                        var timelineViewPortX = self.getScreenX() + screenX, timelineViewPortY = self.getScreenY() + screenY;
                        var width = self.getWidth();
                        var height = self.getHeight();
                        var right = timelineViewPortX + width, bottom = timelineViewPortY + height;
                        if(tileRight > timelineViewPortX && tileX < right && tileBottom > timelineViewPortY && tileY < bottom)
                        {
                            for(var i = 0, l = self.frameList.length; i < l; ++ i)
                            {
                                var frame = self.frameList[i];
                                var frameX = frame.getViewPortX(), frameY = frame.getViewPortY();
                                var frameRight = frameX + frame.getWidth(), frameBottom = frameY + frame.getHeight();
                                frame.hideBorder();
                                if(self.hoverFrame == null && tileRight > frameX && tileX < frameRight && tileBottom > frameY && tileY < frameBottom)
                                {
                                    frame.showBorder();
                                    self.hoverFrame = frame;
                                }
                            }
                        }
                    }
                });
                self.tileViewer.listen("sure", function (data) {
                    if(self.hoverFrame)
                    {
                        self.hoverFrame.setFrame(data.getSprite().getFrame());
                        self.hoverFrame.hideBorder();
                        self.hoverFrame = null;
                    }
                });
            },
            {
                addFrame: function () {
                    var sprite = this.tileViewer.getSprite();
                    var newFrame = new Frame(sprite);
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
                    this.frameList.push(newFrame); 
                }
            },
            View
        );
        
        return Timeline;
    }
);
