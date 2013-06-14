un.define(
    "un.editor.map_editor.editorview.TileContextMenu",
    [
        "un.client.Class",
       "un.client.ui.Mouse",
        "un.client.ui.widget.PopMenu"
    ],
    function (Class, Mouse, UIPopMenu) {
        
        var TileContextMenu = Class.define(
            /**
             */
            function (mapeditor) {
                var self = this;
                this._super(
                    [
                        {
                            text: "移除",
                            click: function (item, data) {
                                var map = mapeditor.getMap();
                                if(map)
                                {
                                    map.setTileFrame(data.tileMapX, data.tileMapY, -1);
                                }
                            }
                        }
                    ], 
                    {
                        fontSize: 12
                    }
                );
                
                this.editorMouse = new Mouse(mapeditor.getEditorView());
                
                this.editorMouse.listen("up", function (event) {
                    var map = mapeditor.getMap();
                    if(map)
                    {
                        var mapEditorX = mapeditor.getX();
                        var mapEditorY = mapeditor.getY();
                        var mapEditorWidth = mapeditor.getWidth();
                        var mapEditorHeight = mapeditor.getHeight();
                        if(event.unX > mapEditorX && event.unY > mapEditorY
                            && event.unX <= mapEditorX + mapEditorWidth && event.unY <= mapEditorY + mapEditorHeight)
                            {
                                self.mouseHoverFrame = map.getTileFrame(event.unX - mapEditorX - map.getMapX(), event.unY - mapEditorY - map.getMapY());
                            }
                            else
                            {
                                self.mouseHoverFrame = null;
                                self.hide();
                            }
                    }
                    else
                    {
                        self.mouseHoverFrame = null;
                        self.hide();
                    }
                    if(self.mouseHoverFrame)
                    {
                        if(event.button == 2)
                        {
                            var mapX = self.mouseHoverFrame.mapX;
                            var mapY = self.mouseHoverFrame.mapY;
                            self.show(mapX + map.getMapX(), mapY + map.getMapY(), {
                                tileMapX: mapX,
                                tileMapY: mapY
                            });
                        }
                        else
                        {
                            self.hide();
                        }
                    }
                });
                mapeditor.getEditorView().getFrame().add(this);
            },
            {
            },
            UIPopMenu
        );
        
        return TileContextMenu;
    }
);
