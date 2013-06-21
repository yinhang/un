un.define(
    "un.editor.map_editor.SelectedTile",
    [
       "un.client.Class",
       "un.client.ui.Mouse",
       "un.client.Screen",
       "un.client.element.Sprite",
       "un.client.Runner",
       "un.client.ui.widget.Frame",
       "un.editor.map_editor.button.Delete"
    ],
    function (Class, Mouse, Screen, Sprite, Runner, Frame, DeleteButton) {
        var runnerQueue = [];
        var runner = new Runner(function () {
            for(var i = 0, l = runnerQueue.length; i < l; ++ i)
            {
                runnerQueue[i](); 
            }
        }, 30);
        
        function appendRunnerQueue(runner) {
            return runnerQueue.push(runner) - 1;
        };
        
        function removeRunnerQueue(handle) {
            runnerQueue.splice(handle, 1);
        };
        
        runner.start();
        
        var SelectedTile = Class.define(
            function (tileViewer, offsetX, offsetY) {
                var self = this;
                self.tileViewer = tileViewer;
                var selectedTile = tileViewer.getSelectedTile();
                var viewSprite = tileViewer.getSprite();
                //copy sprite
                this.sprite = new Sprite(viewSprite.getImage(), viewSprite.getWidth(), viewSprite.getHeight());
                this.sprite.setFrame(selectedTile.frame);
                this._super(document.documentElement, this.sprite.getWidth() + 10, this.sprite.getHeight());
                this.source = this.getSource();
                document.documentElement.appendChild(this.source);
                this.source.className = this.source.className += " un-dragscreen";
                this.source.style.position = "absolute";
                this.setX(tileViewer.getX() + selectedTile.mapX);
                this.setY(tileViewer.getY() + selectedTile.mapY);
                this.mouse = new Mouse(this, true);
                this.mouse.readyDrag(offsetX, offsetY);
                this.repaint = false;
                this.runnerHandle = appendRunnerQueue(function () {
                    if(self.repaint == true)
                        self.draw();
                });
                this.mouse.listen("enter", function () {
                    self.repaint = true;
                });
                this.mouse.listen("leave", function () {
                    self.repaint = false;
                });
                this.mouse.listen("dblclick", function () {
                    self.post("sure", self);
                    self.destroy();
                });
                this.mouse.listen("un_drag", function () {
                    self.post("tiledrag", self);
                });
                
                this.frame = Frame.getFrame(this);
                var deleteButton = new DeleteButton();
                deleteButton.listen("click", function () {
                    self.destroy();
                });
                this.frame.add(deleteButton);
                deleteButton.scale(8 / deleteButton.getWidth(), 8 / deleteButton.getHeight());
                deleteButton.setX(this.getWidth() - deleteButton.getWidth() - 4);
                deleteButton.setY(2);
                self.draw();
            },
            {
                getSprite: function () {
                    return this.sprite;
                },
                setX: function (x) {
                    this._super.setX(x);
                    this.source.style.left = x + "px";
                },
                setY: function (y) {
                    this._super.setY(y);
                    this.source.style.top = y + "px";
                },
                destroy: function () {
                    removeRunnerQueue(this.runnerHandle);
                    this.post("before_destroy", this);
                    this.source.parentNode.removeChild(this.source);
                },
                draw: function () {
                    this.painter.clean();
                    this.sprite.setX(10);
                    this.sprite.setY(0);
                    this.sprite.draw(this.getPainter());
                    this.frame.draw();
                }
            },
            Screen
        );
        
        return SelectedTile;
    }
);