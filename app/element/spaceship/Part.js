un.define(
    "app.element.spaceship.Part",
    [
        "un.client.Class"
    ],
    function (Class, Sprite) {
        var Part = Class.define(
            /**
             * 
             */
            function () {
                
            },
            { 
                uninstall: function () {
                    
                },
                install: function () {
                    
                },
                setFace: function (face) {
                    this.face = face;
                },
                getFace: function () {
                    return this.face;
                }
            }
        );
        
        return Part;
    }
);
