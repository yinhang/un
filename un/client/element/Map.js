un.define(
    "un.client.element.Map",
    [
        "un.client.Class",
        "un.client.Element",
        "un.client.graphics.Canvas"
    ],
    function (Class, Element, Canvas) {
        var Map = Class.define(
            function (sprite, viewWidth, viewHeight) {
                this._super(viewWidth, viewHeight);
                this.tileWidth = sprite.getWidth();
                this.tileHeight = sprite.getHeight();
                this.sprite = sprite;
                this.tileX = [];
                this.tileY = [];
                this.frames = [];
                this.mapX = 0;
                this.mapY = 0;
                this.mapWidth = 0;
                this.mapHeight = 0;
                this.mapCanvas = new Canvas(this.getWidth(), this.getHeight());
                this.mapCanvasPainter = this.mapCanvas.getPainter();
                this.setX(0);
                this.setY(0);
            },
            {
                getSprite: function () {
                    return this.sprite;
                },
                build: function (map) {
                    this.tileX = [];
                    this.tileY = [];
                    this.frames = [];
                    this.mapWidth = 0;
                    this.mapHeight = 0;
                    for(var i = 0, l = map.length; i < l; ++ i)
                    {
                        var lv2map = map[i];
                        var lv2frames = [];
                        var lv2tileX = [];
                        var lv2tileY = [];
                        var newMapWidth = lv2map.length * this.tileWidth;
                        this.mapWidth = newMapWidth > this.mapWidth ? newMapWidth : this.mapWidth;
                        for(var ii = 0, ll = lv2map.length; ii < ll; ++ ii)
                        {
                            lv2frames.push(lv2map[ii]);
                            lv2tileX.push(ii * this.tileWidth); 
                            lv2tileY.push(i * this.tileHeight); 
                        } 
                        this.frames.push(lv2frames);
                        this.tileX.push(lv2tileX);
                        this.tileY.push(lv2tileY);
                    }
                    this.mapHeight = map.length * this.tileHeight;
                },
                getAllFrame: function () {
                    return this.frames;
                },
                setTileFrame: function (mapX, mapY, frame) {
                    var yIndex = Math.ceil(( ( mapY + 1 ) / this.tileHeight )) - 1;
                    var xIndex = Math.ceil(( ( mapX + 1 ) / this.tileWidth )) - 1;
                    if(xIndex >= 0 && yIndex >= 0)
                    {
                        var lv2frames = this.frames[yIndex];
                        if(lv2frames && lv2frames.length > 0 && ( lv2frames[xIndex] || lv2frames[xIndex] == 0 ))
                        {
                            lv2frames[xIndex] = frame;
                        }
                    }
                },
                getTileFrame: function (mapX, mapY) {
                    var self = this;
                    var yIndex = Math.ceil(( mapY / this.tileHeight )) - 1;
                    var xIndex = Math.ceil(( mapX / this.tileWidth )) - 1;
                    if(xIndex >= 0 && yIndex >= 0)
                    {
                        var lv2frames = this.frames[yIndex];
                        if(lv2frames && lv2frames.length > 0 && ( lv2frames[xIndex] || lv2frames[xIndex] == 0 ))
                        {
                            return {
                                frame: lv2frames[xIndex],
                                mapX: self.tileX[yIndex][xIndex],
                                mapY: self.tileY[yIndex][xIndex]
                            };
                        }
                    }
                    return null;
                },
                getMapWidth: function () {
                    return this.mapWidth;
                },
                getMapHeight: function () {
                    return this.mapHeight;
                },
                setMapX: function (x) {
                    this.mapX = x;
                },
                setMapY: function (y) {
                    this.mapY = y;  
                },
                getMapX: function () {
                    return this.mapX;
                },
                getMapY: function () {
                    return this.mapY;
                },
                setX: function (x) {
                    this._super.setX(x);
                    this.mapCanvas.setX(x);
                },
                setY: function (y) {
                    this._super.setY(y);
                    this.mapCanvas.setY(y);
                },
                draw: function (painter) {
                    if(this.isShown())
                    {
                        var mapX = this.getMapX(), mapY = this.getMapY();
                        var height = this.getHeight();
                        var width = this.getWidth();
                        this.mapCanvasPainter.clearRect(0, 0, width, height);
                        var startXIndex, startYIndex, endXIndex, endYIndex;
                        if(mapX <= 0)
                        {
                            mapXR = -1 * mapX;
                            startXIndex = Math.floor( mapXR / this.tileWidth );
                            endXIndex = Math.ceil(( mapXR + width ) / this.tileWidth);
                        }
                        else if(mapX <= width)
                        {
                            startXIndex = 0;
                            endXIndex = Math.ceil(( width - mapX ) / this.tileWidth);
                        }
                        else if(mapX > width)
                        {
                            return;
                        }
                        if(mapY <= 0)
                        {
                            mapYR = -1 * mapY;
                            startYIndex = Math.floor( mapYR / this.tileHeight );
                            endYIndex = Math.ceil(( mapYR + height ) / this.tileHeight);
                        }
                        else if(mapY <= height)
                        {
                            startYIndex = 0;
                            endYIndex = Math.ceil(( height - mapY ) / this.tileHeight);
                        }
                        else if(mapY > height)
                        {
                            return;
                        }
                        if(this.frames && endYIndex > this.frames.length)
                        {
                            endYIndex = this.frames.length;
                        }
                        if(this.frames[0] && endXIndex > this.frames[0].length)
                        {
                            endXIndex = this.frames[0].length;
                        }
                        for(var i = startYIndex; i < endYIndex; ++ i)
                        {
                            var lv2frames = this.frames[i];
                            var lv2tileX = this.tileX[i];
                            var lv2tileY = this.tileY[i];
                            for(var ii = startXIndex; ii < endXIndex; ++ ii)
                            {
                                this.sprite.setX(lv2tileX[ii] + mapX);
                                this.sprite.setY(lv2tileY[ii] + mapY);
                                this.sprite.setFrame(lv2frames[ii]);
                                this.sprite.draw(this.mapCanvasPainter);
                            }
                        }
                        painter.drawCanvas(this.mapCanvas);  
                    }
                }
            },
            Element
        );
        return Map;
    }
);
