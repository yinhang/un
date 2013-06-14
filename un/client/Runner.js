un.define(
    "un.client.Runner",
    [
        "un.client.Class"
    ],
    function (Class) {
        var Runner = Class.define(
            function (runner, fre) {
                var self = this;
                self.fre = fre;
                self.startTime;
                if(self.fre <= 0)
                    self.fre = 1;
                self.defaultDelay = 1000 / self.fre;
                self.running = false;
                self.runner = function () {
                   var startTime = (new Date()).getTime();
                   runner();
                   var nextDelay = self.defaultDelay - (new Date()).getTime() + startTime;
                   if(self.running == true)
                   {
                      // if(nextDelay <= 0)
                     //  {
                     		//直接执行，但会卡死。故注释掉。
                    //       self.runner();
                   //    }
                    //   else
                   //    {
                           setTimeout(self.runner, nextDelay <= 0 ? 0 : nextDelay);
                    //   }
                   }
                }
            },
            {
                start: function () {
                    var self = this;
                    if(self.running == false)
                    {
                        self.running = true;
                        self.startTime = ( new Date() ).getTime();
                        setTimeout(self.runner, self.defaultDelay);
                    }
                },
                pause: function () {
                    this.running = false;
                }
            }
        );
        return Runner;
    }
);
