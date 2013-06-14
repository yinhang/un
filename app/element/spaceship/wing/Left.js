un.define(
    "app.element.spaceship.wing.Left",
    [
        "un.client.Class",
        "app.element.spaceship.Wing"
    ],
    function (Class, Sprite) {
        var Left = Class.define(
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
        
        return Left;
    }
);
