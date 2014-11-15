(function (window, undefined) {
    var mySound = {
        fire : new Howl({
            urls: ['./assets/sound/fire.mp3']
        }),
        fire_reach_wall : new Howl({
            urls: ['./assets/sound/fire_reach_wall.mp3']
        }),
        start_stage : new Howl({
            urls: ['./assets/sound/start_stage.mp3']
        }),
        user_move : new Howl({
            urls: ['./assets/sound/user_move.mp3'],
            volume: 0.2
        })
    };

    var Tank = new Class({
        sprite: null,
        position: new PIXI.Point(20, 20),
        anchor: new PIXI.Point(0.5, 0.5),
        orientations: 'up', // this options: 'up', 'down', 'left', 'left';
        world: {
            width: 520,
            height: 520
        },
        initialize: function(texture, options){
            var sprite = this.sprite = new PIXI.Sprite(texture);
            if(typeOf(options) !==  "object"){
                options = {};
            }
            options.position? (this.position = options.position) : null;
            options.anchor? (this.anchor = options.anchor) : null;
            this.world = options.world || this.world;

            sprite.position =  this.position;
            sprite.anchor =  this.anchor;
        },
        isOnBorderline: function(){
            var sprite = this.sprite;
            var world = this.world;
            var isIn = {
                top: sprite.position.y <= 20,
                bottom: sprite.position.y >= world.height -20,
                left: sprite.position.x <= 20,
                right: sprite.position.x >= world.width - 20
            };

            //console.log(isIn);
            return isIn;
        },
        movementUP: function(){
            var sprite = this.sprite;
            var direction = 'up';
            sprite.rotation = 360 * Math.PI / 180;
            if(this.orientations != direction){
                this.orientations = direction;
                return false;
            }
            if(this.isOnBorderline().top){
                return false;
            }
            sprite.position.y -= 20;
        },
        movementDown: function(){
            var sprite = this.sprite;
            var direction = 'down';
            sprite.rotation = 180 * Math.PI / 180;
            if(this.orientations != direction){
                this.orientations = direction;
                return false;
            }
            if(this.isOnBorderline().bottom){
                return false;
            }
            sprite.position.y += 20;
        },
        movementLeft: function(){
            var sprite = this.sprite;
            var direction = 'left';
            sprite.rotation = 270 * Math.PI / 180;
            if(this.orientations != direction){
                this.orientations = direction;
                return false;
            }
            if(this.isOnBorderline().left){
                return false;
            }
            sprite.position.x -= 20;
        },
        movementRight: function(){
            var sprite = this.sprite;
            var direction = 'right';
            sprite.rotation = 90 * Math.PI / 180;
            if(this.orientations != direction){
                this.orientations = direction;
                return false;
            }
            if(this.isOnBorderline().right){
                return false;
            }
            sprite.position.x += 20;
        }
    });
    var Ammo = new Class({
        fps: 30,
        env: {
            now: null,
            delta: null,
            then: Date.now(),
            interval: 1000 / 30
        },
        sprite: null,
        position: new PIXI.Point(20, 20),
        anchor: new PIXI.Point(0.5, 0.5),
        orientations: 'up', // this options: 'up', 'down', 'left', 'left';
        world: {
            width: 520,
            height: 520
        },
        needDel: null,
        initialize: function(texture, options){
            var sprite = this.sprite = new PIXI.Sprite(texture);
            if(typeOf(options) !==  "object"){
                options = {};
            }
            sprite.position = options.position || this.position;
            sprite.anchor = options.anchor || this.anchor;
            this.orientations = options.orientations || this.orientations;
            this.world = options.world || this.world;
            this.env.interval = 1000 / this.fps;
        },
        isOnBorderline: function(){
            var sprite = this.sprite;
            var world = this.world;
            var isIn = {
                top: sprite.position.y <= 0,
                bottom: sprite.position.y >= world.height,
                left: sprite.position.x <= 0,
                right: sprite.position.x >= world.width
            };
            this.isIn = isIn;
            //console.log(isIn);
            return isIn;
        },
        movementUP: function(){
            var sprite = this.sprite;
            var direction = 'up';
            sprite.rotation = 360 * Math.PI / 180;
            if(this.orientations != direction){
                this.orientations = direction;
                return false;
            }
            if(this.isOnBorderline().top){
                this.needDel = true;
                return false;
            }
            sprite.position.y -= 20;

        },
        movementDown: function(){
            var sprite = this.sprite;
            var direction = 'down';
            sprite.rotation = 180 * Math.PI / 180;
            if(this.orientations != direction){
                this.orientations = direction;
                return false;
            }
            if(this.isOnBorderline().bottom){
                this.needDel = true;
                return false;
            }
            sprite.position.y += 20;
        },
        movementLeft: function(){
            var sprite = this.sprite;
            var direction = 'left';
            sprite.rotation = 270 * Math.PI / 180;
            if(this.orientations != direction){
                this.orientations = direction;
                return false;
            }
            if(this.isOnBorderline().left){
                this.needDel = true;
                return false;
            }
            sprite.position.x -= 20;
        },
        movementRight: function(){
            var sprite = this.sprite;
            var direction = 'right';
            sprite.rotation = 90 * Math.PI / 180;
            if(this.orientations != direction){
                this.orientations = direction;
                return false;
            }
            if(this.isOnBorderline().right){
                this.needDel = true;
                return false;
            }
            sprite.position.x += 20;
        },
        autoMove: function(){
            switch (this.orientations){
                case 'up':
                    this.movementUP();
                    break;
                case 'down':
                    this.movementDown();
                    break;
                case 'left':
                    this.movementLeft();
                    break;
                case 'right':
                    this.movementRight();
                    break;
            }
        }
    });

    window.addEvent('domready', function () {

        var loopList = [];
        var renderer = new PIXI.autoDetectRenderer(600, 520);
        $$('#myWorld').grab(renderer.view);

        var stage = new PIXI.Stage;

        var assetsToLoader = ["./assets/images/myTank.json"];
        loader = new PIXI.AssetLoader(assetsToLoader);
        loader.onComplete = onAssetsLoaded
        loader.load();

        var frames = ["tank1.png", 'tank2.png', 'ammo.png', 'bomb1.png', 'bomb2.png', 'bomb3.png'];

        var myWorld = new PIXI.DisplayObjectContainer();
        myWorld.position.x = 0;
        myWorld.position.y = 0;

        var toolBar = new PIXI.DisplayObjectContainer();
        toolBar.position.x = 520;
        toolBar.position.y = 0;

        var myWorldBg = new PIXI.Graphics();
        myWorldBg.beginFill('0X000000', 1);
        myWorldBg.drawRect(0, 0, 520, 520);
        myWorldBg.endFill();
        myWorld.addChild(myWorldBg);

        var axis = new PIXI.Graphics();
        axis.lineStyle (1, '0xFF0000');
        for(var i= 0; i < 520; i += 20){
            axis.moveTo(i, 0);
            axis.lineTo(i, 520);
            axis.moveTo(0, i);
            axis.lineTo(520, i);
        }
        myWorld.addChild(axis);

        var toolBarBg = new PIXI.Graphics();
        toolBarBg.beginFill('0X999999', 1);
        toolBarBg.drawRect(0, 0, 80, 520);
        toolBarBg.endFill();
        toolBar.addChild(toolBarBg);


        stage.addChild(myWorld);
        stage.addChild(toolBar);

        var myTank;
        var ammoTexture;
        var bomb1Texture;
        var bomb2Texture;
        var bomb3Texture;
        function onAssetsLoaded() {
            ammoTexture = PIXI.Texture.fromFrame(frames[2]);
            bomb1Texture = PIXI.Texture.fromFrame(frames[3]);
            bomb2Texture = PIXI.Texture.fromFrame(frames[4]);
            bomb3Texture = PIXI.Texture.fromFrame(frames[5]);
            var texture = PIXI.Texture.fromFrame(frames[0]);
            myTank = new Tank(texture, {
                position: new PIXI.Point(240, 500)
            });
            myWorld.addChild(myTank.sprite);
            mySound.start_stage.play();
            requestAnimationFrame(animate);
        }


        window.addEvent('keypress', function (e) {
            var key = e.key;
            //console.log(key);

            switch (key) {
                case 'w':
                    mySound.user_move.pause();
                    mySound.user_move.play();
                    myTank.movementUP();
                    break;
                case 's':
                    mySound.user_move.pause();
                    mySound.user_move.play();
                    myTank.movementDown();
                    break;
                case 'a':
                    mySound.user_move.pause();
                    mySound.user_move.play();
                    myTank.movementLeft();
                    break;
                case 'd':
                    mySound.user_move.pause();
                    mySound.user_move.play();
                    myTank.movementRight();
                    break;
                case 'space':
                    var ammo = new Ammo(ammoTexture, {
                        position: myTank.position.clone(),
                        orientations: myTank.orientations
                    });
                    mySound.fire.play();
                    ammo.isBomb = false;
                    ammo.bombNum = 1;
                    myWorld.addChild(ammo.sprite);
                    ammo.loop = function(time){
                        ammo.env.now = Date.now();
                        ammo.env.delta = ammo.env.now - ammo.env.then;
                        if (ammo.env.delta < ammo.env.interval) {
                            return false;
                        }
                        ammo.env.then = ammo.env.now - (ammo.env.delta % ammo.env.interval);
                        if(ammo.needDel){
                            if(ammo.isBomb){
                                loopList.splice(loopList.indexOf(ammo.loop),1);
                                myWorld.removeChild(ammo.sprite);
                                return false;
                            }
                            ammo.env.interval = 1000 / 20;
                            switch (ammo.bombNum){
                                case 1:
                                    mySound.fire_reach_wall.play();
                                    ammo.sprite.setTexture(bomb2Texture);
                                    ammo.bombNum += 1;
                                    break;
                                case 2:
                                    ammo.sprite.setTexture(bomb3Texture);
                                    ammo.bombNum += 1;
                                    break;
                                case 3:
                                    ammo.sprite.setTexture(bomb1Texture);
                                    ammo.bombNum += 1;
                                    break;
                                default :
                                    ammo.isBomb = true;
                            }
                            return false;
                        }
                        ammo.autoMove();
                    };
                    loopList.push(ammo.loop);
                    break;
            }
            function animate() {
                ammo.position.x += 20;
                requestAnimationFrame(animate);
            }
        });

        loopList.push(function(time){
            renderer.render(stage);
        });

        function loopRun(time){
            loopList.forEach(function(a, b){
                loopList[b]();
            });
            //for(var key in loopList){
            //    console.log(key);
            //    if(typeof loopList[key] === "function"){
            //        loopList[key](time);
            //    }
            //}
        }

        function animate(time) {
            loopRun(time);
            //console.log(arguments);
            requestAnimationFrame(animate);
        }
    });
})(window);