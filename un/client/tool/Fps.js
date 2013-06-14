un.define(
    "un.client.tool.Fps",
    [
        "un.client.Class"
    ],
    function (Class) {
        var Fps = Class.define(
            function () {
                this.fps = 0;
                this.frame = 0;
                this.startTime = 0;
            },
            {
                record: function () {
                    ++ this.frame;
                    var curTime = new Date().getTime();
                    if(curTime - this.startTime >= 1000)
                    {
                        this.startTime = curTime;
                        this.fps = this.frame;
                        this.frame = 0;
                    }
                },
                getFps: function () {
                    return this.fps;
                }
            }
        );
        
        return Fps;
    }
);
