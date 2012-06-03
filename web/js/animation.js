/*
 *  Author: Mike Newell
 *  
 *  Nintendo Get the Gold Prototype @ GSP
 *
 **/

var counter = function() {
    var soup = $('.soup'),
        balance = 0;
        
    this.addCoins = function(count) {
        
        count = count || 0;
        
        balance = balance + count;
        
        
        
        var s = formatBalance(balance);
        
        soup.text(s);
    }
    
    var formatBalance = function(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
}

var headerCoin = function() {
    this.init = function () {
        var stage = new Stage(document.getElementById('gold-score-coin'));

        var ss = new SpriteSheet({
            'frames': {
                'width': 56.333333,
                'numFrames': 6,
                'regX': 0,
                'regY': 0,
                'height': 56
            },
            'animations': {
                'spin': [0, 5]
            },
            'images': ['images/coin-sprite.png']
        });

        var coin = new BitmapAnimation(ss);
        coin.x = 0;
        coin.y = 0;

        ss.getAnimation('spin').frequency = 3;
        ss.getAnimation('spin').next = 'spin';
        coin.gotoAndPlay('spin');

        stage.addChild(coin);
//                    Ticker.setFPS(60);
        Ticker.addListener(stage);

//                    console.dir(stage)
    }
}

var mouseCoins = function() {
    var canvas,
        stage,
        imgSeq = new Image(),
        bmpAnim,
        fpsLabel,
        ss,
        c,
        aud;

    this.init = function() {
        
        c = new counter();
        
        aud = document.getElementById('gold-audio');
//        a.setAttribute('src', 'audio/mario-coin.mp3'); 
        aud.load();
        
        canvas = document.getElementById('gold-mouse');
        stage = new Stage(canvas);

        stage.onMouseMove = moveCanvas;
        stage.onMouseDown = clickCanvas;

        var data = {
            'frames': {
                'width': 56.3333,
                'height': 56,
                'regX': 0,
                'regY': 0,
                'numFrames': 6
            },
            'animations': {
                'spinners': [0,5]
            },
            'images': ['images/coin-sprite.png']
        };
        
        ss = new SpriteSheet(data);

        bmpAnim = new BitmapAnimation(ss);
        
        ss.getAnimation('spinners').frequency = 5;
        ss.getAnimation('spinners').next = 'spinners';
        bmpAnim.gotoAndPlay('spinners');

        fpsLabel = new Text("-- fps", "bold 14px Arial", "#fff");
        stage.addChild(fpsLabel);
        fpsLabel.x = 10;
        fpsLabel.y = 20;

        Ticker.setFPS(30);
        Ticker.addListener(tick);


    }

    var tick = function() {
        var l = stage.getNumChildren();
        for(var i=l-1; i>0; i--) {
            var sparkle = stage.getChildAt(i);

            sparkle.vY += 1;
            sparkle.vX *= .98;

            sparkle.x += sparkle.vX;
            sparkle.y += sparkle.vY;
            sparkle.scaleX = sparkle.scaleY = sparkle.scaleX+sparkle.vS;
//            sparkle.alpha += sparkle.vA;

            if(sparkle.alpha <= 0 || sparkle.y > canvas.height) {
                stage.removeChildAt(i);
            }
        }

        fpsLabel.text = Math.round(Ticker.getMeasuredFPS()) + " fps";

        stage.update();

    }

    var clickCanvas = function(evt) {
        var count = Math.random()*15+5|0
        addSparkles(count, stage.mouseX, stage.mouseY, 2);
        
        c.addCoins(parseInt(count));
    }

    var moveCanvas = function(evt) {
        var per = Math.floor(Math.random()*100 + 1);
        if(per > 85) {
            var count = Math.random()*1+1|0
            addSparkles(count, stage.mouseX, stage.mouseY, 1);
        }
//        console.debug(count);
        c.addCoins(count);
    }

    var addSparkles = function(count, x, y, speed) {
        
        aud.cloneNode(true).play();

        for(var i = 0; i < count; i++) {
            
            var sparkle = bmpAnim.clone();

            sparkle.x = x;
            sparkle.y = y;

//            sparkle.alpha = Math.random()*0.5+0.5;
            sparkle.alpha = 1;
            sparkle.scaleX = sparkle.scaleY = Math.random()+0.3;

            var a = Math.PI*2*Math.random();
            var v = (Math.random()-0.5)*30*speed;
            sparkle.vX = Math.cos(a)*v;
            sparkle.vY = Math.sin(a)*v;
            sparkle.vS = (Math.random()-0.5)*0.02; // scale
//            sparkle.vA = -Math.random()*0.05-0.01; // alpha

            sparkle.gotoAndPlay(Math.random()*sparkle.spriteSheet.getNumFrames()|0);

            stage.addChild(sparkle);
        }
    }
}