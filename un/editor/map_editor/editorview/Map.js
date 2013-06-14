un.define(
    "un.editor.map_editor.editorview.Map",
    [
        "un.client.Class",
        "un.client.element.Map"
    ],
    function (Class, ElementMap) {
        var Map = Class.define(
            function (sprite, viewWidth, viewHeight) {
                this._super(sprite, viewWidth, viewHeight);
                this.scrollXSpeed = this.getSprite().getWidth() / 8;
                this.scrollYSpeed = this.getSprite().getHeight() / 8;
            },
            {
                scrollLeft: function () {
                    this.setMapX(this.getMapX() - this.scrollXSpeed);
                },
                scrollRight: function () {
                    var newMapX = this.getMapX() + this.scrollXSpeed;
                    if(newMapX > 0)
                        newMapX = 0;
                    this.setMapX(newMapX);
                },
                scrollUp: function () {
                    this.setMapY(this.getMapY() - this.scrollYSpeed);
                },
                scrollDown: function () {
                    var newMapY = this.getMapY() + this.scrollYSpeed;
                    if(newMapY > 0)
                        newMapY = 0;
                    this.setMapY(newMapY);
                },
                getColCount: function () {
                    return this.getAllFrame()[0].length;
                },
                getRowCount: function () {
                    return this.getAllFrame().length;
                },
                hoverTile: function (x, y) {
                    
                },
                adjustSize: function (xTileInc, yTileInc) {
                    var mapData = this.getAllFrame();
                    if(xTileInc > 0)
                    {
                        for(var i = 0; i < xTileInc; ++ i)
                        {
                            for(var mdi = 0, mdl = mapData.length; mdi < mdl; ++ mdi)
                            {
                                mapData[mdi].push(mapData[mdi][mapData[mdi].length - 1]);
                            }
                        }
                    }
                    else if(xTileInc < 0)
                    {
                        for(var i = mapData.length - 1; i >= 0; -- i)
                        {
                            var startIndex = mapData[i].length + xTileInc; 
                            mapData[i].splice(startIndex);
                        }
                    }
                    if(yTileInc > 0)
                    {
                        for(var i = 0, l = yTileInc; i < l; ++ i)
                        {
                            var newCol = [];
                            var lastCol = mapData[mapData.length - 1];
                            for(var ii = 0, ll = lastCol.length; ii < ll; ++ ii)
                            {
                                newCol.push(lastCol[ii]);
                            }
                            mapData.push(newCol);
                        }
                    }
                    else if(yTileInc < 0)
                    {
                        var startIndex = mapData.length + yTileInc; 
                        mapData.splice(startIndex, Math.abs(yTileInc));
                    }
                    this.build(mapData);
                }
            },
            ElementMap
        );
        return Map;
    }
);
