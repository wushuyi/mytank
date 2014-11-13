(function (window, undefined) {
    window.addEvent('domready', function () {
        var util ={
            angle : Math.PI / 180
        };
        var renderer = new PIXI.autoDetectRenderer(800, 600);
        $$('.wrapper').grab(renderer.view);
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

            var texture = PIXI.Texture.fromFrame(frames[1]);
            myTank = new PIXI.Sprite(texture);
            myTank.anchor.x = 0.5;
            myTank.anchor.y = 0.5;
            myTank.position.x = 20;
            myTank.position.y = 20;

            myTank.interactive = true;
            //myTank.click = function(){
            //    texture = PIXI.Texture.fromFrame(frames[0]);
            //    myTank.setTexture(texture);
            //    console.log(texture);
            //    myTank.updateCache();
            //    console.log(myTank);
            //};
            myTank.click = function(){
                myTank.rotation += 90 * util.angle;
            };

            myWorld.addChild(myTank);
            requestAnimationFrame(animate);
        }


        function animate() {
            renderer.render(stage);
            requestAnimationFrame(animate);
        }
    });
})(window);