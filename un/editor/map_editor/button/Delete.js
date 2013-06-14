un.define(
    "un.editor.map_editor.button.Delete",
    [
       "un.client.Class",
       "un.editor.map_editor.button.Common"
    ],
    function (Class, Common) {
        
        var Delete = Class.define(
            function (text) {
               this._super({
	                "mouseenter": {
	                	timeline: {
	                		0: 2
	                	}
	                },
	                "mousedown": {
	                	timeline: {
	                		0: 3
	                	}
	                },
	                "mouseup": {
	                	timeline: {
	                		0: 2
	                	}
	                },
	                "mouseleave": {
	                	timeline: {
	                		0: 1
	                	}
	                }
	            }, text);
            },
            {
            	
            },
            Common
        );
        
        return Delete;
    }
);