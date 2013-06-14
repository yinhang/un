un.define(
    "client.ui.Keyboard",
    [
        "un.client.Screen",
        "un.client.Class",
        "un.client.Dispatcher"
    ],
    function (Screen, Class, Dispatcher) {
        var Keyboard = Class.define(
            function (screen) {
                if(screen.is(Screen))
                {
                    var self = this;
                    this.actionIndex = {};
                    this.eventCenter = new Dispatcher();
                    this.action = {};
                    var screenSource = screen.getSource();
                    //screenSource.tabIndex = undefined;
                    document.documentElement.addEventListener("keyup", function (event) {
                        if(self.eventCenter.send(Keyboard.eventName.KEY_UP, event) != false)
                        {
                            var actionName = self.actionIndex[event.keyCode];
                            if(actionName)
                            {
                                self.action[actionName] = Keyboard.KEY_UP;
                            }
                        }
                    });
                    document.documentElement.addEventListener("keydown", function (event) {
                        if(self.eventCenter.send(Keyboard.eventName.KEY_DOWN, event) != false)
                        {
                            var actionName = self.actionIndex[event.keyCode];
                            if(actionName)
                            {
                                self.action[actionName] = Keyboard.KEY_DOWN;
                            }
                        }
                    });
                }
                else
                {
                    un.throwError("un.client.ui.Keyboard: 构造的时候第一个参数需要传递一个Screen对象。");
                }
            },
            {
                addAction: function (name, keyCode) {
                    this.action[name] = Keyboard.KEY_UP;
                    this.actionIndex[keyCode] = name;
                },
                removeAction: function (name) {
                    delete this.action[name];
                    for(var keyCode in this.actionIndex)
                    {
                        var name = this.actionIndex[keyCode];
                        if(name == name)
                        {
                            delete this.actionIndex[keyCode];
                            return;
                        }
                    }
                },
                listen: function (name, listener) {
                    eventCenter.listen(name, listener);
                }
            }
        );
        
        var showKeyBoardInput = function (event) {
            var print = ( ( window.console && window.console.log ) ? window.console.log : window.alert );
            print(event.keyCode);
        };
        
        var showKeyBoardOpened = false;
        
        Keyboard.showUserInput = function (show) {
            if(show == true)
            {
                if(showKeyBoardOpened == false)
                {
                    document.documentElement.addEventListener("keydown", showKeyBoardInput);
                    showKeyBoardOpened = true;
                }
            }
            else if(show == false)
            {
                document.documentElement.removeEventListener("keydown", showKeyBoardInput);
                showKeyBoardOpened = false;
            }
        };
        
        Keyboard.KEY_UP = "key_up";
        
        Keyboard.KEY_DOWN = "key_down";
        
        Keyboard.eventName = {
            KEY_DOWN: "key_down",
            KEY_UP: "key_up"
        };
        
        return Keyboard;
    }
);
