un.define(
    "un.editor.map_editor.Main",
    [
        "un.editor.TileViewer",
        "un.client.loader.Image",
        "un.client.Class",
        "un.client.Runner",
        "un.client.element.Sprite",
        "un.editor.map_editor.EditorView"
    ],
    function (TileViewer, ImageLoader, Class, Runner, Sprite, EditorView) {
        var Main = Class.define(
            /**
             * 
                 * @param options.imageSrc
                 * @param options.tileWidth
                 * @param options.tileHeight
                 * @param options.screenWidth
                 * @param options.screenHeight
                 * 
             */
            function (options) {
                var self = this;
                this.tileViewerParent = document.getElementById("tileViewer");
                this.mapEditorParent = document.getElementById("mapViewer");
                this.mapEditorViewer = new EditorView(this.mapEditorParent, options.screenWidth, options.screenHeight);
                //初始化
                this.runner = new Runner(function () {
                    //精灵帧选择器
                    self.tileViewer.getPainter().clean();
                    self.tileViewer.draw();
                    //地图编辑器
                    self.mapEditorViewer.getPainter().clean();
                    self.mapEditorViewer.draw();
                    self.mapEditorViewer.showFps();
                }, 60);
                this.reloadMapSrc(options.imageSrc, options.tileWidth, options.tileHeight);
                //导出地图数据
                document.querySelector("#ouput_mapdata").addEventListener("click", function (e) {
                    var handle = window.open("about:blank");
                    var mapArr = self.mapEditorViewer.getMapData();
                    var dataBuffer = [];
                    for(var i = 0, l = mapArr.length; i < l; ++ i)
                    {  
                        var lv2arr = mapArr[i];
                        var frameBuffer = [];
                        for(var lv2i = 0, lv2l = lv2arr.length; lv2i < lv2l; ++ lv2i)
                        {
                            frameBuffer.push(lv2arr[lv2i]);
                        }
                        dataBuffer.push("[" + frameBuffer.join(",") + "]");
                    }
                    var iid = setInterval(function () {
                        if(handle.document.readyState === "complete")
                        {
                            handle.document.body.appendChild(document.createTextNode("[" + dataBuffer.join(",") + "]"));
                            clearInterval(iid);
                        }
                    }, 10);
                });
            },
            {
                reloadMapSrc: function (imageSrc, tileWidth, tileHeight) {
                    var self = this;
                    self.runner.pause();
                    ImageLoader.load([imageSrc], function (newUNImage) {
                        if(self.tileViewer)
                            self.tileViewer.setSprite(new Sprite(newUNImage.lastLoaded, tileWidth, tileHeight));
                        else
                        {
                            self.tileViewer = new TileViewer(self.tileViewerParent, new Sprite(newUNImage.lastLoaded, tileWidth, tileHeight));
                            self.mapEditorViewer.linkTileViewer(self.tileViewer);
                        }
                        self.runner.start();
                    });
                }
            }
        );
        return Main;
    }
);
