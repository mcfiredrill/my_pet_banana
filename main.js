// Returns a random integer between min and max
// // Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function getBananaBoundingBox(banana) {
  var coords = {};
  coords.x1 = banana.x;
  coords.x2 = banana.x+banana.image.width;
  coords.y1 = banana.y;
  coords.y2 = banana.y+banana.image.height;
  return coords;
}

function bananaHit(mouse, bananaCoords) {
  return mouse.x > bananaCoords.x1 && mouse.x < bananaCoords.x2 && mouse.y > bananaCoords.y1 && mouse.y < bananaCoords.y2;
}

function eatBanana(banana){
  console.log(banana);
  if(banana.state == 'unopened'){
    banana.state = 'beingEaten';
    banana.image = beingEatenBananas[banana.eatenProgress].image;
  }else{
  }
}

/* GLOBALZ */
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
var canvas = document.getElementById('banana-canvas');
var ctx = canvas.getContext('2d');
var cw = canvas.width;
var ch = canvas.height;

var lastTime = (new Date()).getTime();
var currentTime = 0;
var delta = 0;

var mouseClicked = false;
var mousePos;

/* */

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
  mousePos = getMousePos(canvas, e);
  mouseClicked = true;
});

var handleInput = function() {
  if(mouseClicked){
    console.log('mouse clicked dude');
    mouseClicked = false;
    console.log(mousePos.x);
    console.log(mousePos.y);
    for(var i = 0; i < bananas.length; i += 1) {
      var coords = getBananaBoundingBox(bananas[i]);
      console.log(coords);
      if(bananaHit(mousePos, coords)){
        console.log("banana hit for banana["+i+"]!");
        eatBanana(bananas[i]);
      }
    }
  }
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

  update();

  lastTime = currentTime;
};

gameLoop();
