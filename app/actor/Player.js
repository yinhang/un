un.define(
    "app.game.Player",
    [
        "un.clientlient.sys.Class",
        "app.element.Spaceship"
    ],
    function (Class, Canvas) {
        var Player = Class.define(
            function (x, y, parts) {
                this._super({
                    
                }, parts);
                this.setX(x);
                this.setY(y);
            },
            { 
                
            },
            Spaceship
        );
        
        return Player;
    }
);
