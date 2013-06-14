un.define(
    "un.editor.map_editor.editorview.MapEditor",
    [
       "un.client.Class",
       "un.client.graphics.Canvas",
       "un.editor.map_editor.editorview.Map",
       "un.editor.map_editor.editorview.TileContextMenu"
    ],
    function (Class, Canvas, Map, TileContextMenu) {
        var MapEditor = Class.define(
            function (editor, width, height) {
                var self = this;
                this._super(width, height);
                this.editor = editor;
                self.hoverFrame = null;
                self.selectedTile = null;
                this.eventMap = {
                    tile_sure: function (data) {
                        self.selectedTile = data;
                        var offsetX = editor.getX() + self.getX() + self.map.getMapX();
                        var offsetY = editor.getY() + self.getY() + self.map.getMapY();
                        var tileCenterX = data.getX() + data.getWidth() / 2 - offsetX;
                        var tileCenterY = data.getY() + data.getHeight() / 2 - offsetY;
                        self.map.setTileFrame(tileCenterX, tileCenterY, data.getSprite().getFrame());
                    },
                    tile_destroy: function (data) {
                        self.hoverFrame = null;
                        self.selectedTile = null;
                    },
                    tile_drag: function (data) {
                        self.selectedTile = data;
                        var offsetX = editor.getX() + self.getX() + self.map.getMapX();
                        var offsetY = editor.getY() + self.getY() + self.map.getMapY();
                        var tileCenterX = data.getX() + data.getWidth() / 2 - offsetX;
                        var tileCenterY = data.getY() + data.getHeight() / 2 - offsetY;
                        self.hoverFrame = self.map.getTileFrame(tileCenterX, tileCenterY);
                    }
                };
                new TileContextMenu(this);
                this.bufferScreenCount = 2;
            },
            {
                getAllFrame: function () {
                    return this.map.getAllFrame();
                },
                getMap: function () {
                    return this.map;
                },
                getEditorView: function () {
                    return this.editor;
                },
                getTileRow: function () {
                    return this.map.getRowCount();
                },
                getTileCol: function () {
                    return this.map.getColCount();
                },
                getMapWidth: function () {
                    return this.map.getMapWidth();
                },
                getMapHeight: function () {
                    return this.map.getMapHeight();
                },
                getMapWidth: function () {
                    return this.map.getMapWidth();
                },
                getMapHeight: function () {
                    return this.map.getMapHeight();
                },
                scrollUp: function () {
                    this.map.scrollUp();
                    if(this.map.getMapY() <= 0)
                    {
                        if(( Math.abs(this.map.getMapY()) + this.map.getHeight() ) >= this.map.getMapHeight())
                        {
                            this.map.adjustSize(0, this.getHeight() * this.bufferScreenCount / this.map.getSprite().getHeight());
                            this.post("update_row_num", this.getTileRow());
                            this.post("update_mapheight", this.map.getMapHeight());
                        }
                    }
                    this.post("update_mapy", this.map.getMapY());
                },
                scrollDown: function () {
                    this.map.scrollDown();
                    this.post("update_mapy", this.map.getMapY());
                },
                scrollLeft: function () {
                    this.map.scrollLeft();
                    if(this.map.getMapX() <= 0)
                    {
                        if(( Math.abs(this.map.getMapX()) + this.map.getWidth() ) >= this.map.getMapWidth())
                        {
                            this.map.adjustSize(this.getWidth() * this.bufferScreenCount / this.map.getSprite().getWidth(), 0);
                            this.post("update_col_num", this.getTileCol());
                            this.post("update_mapwidth", this.getMapWidth());
                        }
                    }
                    this.post("update_mapx", this.map.getMapX());
                },
                scrollRight: function () {
                    this.map.scrollRight();
                    this.post("update_mapx", this.map.getMapX());
                },
                linkTileViewer: function (tileViewer) {
                    if(this.tileViewer)
                    {
                        this.tileViewer.removeListener("sure", this.eventMap["tile_sure"]);
                        this.tileViewer.removeListener("tiledrag", this.eventMap["tile_drag"]);
                        this.tileViewer.removeListener("tiledestroy", this.eventMap["tile_destroy"]);
                    }
                    this.tileViewer = tileViewer;
                    this.tileViewer.listen("sure", this.eventMap["tile_sure"]);
                    this.tileViewer.listen("tiledrag", this.eventMap["tile_drag"]);
                    this.tileViewer.listen("tiledestroy", this.eventMap["tile_destroy"]);
                    var sprite = tileViewer.getSprite();
                    this.map = new Map(sprite, this.getWidth(), this.getHeight());
                    var mapData = [];
                    for(var i = 0, l = this.getHeight() * this.bufferScreenCount / sprite.getHeight(); i < l; ++ i)
                    {
                        var rolData = [];
                        for(var ii = 0, ll = this.getWidth() * this.bufferScreenCount / sprite.getWidth(); ii < ll; ++ ii)
                        {
                            rolData.push(1);
                        }
                        mapData.push(rolData);
                    }
                    this.map.build(mapData);
                    this.map.listen("mousemove", function (data) {
                        console.log(data)
                    });
                    this.post("update_row_num", this.getTileRow());
                    this.post("update_mapheight", this.map.getMapHeight());
                    this.post("update_col_num", this.getTileCol());
                    this.post("update_mapwidth", this.getMapWidth());
                },
                draw: function () {
                    var painter = this.getPainter();
                    painter.clean();
                    this.map.draw(painter);
                    //绘制拖动到此的tile的效果
                    if(this.hoverFrame)
                    {
                        var sprite = this.selectedTile.getSprite();
                        var lastX = sprite.getX();
                        var lastY = sprite.getY();
                        
                        sprite.setX(this.hoverFrame.mapX + this.map.getMapX());
                        sprite.setY(this.hoverFrame.mapY + this.map.getMapY());
                        painter.clearRect(sprite.getX(), sprite.getY(), sprite.getWidth(), sprite.getHeight());
                        sprite.draw(painter);
                        
                        sprite.setX(lastX);
                        sprite.setY(lastY);
                    }
                    //
                    this.editor.getPainter().drawCanvas(this);
                }
            },
            Canvas
        );
        return MapEditor;
    }
);