un.define(
    "app.element.spaceship.Body",
    [
        "un.client.Class",
        "app.element.spaceship.Part"
    ],
    function (Class, Sprite) {
        var Body = Class.define(
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
        
        return Body;
    }
);
