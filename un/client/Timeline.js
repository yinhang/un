un.define(
    "un.client.Timeline", 
    [
        "un.client.Class",
        "un.client.Runner"
    ],
    function (Class, Runner) {
    	
        var timelineList = [];
        var timelineLastFrame = {};
        var runner = new Runner(function () {
            for(var i = 0, l = timelineList.length; i < l; ++ i)
            {
            	var timeline = timelineList[i];
            	var newFrame = timeline.getCurKeyFrame();
            	if(newFrame != timelineLastFrame[timeline] && newFrame != null)
            	{
            		timelineLastFrame[timeline] = newFrame;
            		timeline.post("change", newFrame);
            	}
            }
        }, 60);
        
        runner.start();
        
        var Timeline = Class.define(
            function (keyFrames, loop) {
                this.keyFrameList = [];
                this.loop = loop;
                if(keyFrames)
                {
                    for(var time in keyFrames)
                    {
                        this.setKeyFrame(time, keyFrames[time]);
                    }
                }
                this.reset();
                timelineList.push(this);
            },
            {
                getElapsed: function () {
                    return (new Date()).getTime() - this.startTime;
                },
                getCurKeyFrame: function () {
                    return this.getKeyFrame(this.getElapsed());
                },
                getKeyFrame: function (time) {
                    for(var i = 0, l = this.keyFrameList.length, maxIndex = l - 1; i < l; ++ i)
                    {
                        var curKeyFrame = this.keyFrameList[i];
                        if(i == maxIndex)
                        {
                            if(time >= curKeyFrame.time)
                            {
                            	if(this.loop)
                            	{
                            		this.reset();
                            	}
                                return curKeyFrame.frame;
                            }
                            return null;
                        }
                        var nextKeyFrame = this.keyFrameList[i + 1];
                        if(time >= curKeyFrame.time && time < nextKeyFrame.time)
                        {
                            return curKeyFrame.frame;
                        }
                    }
                    return null;
                },
                reset: function () {
                    this.startTime = (new Date()).getTime();
                    var frame = this.getCurKeyFrame();
                    if(frame != null)
                    	this.post("change", frame);
                },
                setLoop: function (loop) {
                    this.loop = loop;
                },
                setKeyFrame: function (time, keyFrame) {
                	time = parseInt(time);
                    if(this.keyFrameList.length <= 0)
                    {
                        this.keyFrameList.push({
                            time: time,
                            frame: keyFrame
                        });
                        return;
                    }
                    for(var i = 0, l = this.keyFrameList.length, maxIndex = l - 1; i < l; ++ i)
                    {
                        var curKeyFrame = this.keyFrameList[i];
                        if(time < curKeyFrame.time)
                        {
                            this.keyFrameList.splice(i, 0, {
                                time: time,
                                frame: keyFrame
                            });
                            return;
                        } 
                        if(i == maxIndex)
                        {
                            this.keyFrameList.push({
                                time: time,
                                frame: keyFrame
                            });
                            return; 
                        }
                    }
                }
            }
        );
        
        return Timeline;
    }
);
