un.define(
    "un.client.tool.Browser",
    [
        "un.client.Class"
    ],
    function (Class) {
        var userAgent = window.navigator.userAgent.toLowerCase();
        var Browser = {
            mobile: userAgent.match(/mobile/) == null ? false : true
        };
        
        return Browser;
    }
);
