window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
var canvas = document.getElementById('banana-canvas');
var ctx = canvas.getContext('2d');

var lastTime = (new Date()).getTime();
var currentTime = 0;
var delta = 0;

var bg = new Image();
var bgReady = false;
bg.src = "/img/bg.png";
bg.onload = function(){
  bgReady = true;
};

var render = function() {
  if(bgReady) {
    ctx.drawImage(bg, 0, 0);
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
