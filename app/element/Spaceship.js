un.define(
    "app.element.Spaceship",
    [
        "un.sys.Class",
        "un.graphics.Canvas"
    ],
    function (Class, Canvas) {
        var Spaceship = Class.define(
            function (plan, parts) {
                this.parts = {};
                this.setPlan(plan);
                if(parts)
                {
                    this.setBody(parts.body);
                    this.setEngine(parts.engine);
                    this.seHead(parts.head);
                    this.setShield(parts.shield);
                    this.setBackendWeapon(parts.backendWeapon);
                    this.setBodyWeapon(parts.bodyWeapon);
                    this.setHeadWeapon(parts.headWeapon);
                    this.setLeftWingWeapon(parts.leftWingWeapon);
                    this.setRightWingWeapon(parts.rightWingWeapon);
                    this.setLeftWing(parts.leftWing);
                    this.setRightWing(parts.rightWing);
                }
                this.painter = this.getPainter();
            },
            { 
                setWidth: function () {
                    
                },
                setHeight: function () {
                    
                },
                getWidth: function () {
                    var width = 0;
                    for(var partName in this.parts)
                    {
                        var part = this.parts[partName];
                        if(part)
                        {
                            var face = part.getFace();
                            var partRight = face.getWidth() + face.getX();
                            width = partRight > width;
                        }
                    }
                    return width;
                },
                getHeight: function () {
                    var height = 0;
                    for(var partName in this.parts)
                    {
                        var part = this.parts[partName];
                        if(part)
                        {
                            var face = part.getFace();
                            var partBottom = face.getHeight() + face.getY();
                            height = partBottom > height;
                        }
                    }
                    return height;
                },
                setPlan: function (plan) {
                    this.plan = plan;
                    this.installBody(this.parts.body);
                    this.installEngine(this.parts.engine);
                    this.installHead(this.parts.head);
                    this.installShield(this.parts.shield);
                    this.installBackendWeapon(this.parts.backendWeapon);
                    this.installBodyWeapon(this.parts.bodyWeapon);
                    this.installHeadWeapon(this.parts.headWeapon);
                    this.installLeftWingWeapon(this.parts.leftWingWeapon);
                    this.installRightWingWeapon(this.parts.rightWingWeapon);
                    this.installLeftWing(this.parts.leftWing);
                    this.installRightWing(this.parts.rightWing);
                },
                installPart: function (name, part) {
                    this.parts[name] = part;
                    if(part)
                    {
                        var face = part.getFace();
                        if(face)
                        {
                            face.setX(this.plan[name].x);
                            face.setY(this.plan[name].y);
                        }
                    }
                },
                installBody: function (body) {
                    this.installPart("body", body);
                },
                installEngine: function (engine) {
                    this.installPart("engine", engine);
                },
                installHead: function (head) {
                    this.installPart("head", head);
                },
                installShield: function (shield) {
                    this.installPart("shield", shield);
                },
                installBackendWeapon: function (backendWeapon) {
                    this.installPart("backendWeapon", backendWeapon);
                },
                installBodyWeapon: function (bodyWeapon) {
                    this.installPart("bodyWeapon", bodyWeapon);
                },
                installHeadWeapon: function (headWeapon) {
                    this.installPart("headWeapon", headWeapon);
                },
                installLeftWingWeapon: function (leftWingWeapon) {
                    this.installPart("leftWingWeapon", leftWingWeapon);
                },
                installRightWingWeapon: function (rightWingWeapon) {
                    this.installPart("rightWingWeapon", rightWingWeapon);
                },
                installLeftWing: function (leftWing) {
                    this.installPart("leftWing", leftWing);
                },
                installRightWing: function (rightWing) {
                    this.installPart("rightWing", rightWing);
                },
                
                getBody: function (body) {
                    return this.parts.body;
                },
                getEngine: function (engine) {
                    return this.parts.engine;
                },
                getHead: function (head) {
                    return this.parts.head;
                },
                getShield: function (shield) {
                    return this.parts.shield;
                },
                getBackendWeapon: function (backendWeapon) {
                    return this.parts.backendWeapon;
                },
                getBodyWeapon: function (bodyWeapon) {
                    return this.parts.bodyWeapon;
                },
                getHeadWeapon: function (headWeapon) {
                    return this.parts.headWeapon;
                },
                getLeftWingWeapon: function (leftWingWeapon) {
                    return this.parts.leftWingWeapon;
                },
                getRightWingWeapon: function (rightWingWeapon) {
                    return this.parts.rightWingWeapon;
                },
                getLeftWing: function (leftWing) {
                    return this.parts.leftWing;
                },
                getRightWing: function (rightWing) {
                    return this.parts.rightWing;
                },
                
                renderPart: function (painter, name) {
                    var part = this.parts[name];
                    if(part)
                    {
                        var face = part.getFace();
                        if(face)
                        {
                            face.draw(painter);
                        }
                    }
                },
                
                draw: function (painter) {
                    renderPart(this.painter, "head");
                    renderPart(this.painter, "body");
                    renderPart(this.painter, "engine");
                    renderPart(this.painter, "headWeapon");
                    renderPart(this.painter, "bodyWeapon");
                    renderPart(this.painter, "backendWeapon");
                    renderPart(this.painter, "leftWing");
                    renderPart(this.painter, "rightWing");
                    renderPart(this.painter, "leftWingWeapon");
                    renderPart(this.painter, "rightWingWeapon");
                    renderPart(this.painter, "shield");
                    painter.drawCanvas(this);
                }
            },
            Canvas
        );
        return Spaceship;
    }
);
