un.define(
    "un.client.loader.Image",
    [
        "un.client.Class",
        "un.client.Loader",
        "un.client.graphics.Image"
    ],
    function (Class, Loader, UNImage) {
        var _rid = 0;
        var ImageLoader = Class.define(
            function () {
                var self = this;
                self._super(function (complete, source) {
                    var image = new Image();
                    image.onload = function () {
                        complete(new UNImage(image));
                    };
                    image.onerror = function () {
                        un.throwError("un.client.loader.Image: " + "\"" + source + "\"加载失败。");
                    }
                    image.src = source;
                });
            },
            {
            },
            Loader
        );
        
        return new ImageLoader();
    }
);
