un.define(
    "app.element.spaceship.Engine",
    [
        "un.client.Class",
        "app.element.spaceship.Part"
    ],
    function (Class, Sprite) {
        var Engine = Class.define(
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
        
        return Engine;
    }
);
