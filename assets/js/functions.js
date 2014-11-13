(function (window, undefined) {
    window.addEvent('domready', function () {
        var util = {
            angle: Math.PI / 180
        };
        var loopList = [];
        var renderer = new PIXI.autoDetectRenderer(800, 600);
        $$('#myWorld').grab(renderer.view);

        var stage = new PIXI.Stage;

        var assetsToLoader = ["./assets/images/myTank.json"];
        loader = new PIXI.AssetLoader(assetsToLoader);
        loader.onComplete = onAssetsLoaded
        loader.load();

        var frames = ["tank1.png", 'tank2.png', 'ammo.png'];

        var myWorld = new PIXI.DisplayObjectContainer();

        stage.addChild(myWorld);
        var myTank;
        var ammo;

        function onAssetsLoaded() {
            var tankColor = 0;
            var texture = PIXI.Texture.fromFrame(frames[tankColor]);
            myTank = new PIXI.Sprite(texture);
            myTank.anchor.x = 0.5;
            myTank.anchor.y = 0.5;
            myTank.position.x = 20;
            myTank.position.y = 20;

            myTank.interactive = true;
            myTank.click = function () {
                (tankColor == 1) ? (tankColor = 0) : (tankColor = 1)
                texture = PIXI.Texture.fromFrame(frames[tankColor]);
                myTank.setTexture(texture);
            };

            var texture2 = PIXI.Texture.fromFrame(frames[2]);
            ammo = new PIXI.Sprite(texture2);
            ammo.anchor.x = 0.5;
            ammo.anchor.y = 0.5;

            myWorld.addChild(myTank);
            requestAnimationFrame(animate);
        }


        window.addEvent('keypress', function (e) {
            var key = e.key;
            //console.log(key);

            switch (key) {
                case 'd':
                    myTank.rotation = 90 * util.angle;
                    myTank.position.x += 20;
                    break;
                case 's':
                    myTank.rotation = 180 * util.angle;
                    myTank.position.y += 20;
                    break;
                case 'a':
                    myTank.rotation = 270 * util.angle;
                    myTank.position.x -= 20;
                    break;
                case 'w':
                    myTank.rotation = 360 * util.angle;
                    myTank.position.y -= 20;
                    break;
                case 'space':
                    ammo.rotation = myTank.rotation;
                    ammo.position = myTank.position.clone();
                    myWorld.addChild(ammo);
                    requestAnimationFrame(animate);
                    break;
                case 'h':
                    var test = function(time){
                        //console.log('run');
                    };
                    loopList.push(test);
                    console.log(loopList.indexOf(test));
                    break;
            }
            function animate() {
                ammo.position.x += 20;
                requestAnimationFrame(animate);
            }
        });
        function Ammo(texture, position, myWorld) {
            var texture = PIXI.Texture.fromFrame(frames[2]);
            var ammo = new PIXI.Sprite(texture);
            ammo.anchor.x = 0.5;
            ammo.anchor.y = 0.5;
            console.log(myTank);
            ammo.rotation = myTank.rotation;
            ammo.position = myTank.position.clone();
            myWorld.addChild(ammo);
        }

        loopList.push(function(time){
            renderer.render(stage);
        });

        function loopRun(time){
            for(var i = 0, j = loopList.length; i < j; i++){
                loopList[i](time);
            }
        }

        function animate(time) {
            loopRun(time);
            //console.log(arguments);
            requestAnimationFrame(animate);
        }
    });
})(window);