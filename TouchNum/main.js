enchant();
var game, stage;
var count = 1;

var gs = {
  width:128*3,
  height:128*3+10,
  fps:10
};

var numArray = [1,2,3,4,5,6,7,8,9];

gameStart = function(numArray){
  var shuffle = ~~(Math.random() * 10);
  for(i = 0; i < shuffle; i++){
    var rand1 = ~~(Math.random() * 9);
    var rand2 = ~~(Math.random() * 9);
    var temp = numArray[rand1];
    numArray[rand1] = numArray[rand2];
    numArray[rand2] = temp;
  }
  for(i = 0; i < numArray.length; i++){
    new Panel(128, 128, i, numArray[i]);
  }
}

timeLabel = Class.create(Label, {
  initialize:function(){
    enchant.Label.call(this);
    this.moveTo(0,128*3);
    this.text = "Time : 00";
    this.color = "black";
    this.addEventListener('enterframe', this.currentTime); 
    stage.addChild(this);
  },
  currentTime:function(){
    this.text = "Time : " + parseInt(game.frame/game.fps);
  }
});

Panel = Class.create(Sprite, {
  initialize:function(width, height, i, num){
    enchant.Sprite.call(this, width, height);
    this.position = {x:i % 3 * 128, y:~~(i / 3) * 128};
    this.moveTo(this.position.x, this.position.y);
    var sur = new Surface(width, height);
    this.AnswerPane = num;
    this.addEventListener('touchstart',this.touch);
    this.image = game.assets['images/' + num + '.png'];
    
    stage.addChild(this);
    
  },
  
  touch:function(){
    if(count == this.AnswerPane){
      this.image = game.assets['images/0.png'];
      count++;
      if(count == 10){
        alert("経過時間：" + parseInt(game.frame/game.fps) + "秒");
        location.reload();
      }
    };
  }

});

window.onload = function(){
  game = new Core(gs.width,gs.height);
  game.fps = gs.fps;
  game.preload('images/0.png',
               'images/1.png',
               'images/2.png',
               'images/3.png',
               'images/4.png',
               'images/5.png',
               'images/6.png',
               'images/7.png',
               'images/8.png',
               'images/9.png');

  stage = game.rootScene;

  game.onload = function(){
    gameStart(numArray);
    var timer = new timeLabel();

  };
  game.start();
};
