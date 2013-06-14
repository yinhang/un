un.define(
    "app.element.spaceship.weapon.Body",
    [
        "un.client.Class",
        "app.element.spaceship.Weapon"
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
            Weapon
        );
        
        return Body;
    }
);
