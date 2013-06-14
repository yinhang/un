un.define(
    "app.element.spaceship.wing.Right",
    [
        "un.client.Class",
        "app.element.spaceship.Wing"
    ],
    function (Class, Sprite) {
        var Right = Class.define(
            /**
             */
            function (face) {
                this._super();
                this.setFace(face);
            },
            { 
                
            },
            Wing
        );
        
        return Right;
    }
);
