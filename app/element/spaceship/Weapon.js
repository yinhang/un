un.define(
    "app.element.spaceship.Weapon",
    [
        "un.client.Class",
        "app.element.spaceship.Part"
    ],
    function (Class, Sprite) {
        var Weapon = Class.define(
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
        
        return Weapon;
    }
);
