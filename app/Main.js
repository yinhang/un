un.define(
    "app.Main",
    [
        "un.client.Screen", 
        "un.client.Runner",
        "un.client.ui.touch.Joystick"
    ],
    function (Screen, Runner, Joystick) {
        document.body.addEventListener("touchmove", function (event) {
            event.preventDefault();
            return false;
        });
        var width = 960, height = 640;
        var mainScreen = new Screen(document.getElementById("mainCanvas"), width, height);
        var mainScreenPainter = mainScreen.getPainter();
        var mainScreenPainterContext = mainScreen.getPainter().getContext();
        var joyStick = new Joystick(mainScreen, 100, 100, 100);
        var mainRunner = new Runner(
            function () {
                mainScreen.cleanMsg();
                joyStick.clean(mainScreenPainter);
                joyStick.draw(mainScreenPainter);
                mainScreen.showFps();
                mainScreen.printNext(joyStick.getAngle());
            }, 60);
       mainRunner.start();
    }
);
