un.define(
    "un.editor.sprite_editor.Main",
    [
        "un.client.Class",
        "un.editor.TileViewer",
        "un.client.Runner",
        "un.client.loader.Image",
        "un.client.element.Sprite",
        "un.editor.sprite_editor.widget.Editor",
        "un.client.Screen",
        "un.client.ui.widget.Frame"
    ],
    function (Class, TileViewer, Runner, ImageLoader, Sprite, Editor, Screen, Frame) {
        var Main = Class.define(
            /**
             * 
                 * @param options.imageSrc
                 * @param options.tileWidth
                 * @param options.tileHeight
                 * @param options.editorWidth
                 * @param options.editorHeight
             */
            function (options)
            {
                var self = this;
                self.tileViewerParent = document.getElementById("tileViewer");
                self.editorParent = document.getElementById("editor");
                self.editorScreen = new Screen(self.editorParent, options.editorWidth, options.editorHeight);
                var editorScreenFrame = Frame.getFrame(self.editorScreen);
                self.runner = new Runner(function () {
                    editorScreenFrame.cleanScreen();
                    self.editorScreen.cleanMsg();
                    self.tileViewer.getPainter().clean();
                    self.tileViewer.draw();
                    editorScreenFrame.draw();
                    self.editorScreen.showFps();
                }, 60);  
                self.reloadSpriteImage(options.imageSrc, options.tileWidth, options.tileHeight);
            },
            {
                reloadSpriteImage: function (imageSrc, tileWidth, tileHeight) {
                    var self = this;
                    self.runner.pause();
                    ImageLoader.load([imageSrc], function (newUNImage) {
                        if(self.tileViewer)
                            self.tileViewer.setSprite(new Sprite(newUNImage.lastLoaded, tileWidth, tileHeight));
                        else
                        {
                            self.tileViewer = new TileViewer(self.tileViewerParent, new Sprite(newUNImage.lastLoaded, tileWidth, tileHeight));
                        }
                        self.editor = new Editor(self.editorScreen, self.tileViewer);
                        self.editor.addAction();
                        self.editor.addAction();
                        self.editor.addAction();
                        self.editor.addAction();
                        self.runner.start();
                    });
                }
            }
        );
        
        return Main;
    }
);
