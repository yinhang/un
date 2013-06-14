un.define(
    "un.client.ui.Touch",
    [
        "un.client.Class"
    ],
    function (Class) {
        
        var Touch = Class.define(
            function (screen) {
                var screenSource = screen.getSource();
                var self = this;
                screenSource.addEventListener("touchstart", function (event) {
                    if(self.post("start", event) === false)
                        return false;
                });
                screenSource.addEventListener("touchend", function (event) {
                    if(self.post("end", event) === false)
                        return false;
                });
                screenSource.addEventListener("touchmove", function (event) {
                    if(self.post("move", event) === false)
                        return false;
                });
                screenSource.addEventListener("touchcancel", function (event) {
                    if(self.post("cancel", event) === false)
                        return false;
                });
            },
            {
            }
        );
        
        return Touch;
    }
);
