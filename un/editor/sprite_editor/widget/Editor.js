un.define(
    "un.editor.sprite_editor.widget.Editor",
    [
        "un.client.Class",
        "un.editor.sprite_editor.widget.Timeline",
        "un.client.ui.Widget",
        "un.client.ui.widget.Frame"
    ],
    function (Class, Timeline, Widget, Frame) {
        var Editor = Class.define(
            /**
             * 
                 * @param screen
             */
            function (screen, tileViewer)
            {
                var self = this;
                self.tileViewer = tileViewer;
                self._super(screen.getWidth(), 0);
                self.screenFrame = Frame.getFrame(screen);
                self.setWidth(self.screenFrame.getWidth());
                self.screenFrame.add(this);
            },
            {
                add: function (node) {
                    if(node.is(Timeline))
                        this._super.add(node);
                },
                addAction: function () {
                    var timeline = new Timeline(this.tileViewer.getSprite());
                    var actionList = this.getChildren();
                    var lastTimeline = actionList[actionList.length - 1];
                    if(lastTimeline)
                    {
                        timeline.setY(lastTimeline.getY() + lastTimeline.getHeight() + 8);
                    }
                    this.setHeight(timeline.getY() + timeline.getHeight());
                    timeline.setWidth(this.getWidth());
                    this.add(timeline);
                    return timeline;
                }
            },
            Widget
        );
        
        return Editor;
    }
);
