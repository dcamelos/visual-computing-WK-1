var ship;
var alien;
var lasers =[];
var laserSound;
var asteroids = [];

function preload() {
  laserSound = loadSound('audio/laser.wav');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  ship = new Ship();
  alien = new Alien();
  for (let i = 0; i < 5; i++) {
    asteroids.push(new Asteroid());
  }
}

function draw() {
  background(0);
  ship.show();
  ship.update();
  alien.show();
  alien.update();

  for (var i = lasers.length - 1 ; i  >= 0; i--){
    lasers[i].render();
    lasers[i].update();
    /*if (lasers[i].offScreen()) {
      lasers.splice(i, 1);
    }*/

    /*for(var j =asteroids.length - 1; j >= 0; j--){
      if (lasers[i].hits(asteroids[j])){
          var newAsteroids = asteroids[j].breakup();
      asteroids = asteroids.concat(newAsteroids);
      asteroids.splice(j,1);
      lasers.splice(i,1);
      break;

          }
    }*/
  }
  for (let i = asteroids.length - 1; i >= 0; i--) {
        asteroids[i].update();
        asteroids[i].show();
        asteroids[i].edges();
    }
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
  if (key == ' '){
    lasers.push(new Laser(ship.pos, ship.heading));

    if (!laserSound.isPlaying()) {
      laserSound.play();
    }


  }if (keyCode == RIGHT_ARROW){
    if (keyIsDown(LEFT_ARROW) == false){
      ship.setRotation(PI/50);
    }

  }if (keyCode == LEFT_ARROW){
    if (keyIsDown(RIGHT_ARROW) == false){
      ship.setRotation(-PI/50);
    }

  }if (keyCode == UP_ARROW){
    ship.boosting(true);

  }
}
