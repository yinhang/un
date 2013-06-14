un.define(
	"un.editor.TileViewer",
	[
	   "un.client.Class",
	   "un.client.Screen",
	   "un.client.element.Map",
	   "un.client.ui.Mouse",
       "un.editor.map_editor.SelectedTile",
       "un.client.ViewPort"
	],
	function (Class, Screen, Map, Mouse, SelectedTile, ViewPort) {
	    var TileViewer = Class.define(
	        function (parent, sprite) {
	            var self = this;
	            this._super(parent, sprite.getWidth() * 3, sprite.getHeight() * Math.ceil( sprite.getMaxFrame() / 3 ));
                this.setSprite(sprite);
	            this.painter = this.getPainter();
	            parent.style.width = this.getWidth() + "px";
                parent.style.height = this.getHeight() + "px";
                this.hoverFrame = null;
                this.mouse = new Mouse(this);
                var source = this.getSource();
                this.selectedTile = null;
                this.moveSelectTile = null;
                this.mouse.listen("up", function (event) {
                    /*if(self.moveSelectTile)
                    {
                        self.moveSelectTile.destroy();
                        delete this.moveSelectTile;
                    }*/
                });
                
                this.eventMap = {
                    tile_sure: function (data) {
                        self.post("sure", data);
                    },
                    tile_drag: function (data) {
                        self.post("tiledrag", data);
                    },
                    before_destroy: function (data) {
                        self.post("tiledestroy", data);
                        self.moveSelectTile.removeListener("sure", self.eventMap["tile_sure"]);
                        self.moveSelectTile.removeListener("tiledrag", self.eventMap["tile_drag"]);
                        self.moveSelectTile.removeListener("before_destroy", self.eventMap["before_destroy"]);
                    }
                };
                this.mouse.listen("down", function (event) {
                    self.selectedTile = self.map.getTileFrame(event.unX, event.unY);
                    if(self.selectedTile)
                    {
                        self.moveSelectTile = new SelectedTile(self, event.unX - self.selectedTile.mapX, event.unY - self.selectedTile.mapY);
                        self.moveSelectTile.listen("sure", self.eventMap["tile_sure"]);
                        self.moveSelectTile.listen("tiledrag", self.eventMap["tile_drag"]);
                        self.moveSelectTile.listen("before_destroy", self.eventMap["before_destroy"]);
                        self.post("select", self.moveSelectTile);
                    }
                });
                this.mouse.listen("move", function (event) {
                    self.hoverFrame = self.map.getTileFrame(event.unX, event.unY);
                });
                this.ctx = this.painter.getContext();
	        },
	        {
	            getSelectedTile: function () {
	                return this.selectedTile;
	            },
	            getSprite: function () {
	                return this.sprite;
	            },
	            setSprite: function (sprite) {
                    this.map = new Map(sprite, sprite.getWidth() * 3, sprite.getHeight() * Math.ceil( sprite.getMaxFrame() / 3 ));
                    this.setWidth(this.map.getWidth());
                    this.setHeight(this.map.getHeight());
                    this.sprite = sprite;
                    var mapArr = [];
                    var maxFrame = this.sprite.getMaxFrame();
                    for(var i = 0; i < maxFrame; i += 3)
                    {
                        var lv2Arr = [];
                        for(var ii = i + 1, ll = ii + 3; ii < ll && ii <= maxFrame; ++ ii)
                        {
                            lv2Arr.push(ii); 
                        }
                        mapArr.push(lv2Arr);
                    }
                    this.map.build(mapArr);
	            },
	            draw: function () {
	                this.map.draw(this.painter);
	                if(this.hoverFrame)
	                {
	                    this.ctx.strokeStyle = "#ff0000";
	                    this.painter.drawRect(this.hoverFrame.mapX + 1, this.hoverFrame.mapY + 1, this.sprite.getWidth() - 2, this.sprite.getHeight() - 2);
	                }
	            }
	        },
	        Screen
	    );
	    
	    return TileViewer;
	}
);