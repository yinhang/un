un.define(
    "un.client.graphics.Painter", 
    [
        "un.client.Class"
    ], 
    function (Class, Canvas) {
        return Class.define(
            function (canvas) {
                this.context = canvas.getSource().getContext("2d");
                this.canvas = canvas;
           }, 
            {
                getCanvas: function () {
                    return this.canvas;
                },
                drawCanvas: function (canvas) {
                    if(canvas.isShown() == true)
                    {
                        var width = canvas.getWidth();
                        var height = canvas.getHeight();
                        if(width != 0 && height != 0)
                            this.context.drawImage(canvas.getSource(), canvas.getX(), canvas.getY(), width, height);
                    }
                },
                drawBASE64Image: function (url) {
                    this.context.drawImage(url, this.canvas.getX(), this.canvas.getY(), this.canvas.getWidth(), this.canvas.getHeight());
                },
                drawImage: function (image, scaleWidth, scaleHeight) {
                    if(image.isShown() == true)
                        this.context.drawImage(image.getSource(), image.getX(), image.getY(), scaleWidth, scaleHeight);
                },
                drawClipImage: function (image, scaleWidth, scaleHeight, clipX, clipY, clipWidth, clipHeight) {
                    if(image.isShown() == true)
                        this.context.drawImage(image.getSource(), clipX, clipY, clipWidth , clipHeight, image.getX(), image.getY(), scaleWidth, scaleHeight);
                },
                begin: function () {
                    this.context.beginPath();
                },
                fill: function () {
                    this.context.fill();
                },
                save: function () {
                    this.context.save();
                },
                restore: function () {
                    this.context.restore();
                },
                clip: function () {
                    this.context.clip();
                },
                stroke: function () {
                    this.context.stroke();
                },
                drawArc: function (x, y, radius, startAngle, endAngle, anticlockwise) {
                    this.context.arc(x, y, radius, startAngle, endAngle, anticlockwise);
                },
                fillRect: function (x, y, width, height) {
                    this.context.fillRect(x, y, width, height);
                },
                moveTo: function (x, y) {
                    this.context.moveTo(x, y);
                },
                lineTo: function (x, y) {
                    this.context.lineTo(x, y);
                },
                drawRect: function (x, y, width, height) {
                    this.context.strokeRect(x, y, width, height);
                },
                clean: function () {
                    this.context.clearRect(0, 0, this.canvas.getSourceWidth(), this.canvas.getSourceHeight());
                },
                clearRect: function (x, y, width, height) {
                    this.context.clearRect(x, y, width, height);
                },
                getContext: function () {
                    return this.context;
                }
            }
        );
    }
);
