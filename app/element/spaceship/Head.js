un.define(
    "app.element.spaceship.Head",
    [
        "un.client.Class",
        "app.element.spaceship.Part"
    ],
    function (Class, Sprite) {
        var Head = Class.define(
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
        
        return Head;
    }
);
