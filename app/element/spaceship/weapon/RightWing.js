un.define(
    "app.element.spaceship.weapon.RightWing",
    [
        "un.client.Class",
        "app.element.spaceship.Weapon"
    ],
    function (Class, Sprite) {
        var RightWing = Class.define(
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
        
        return RightWing;
    }
);
