un.define(
    "app.element.spaceship.weapon.LeftWing",
    [
        "un.client.Class",
        "app.element.spaceship.Weapon"
    ],
    function (Class, Sprite) {
        var LeftWing = Class.define(
            /**
             */
            function (face) {
                this._super();
                this.setFace(face);
            },
            { 
                
            },
            Weapon
        );
        
        return LeftWing;
    }
);
