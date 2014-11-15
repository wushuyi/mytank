(function(window, undefined){
    var Tank = new Class({
        sprite: null,
        position: new PIXI.Point(20, 20),
        anchor: new PIXI.Point(0.5, 0.5),
        orientations: 'up', // this options: 'up', 'down', 'left', 'left';
        initialize: function(texture, options){
            var sprite = this.sprite = new PIXI.Sprite(texture);
            if(typeOf(options) !==  "object"){
                options = {};
            }
            sprite.position = options.position || this.position;
            sprite.anchor = options.anchor || this.anchor;
        },
        movementUP: function(){
            var sprite = this.sprite;
            sprite.rotation = 360 * Math.PI / 180;
            sprite.position.y -= 20;
            this.orientations = 'up';
        },
        movementDown: function(){
            var sprite = this.sprite;
            sprite.rotation = 180 * Math.PI / 180;
            sprite.position.y += 20;
            this.orientations = 'down';
        },
        movementLeft: function(){
            var sprite = this.sprite;
            sprite.rotation = 270 * Math.PI / 180;
            sprite.position.x -= 20;
            this.orientations = 'left';
        },
        movementRight: function(){
            var sprite = this.sprite;
            sprite.rotation = 90 * Math.PI / 180;
            sprite.position.x += 20;
            this.orientations = 'right';
        }
    });

    var Ammo = new Class({
        position: {
            x: 0,
            y: 0
        },
        orientations: 'up',
        initialize: function(options){

        }
    });

    var map = new Class({
        sprite: null,
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


})(window);