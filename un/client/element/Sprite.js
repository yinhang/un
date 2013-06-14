un.define(
    "un.client.element.Sprite",
    [
        "un.client.Class",
        "un.client.Element"
    ],
    function (Class, Element) {
        var Sprite = Class.define(
            function (image, tileWidth, tileHeight) {
                this._super(tileWidth, tileHeight);
                this.frameX = 0;
                this.frameY = 0;
                this.image = image;
                this.frame = 1;
                this.tileWidth = tileWidth;
                this.tileHeight = tileHeight;
                this.colCount = image.getWidth() / tileWidth;
                this.rowCount = image.getHeight() / tileHeight;
                this.maxFrame = this.colCount * this.rowCount;
            },
            {
                getImage: function () {
                    return this.image;
                },
                nextFrame: function () {
                    if(this.frame >= this.maxFrame)
                        return;
                    this.setFrame(this.frame + 1);
                },
                prevFrame: function () {
                    if(this.frame > 1)
                        return;
                    this.setFrame(this.frame - 1);
                },
                getMaxFrame: function () {
                    return this.maxFrame;
                },
                loop: function () {
                    if(this.frame >= this.maxFrame)
                        this.frame = 0;
                    this.setFrame(this.frame + 1);
                },
                setFrame: function (frame) {
                    this.frame = frame;
                    -- frame;
                    this.frameX = Math.floor(frame % this.colCount) * this.tileWidth;
                    this.frameY = Math.floor(frame / this.colCount) * this.tileHeight;
                },
                getFrame: function () {
                    return this.frame;
                },
                setX: function (x) {
                    this._super.setX(x);
                    this.image.setX(x);  
                },
                setY: function (y) {
                    this._super.setY(y);
                    this.image.setY(y);  
                },
                setWidth: function () {},
                setHeight: function () {},
                draw: function (painter) {
                    if(this.isShown())
                    {
                        if(this.frame > 0)
                            painter.drawClipImage(this.image, this.tileWidth, this.tileHeight, this.frameX, this.frameY, this.tileWidth, this.tileHeight);
                        else
                        {
                            painter.clearRect(this.frameX, this.frameY, this.tileWidth, this.tileHeight);
                        }
                    }
                }
            },
            Element
        );
        return Sprite;
    }
);
