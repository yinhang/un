un.define(
    "un.client.graphics.Canvas", 
    [
        "un.client.graphics.Displayable", 
        "un.client.Class", 
        "un.client.graphics.Painter"
    ], 
    function (Displayable, Class, Painter) {
        return Class.define(
            function (width, height) {
                this._super(width, height);
                this.setSource(document.createElement("canvas"));
                this.painter = new Painter(this);
                if(width || width == 0)
                {
                    this.setWidth(width);
                }
                if(height || height == 0)
                    this.setHeight(height);
                this.scaleWidth = 1;
                this.scaleHeight = 1;
                this.sourceWidth = width;
                this.sourceHeight = height;
                this.source = this.getSource();
            },
            {
                toDataURL: function () {
                    return this.getSource().toDataURL();
                },
            	scale: function (scaleWidth, scaleHeight) {
            	    switch(arguments.length)
            	    {
            	        case 0:
            	           return;
            	        case 1:
                            this._super.setWidth(this.getWidth() * scaleWidth);
                            this.scaleWidth = scaleWidth;
                            break;
                        case 2:
                            this._super.setWidth(this.getWidth() * scaleWidth);
                            this._super.setHeight(this.getHeight() * scaleHeight);
                            this.scaleWidth = scaleWidth;
                            this.scaleHeight = scaleHeight;
                            break;
            	    }
            	},
            	getSourceWidth: function () {
            	    return this.sourceWidth;
            	},
            	getSourceHeight: function () {
            	    return this.sourceHeight;
            	},
                setWidth: function (width) {
                    this._super.setWidth(width);
                    this.source.width = width;
                    this.sourceWidth = width;
                },
                setHeight: function (height) {
                    this._super.setHeight(height);
                    this.source.height = height;
                    this.sourceHeight = height;
                },
                getPainter: function () {
                    return this.painter;
                }
            },
            Displayable
        );
    }
);
