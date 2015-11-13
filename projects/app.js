//initial position
var STEP_X = 202;
var STEP_Y = 304;
var STEP_LEFT_RIGHT = 10;
var STEP_UP_DOWN = 10;


var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 508;//606
canvas.height = 505;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
  bgReady = true;
};
bgImage.src = "images/w.png";


// hero
var heroReady = false;
var heroImage = new Image();
  heroImage.onload = function() {
    heroReady = true;
  };
heroImage.src = "images/char-cat-girl.png"

//gem
var gemReady = false;
var gemImage = new Image();
  gemImage.onload = function() {
    gemReady = true;
  };
gemImage.src = "images/gem.png"
gemscount = 0;

//enemy
var enemyReady = false;
var enemyImage = new Image();
enemyImage.onload = function () {
  enemyReady = true;
};
enemyImage.src = "images/enemy-bug.png";

var enemy = {};
var gem = {};

var hero = {
};

// handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
  keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
  delete keysDown[e.keyCode];
}, false);

//random integer number
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
gems = []
//initial position of enemy, hero and gems
var reset = function() {
  gems = [];
  hero.x = STEP_X;
  hero.y = STEP_Y;
  enemy.x = 32 + (Math.random() * (canvas.width - 64));
  enemy.y = (Math.random() * (canvas.height - 300));

  for(var i = 1; i < getRandomInt(1,4); i++)
  {
    gem.x = 32 + (Math.random() * (canvas.width - 64));
    gem.y = 90+ (Math.random() * (canvas.height - 300));
    gems.push(gem.x);
    gems.push(gem.y);
  }
}
//20 180
var update = function() {
  if (37 in keysDown && hero.x - STEP_LEFT_RIGHT >= 0)
    hero.x -= STEP_LEFT_RIGHT;
  if (38 in keysDown&& hero.y - STEP_UP_DOWN >= -71)
    hero.y -= STEP_UP_DOWN;
  if (39 in keysDown && hero.x + STEP_LEFT_RIGHT < 405)
    hero.x += STEP_LEFT_RIGHT;
  if (40 in keysDown && hero.y + STEP_UP_DOWN < 357)
    hero.y += STEP_UP_DOWN;

// check that hero inside game field
  if (hero.y - STEP_UP_DOWN <= -72) {
    reset();
  };

//to check the intersection of hero and enemy
  if (hero.x < (enemy.x + 35)
    && enemy.x <= (hero.x +35)
    && hero.y <= (enemy.y + 35)
    && enemy.y <= (hero.y + 35))
  {
    if (gemscount > 0)
    {
      gemscount -= 5;
    }
    reset();

  }
  //to check the intersection of hero and gem
  for (var k = 0; k < gems.length; k += 2) {
    if (hero.x <= (gems[k] + 15)
      && gems[k] <= (hero.x +15)
      && hero.y <= (gems[k+1] + 35)
      && gems[k+1] <= (hero.y + 35))
    {

        gemscount += 5 ;
        gems.splice(k,2)
        render();
    }
  };
};


var render = function() {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }

  if (heroReady) {
    ctx.drawImage(heroImage, hero.x, hero.y);
  }
  if (enemyReady) {
    ctx.drawImage(enemyImage, enemy.x, enemy.y);
  }
  if (gemReady) {
    if (gems.length > 1) {
      for(var j = 0; j < gems.length; j += 2)
      ctx.drawImage(gemImage, gems[j], gems[j + 1]);
  };
  }
  // Score
ctx.fillStyle = "rgb(250, 250, 250)";
ctx.font = "24px Helvetica";
ctx.textAlign = "left";
ctx.textBaseline = "top";
ctx.fillText("Score: " + gemscount, 32, 32);
};


var main = function() {
  var now = Date.now();
  var delta = now - then;

  update();
  render();

  then = now;

   requestAnimationFrame(main);
}

var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();

