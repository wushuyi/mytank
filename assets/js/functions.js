(function (window, undefined) {
    window.addEvent('domready', function () {
        var util ={
            angle : Math.PI / 180
        };
        var renderer = new PIXI.autoDetectRenderer(800, 600);
        $$('#myWorld').grab(renderer.view);

        var stage = new PIXI.Stage;

        var assetsToLoader = ["./assets/images/myTank.json"];
        loader = new PIXI.AssetLoader(assetsToLoader);
        loader.onComplete = onAssetsLoaded
        loader.load();

        var frames = ["tank1.png", 'tank2.png'];

        var myWorld = new PIXI.DisplayObjectContainer();

        stage.addChild(myWorld);
        var myTank;

        function onAssetsLoaded() {
            var tankColor = 0;
            var texture = PIXI.Texture.fromFrame(frames[tankColor]);
            myTank = new PIXI.Sprite(texture);
            myTank.anchor.x = 0.5;
            myTank.anchor.y = 0.5;
            myTank.position.x = 20;
            myTank.position.y = 20;

            myTank.interactive = true;
            myTank.click = function(){
                (tankColor == 1) ? (tankColor = 0) : (tankColor = 1)
                texture = PIXI.Texture.fromFrame(frames[tankColor]);
                myTank.setTexture(texture);
            };

            myWorld.addChild(myTank);
            requestAnimationFrame(animate);
        }

        window.addEvent('keypress', function(e){
            var key = e.key;
            switch (key){
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
            }
        });


        function animate() {
            renderer.render(stage);
            requestAnimationFrame(animate);
        }
    });
})(window);