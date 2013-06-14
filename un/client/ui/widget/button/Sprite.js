un.define(
    "un.client.ui.widget.button.Sprite",
    [
        "un.client.Class",
        "un.client.ui.widget.Button",
        "un.client.Timeline"
    ],
    function (Class, Button, Timeline) {
        
        var Sprite = Class.define(
            /**
             * 
                 * @param {Object} sprite
                 * @param {Object} settings
                 * @param settings.timeline
                 * @param {Object} text
             */
            function (sprite, settings, text) {
                this._super(text, sprite.getWidth(), sprite.getHeight());
                var self = this;
                this.painter = this.getPainter();
                this.ctx = this.painter.getContext();
                this.sprite = sprite;
                this.settings = settings;
                this.playingStatus = {};
                this.status = null;
                this.timelineList = {};
               	for(var eventName in settings)
               	{
               		var setting = settings[eventName];
               		var timeline = setting.timeline;
               		if(timeline)
               		{
               			var eventTimeline = new Timeline(timeline, setting.loop ? true : false);
               			eventTimeline.listen("change", (function (_eventName) {
               				return function (_frame) {	
	               				if(_eventName === self.status)
	               				{
	               					self.sprite.setFrame(_frame);
	               					self.repaint();
	               				}
               				};
               			})(eventName));
               			self.timelineList[eventName] = eventTimeline;
               		}
               	}
                this.listen("mouseenter", function () {
                    self.status = "mouseenter";
                    var timeline = self.timelineList["mouseenter"];
                    if(timeline)
                    	timeline.reset();
                });
                this.listen("mouseleave", function () {
                    self.status = "mouseleave";
                    var timeline = self.timelineList["mouseleave"];
                    if(timeline)
                    	timeline.reset();
                });
                this.listen("mouseup", function () {
                    self.status = "mouseup";
                    var timeline = self.timelineList["mouseup"];
                    if(timeline)
                    	timeline.reset();
                });
                this.listen("mousedown", function () {
                    self.status = "mousedown";
                    var timeline = self.timelineList["mousedown"];
                    if(timeline)
                    	timeline.reset();
                });
            },
            {
                paint: function () {
                    this.painter.clean();
                    this.sprite.draw(this.painter);
                }
            },
            Button
        );
        
        return Sprite;
    }
);
