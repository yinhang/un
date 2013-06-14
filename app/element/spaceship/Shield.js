un.define(
    "app.element.spaceship.Shield",
    [
        "un.client.Class",
        "app.element.spaceship.Part"
    ],
    function (Class, Sprite) {
        var Shield = Class.define(
            /**
             */
            function (face) {
                this._super();
                this.setFace(face);
            },
            { 
                
            },
            Part
        );
        
        return Shield;
    }
);
