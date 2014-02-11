// Returns a random integer between min and max
// // Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
var canvas = document.getElementById('banana-canvas');
var ctx = canvas.getContext('2d');
var cw = canvas.width;
var ch = canvas.height;

var lastTime = (new Date()).getTime();
var currentTime = 0;
var delta = 0;

// bg
var bg = new Image();
var bgReady = false;
bg.src = "/img/bg.png";
bg.onload = function(){
  bgReady = true;
};

// bananas
var bananaStates = ['unopened', 'beingEaten', 'eaten'];
var uneatenBananas = [{imageFilename: '/img/banana1.png', ripeness: 1, ready: false},
                      {imageFilename: '/img/banana2.png', ripeness: 2, ready: false},
                      {imageFilename: '/img/banana3.png', ripeness: 3, ready: false},
                      {imageFilename: '/img/banana4.png', ripeness: 4, ready: false},
                      {imageFilename: '/img/banana5.png', ripeness: 5, ready: false},
                      {imageFilename: '/img/banana6.png', ripeness: 6, ready: false}
                     ];
var beingEatenBananas = [{imageFilename: '/img/eat1.png', eatenness: 1, ready: false},
                         {imageFilename: '/img/eat2.png', eatenness: 2, ready: false},
                         {imageFilename: '/img/eat3.png', eatenness: 3, ready: false},
                         {imageFilename: '/img/eat4.png', eatenness: 4, ready: false}
                        ];

for (var i = 0; i < uneatenBananas.length; i += 1){
  var banana = uneatenBananas[i];
  banana.image = new Image();
  banana.image.src = banana.imageFilename;
}

for (var i = 0; i < beingEatenBananas.length; i += 1){
  var banana = beingEatenBananas[i];
  banana.image = new Image();
  banana.image.src = banana.imageFilename;
}

var Banana = function(ripeness_level, x, y) {
  this.state = 'unopened';
  this.ripeness = ripeness_level;
  this.image = uneatenBananas[ripeness_level].image;
  this.beingEaten = false;
  this.eatenProgress = 0;
  this.x = x;
  this.y = y;
};

var bananas = [];
for(var i = 0; i < 10; i += 1) {
  var ripeness_level = getRandomInt(0,uneatenBananas.length-1);
  console.log(ripeness_level);
  var x = getRandomInt(0,cw);
  var y = getRandomInt(0,ch);
  bananas.push(new Banana(ripeness_level, x, y));
}

canvas.addEventListener('click', function(e) {
  var mousePos = getMousePos(canvas, e);
});

var handleInput = function() {
};

var update = function() {
  handleInput();
};

var render = function() {
  if(bgReady) {
    ctx.drawImage(bg, 0, 0);
  }
  for(var i = 0; i < bananas.length; i += 1) {
    ctx.drawImage(bananas[i].image, bananas[i].x, bananas[i].y);
  }
};

// main game loop
var gameLoop = function() {
  window.requestAnimationFrame(gameLoop);
  currentTime = (new Date()).getTime();
  delta = (currentTime - lastTime) / 1000;

  render();

  lastTime = currentTime;
};

gameLoop();
