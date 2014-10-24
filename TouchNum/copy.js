enchant();
window.onload = function() {
  var W=320;
  var H=320;
  var centerX = W/2;
  var centerY = H/2;
  var game = new Game(W,H);
  game.fps = 24;
  game.preload('images/0.png',
      'images/1.png',
      'images/2.png',
      'images/3.png',
      'images/4.png',
      'images/5.png',
      'images/6.png',
      'images/7.png',
      'images/8.png',
      'images/9.png',
      'images/start.png',
      'images/end.png'
      );

  var startTime;
  var numArray = [];
  var initNumArray = function(){numArray = [1,2,3,4,5,6,7,8,9];};
  var answerNo = 1;
  var w = 128; //icon size
  var i;
  var offsetX = -12;
  var offsetY = -12;
  var size = 107;
  var blockNum = 10;
  var blocks = new Array(blockNum);
  var gameNum; 
  var gameLimit = 5; //repetiton num

  //sprite
  var startW = 236;
  var startH = 48;
  var start = new Sprite(startW, startH);
  var endW = 189;
  var endH = 97;
  var end = new Sprite(endW, endH);

  //(call once)
  var initGame = function(){
    initNumArray();
    answerNo = 1;
    clearBlock();
    gameNum = -1;
  };

  var endGame = function(){
    clearBlock();
    end.x -= 500;
    var endTime = new Date();
    datet = parseInt((endTime.getTime() - startTime.getTime()) / 10, 10);
    sec = datet;
    var score = 60 - sec/100;
    if(score < 0){score = 0;}
    var message = 'Your Score:'+score.toPrecision(4);
    game.end(score, message);
  };

  var checkGameEnd = function(){
    if(gameNum==gameLimit){
      endGame();
    }
  };

  var randomBlock = function(){
    for(i=0; i<blocks.length; i++){
      blocks[i].no= getRandomNumber();
      var filename = 'images/'+blocks[i].no + '.png';
      blocks[i].image = game.assets[filename];
    }
  };

  var clearBlock = function(){
    for(i=0; i<blocks.length; i++){
      var filename = 'images/0.png';
      blocks[i].image = game.assets[filename];
    }
  };

  var reload = function(){
    initNumArray();
    answerNo = 1;
    randomBlock();
    gameNum += 1;
    checkGameEnd();
  };

  var getRandomNumber = function(){
    var len = numArray.length;
    var r = Math.floor( len * Math.random() );
    var ret = numArray[r];
    //delete
    for(var i=0; i<len; i++){
      if(ret == numArray[i]){
        numArray.splice(i,1);
        break;
      }
    }
    return ret;
  };

  //initialize
  game.onload = function(){
    start.x = W/2 - startW/2;
    start.y = H/2 - startH/2;
    start.spdX = 0;
    start.spdY = 0;
    start.accX = 0;
    start.accY = 0;
    start.image = game.assets['images/start.png'];
    var onTouchStart = function(){
      this.spdY = 10;
      this.accY = -3;
      reload();
      startTime = new Date();
    }
    start.addEventListener('touchstart', onTouchStart);
    var update = function(){
      this.spdX += this.accX;
      this.spdY += this.accY;
      this.x += this.spdX;
      this.y += this.spdY;
      if(this.y < -100){
        stage.removeChild(start);
      }
    }
    start.addEventListener('enterframe', update);

    end.x = W/2 - endW/2;
    end.x = W/2 - endW/2 + 500;
    end.y = H/2 - endH/2;
    end.image = game.assets['images/end.png'];

    for(i=0; i<blocks.length; i++){
      blocks[i] = new Sprite(w,w);
      blocks[i].x = size*(i%3) + offsetX;
      blocks[i].y = size * Math.floor(i/3) + offsetY;
      blocks[i].no= getRandomNumber();
      var filename = 'images/' + blocks[i].no + '.png';
      blocks[i].image = game.assets[filename];
      var scl = 0.9;
      blocks[i].scaleX = scl;
      blocks[i].scaleY = scl;
    }

    //touch event
    var whenTouch = function(){
      if(this.no == answerNo){
        this.image = game.assets['images/0.png']; //hit!
        answerNo += 1;
        if(answerNo==10){//clear
          reload();
        }
      }
    };

    for(i=0; i<blocks.length; i++){
      blocks[i].addEventListener('touchstart', whenTouch);
    }

    var sakurairo = 'rgb(254,238,237)';
    var gray = 'rgb(50,50,50)';
    game.rootScene.backgroundColor = gray;

    //game scene
    var stage = new Group();
    for(i=0; i<blocks.length; i++){
      stage.addChild(blocks[i]);
    }
    stage.addChild(start);
    stage.addChild(end);
    initGame();

    game.rootScene.addChild(stage);
  };
  game.start();
};
