un.define(
    "app.element.spaceship.weapon.Backend",
    [
        "un.client.Class",
        "app.element.spaceship.Weapon"
    ],
    function (Class, Sprite) {
        var Backend = Class.define(
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
        
        return Backend;
    }
);
