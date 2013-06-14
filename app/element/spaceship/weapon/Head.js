un.define(
    "app.element.spaceship.weapon.Head",
    [
        "un.client.Class",
        "app.element.spaceship.Weapon"
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
            Weapon
        );
        
        return Head;
    }
);
