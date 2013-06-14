un.define(
    "un.editor.map_editor.button.Common",
    [
       "un.client.Class",
       "un.client.ui.widget.button.Sprite",
       "un.client.loader.Image: /res/editor/button.png",
       "un.client.element.Sprite"
    ],
    function (Class, SpriteButton, ButtonImage, Sprite) {
        
        var Common = Class.define(
            function (settings, text) {
               this._super(new Sprite(ButtonImage, 64, 64), settings, text);
            },
            {
            	
            },
            SpriteButton
        );
        
        return Common;
    }
);