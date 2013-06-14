un.define(
    "un.client.EventCenter",
    [
        "un.client.Dispatcher"
    ],
    function (Dispatcher) {
        var dispatcher = new Dispatcher();
        var Event = {
            listen: function (name, listener) {
                dispatcher.regist(name, listener);
            },
            send: function (name, data) {
                return dispatcher.send(name, data);
            }
        };
        
        return Event;
    }
)
