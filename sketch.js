var ship;
var alien;
var lasers =[];
var alienLasers = [];
var alienLaserCooldown;
var laserSound;
var asteroids = [];
var  gameFont;
var gameState = "MENU";
var score = 0;

function preload() {
  laserSound = loadSound('audio/laser.wav');
  hitSound = loadSound('audio/hit.m4a');
  collisionSound = loadSound ('audio/bang_lg.wav');
  gameFont = loadFont('Fonts/PressStart2P-Regular.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  ship = new Ship();
  alien = new Alien();
  alienLaserCooldown = 60;
  for (let i = 0; i < 5; i++) {
    asteroids.push(new Asteroid());
  }
}

function draw() {
  background(0);
   if (gameState === "MENU") {
    drawMenu();
  } else if (gameState === "PLAYING") {
    playGame();
  } else if (gameState === "GAMEOVER") {
    drawGameOver();
  }
}


function playGame(){
  ship.show();
  ship.update();
  alien.show();
  alien.update();

  for (var i = lasers.length - 1 ; i  >= 0; i--){
    lasers[i].render();
    lasers[i].update();

    if (lasers[i] && lasers[i].offscreen()){
      lasers.splice(i, 1);

    }else if (alien.isActive && lasers[i].hits(alien)) {
      score += 30
      hitSound.play();
      alien.restartValues();
      lasers.splice(i, 1);
    }else{
    for(var j = asteroids.length - 1; j >= 0; j--){
      if (lasers[i].hits(asteroids[j])){
        score += 10
        if (asteroids[j].r > 20){
          var newAsteroids = asteroids[j].breakup();
          asteroids = asteroids.concat(newAsteroids);
        }
        asteroids.splice(j, 1);
        lasers.splice(i, 1);
        break;
        }
      }
    }
  }

  if (ship.hits(alien)) {
    gameState = "GAMEOVER";
    console.log('opps');
  }

  for (let i = asteroids.length - 1; i >= 0; i--) {
    if (ship.hits(asteroids[i])){
      gameState = "GAMEOVER";
      console.log('opps');
    }
    if (alien.hits(asteroids[i])){
      alien.restartValues();
    }
    asteroids[i].update();
    asteroids[i].show();
    asteroids[i].edges();
  }

  if (alien.isActive == true){
  if (alienLaserCooldown <= 0){
    var direction = createVector(ship.pos.x - alien.pos.x, ship.pos.y - alien.pos.y);
    var angle = Math.atan(direction.y/direction.x);   //radians
    if (ship.pos.x <= alien.pos.x){
      if(ship.pos.y > alien.pos.y){
        angle += PI;
      }
      else if(ship.pos.y <= alien.pos.y){
        angle -= PI;
      }
    }

    alienLasers.push(new Laser(alien.pos, angle));

    if (!laserSound.isPlaying()) {
      laserSound.play();
    }
    alienLaserCooldown = 60;
  }
  else{
    alienLaserCooldown -= 1;
  }
  }



  for (var i = alienLasers.length - 1 ; i  >= 0; i--){
    alienLasers[i].render();
    alienLasers[i].update();
    if (alienLasers[i].hits(ship)){
      gameState = "GAMEOVER";
      console.log('opps');
    }
    if (alienLasers[i] && alienLasers[i].offscreen()){
      alienLasers.splice(i, 1);
    }else{

    for(var j = asteroids.length - 1; j >= 0; j--){
      if (alienLasers[i].hits(asteroids[j])){
        if (asteroids[j].r > 20){
          var newAsteroids = asteroids[j].breakup();
          asteroids = asteroids.concat(newAsteroids);
        }
        asteroids.splice(j, 1);
        alienLasers.splice(i, 1);
        break;
      }
    }}
  }

   drawScore();
}


function keyReleased() {
    if (keyIsDown(UP_ARROW) && (keyIsDown(LEFT_ARROW) == false || keyIsDown(RIGHT_ARROW) == false)){
      ship.setRotation(0);
    }
    else if (keyIsDown(UP_ARROW) == false && (keyIsDown(LEFT_ARROW)|| keyIsDown(RIGHT_ARROW))){
      ship.boosting(false);
    }
    else if (keyIsDown(UP_ARROW) == false&& (keyIsDown(LEFT_ARROW) == false || keyIsDown(RIGHT_ARROW) == false)){
      ship.setRotation(0);
      ship.boosting(false);
    }
}

function keyPressed() {

  if (gameState === "MENU" && keyCode === ENTER) {
    startGame();
  } else if (gameState === "GAMEOVER" && keyCode === ENTER) {
    resetGame();
  } else if (gameState === "PLAYING")
  if (key == ' '){
    lasers.push(new Laser(ship.pos, ship.heading));

    if (!laserSound.isPlaying()) {
      laserSound.play();
    }


  }if (keyCode == RIGHT_ARROW){
    if (keyIsDown(LEFT_ARROW) == false){
      ship.setRotation(PI/36);
    }

  }if (keyCode == LEFT_ARROW){
    if (keyIsDown(RIGHT_ARROW) == false){
      ship.setRotation(-PI/36);
    }

  }if (keyCode == UP_ARROW){
    ship.boosting(true);

  }
}



function drawMenu() {

  background(0);
  for (let i = asteroids.length - 1; i >= 0; i--) {
    asteroids[i].update();
    asteroids[i].show();
    asteroids[i].edges();
  }
  fill(255);
  textFont( gameFont);
  textAlign(CENTER);
  textSize(32);
  text("ASTEROIDS", width / 2, height / 2 - 40);
  textSize(16);
  text("Press      to start", width / 2, height / 2 + 20);
  if (frameCount % 30 < 15) { 
  text("ENTER ", width / 2 -15, height / 2 + 20);
}
}


function drawGameOver() {
  fill(255);
  textFont( gameFont);
  textAlign(CENTER);
  textSize(32);
  text("GAME OVER", width / 2, height / 2 - 40);
  textSize(16);
  text(`Final Score: ${score}`, width / 2, height / 2);
  text("Press ENTER to Return to Menu", width / 2, height / 2 + 40);
}


function drawScore() {
  fill(255);
  textFont( gameFont); 
  textAlign(LEFT);
  textSize(16);
  text(`Score: ${score}`, 10, 20);
}

function startGame() {
  gameState = "PLAYING";
  score = 0;
  ship = new Ship(); 
  asteroids = []; 
  alien = new Alien();
  lasers = []; 
  alienLasers =[];
  for (let i = 0; i < 5; i++) {
    asteroids.push(new Asteroid());
  }
}
function resetGame() {
  gameState = "MENU";
}
