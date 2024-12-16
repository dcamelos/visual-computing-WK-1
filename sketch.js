var ship;
var lasers =[];
var laserSound;
var asteroids = [];

function preload() {
  laserSound = loadSound('audio/laser.wav');
  hitSound = loadSound('audio/hit.m4a');
  collisionSound = loadSound ('audio/bang_lg.wav');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  ship = new Ship();
  for (let i = 0; i < 5; i++) {
    asteroids.push(new Asteroid());
  }
}

function draw() {
  background(0);
  ship.show();
  ship.update();

  for (var i = lasers.length - 1 ; i  >= 0; i--){
    lasers[i].render();
    lasers[i].update();
    for(var j =asteroids.length - 1; j >= 0; j--){
      if (lasers[i].hits(asteroids[j])){
        if (asteroids[j].r>20){
          var newAsteroids = asteroids[j].breakup();
          asteroids = asteroids.concat(newAsteroids);
        }
          asteroids.splice(j,1);
          lasers.splice(i,1);
          break;

          }
    }
    if (lasers[i].offscreen()){
      lasers.splice(i,1);
    }
  }

  for (var i = lasers.length - 1; i >= 0; i--){

    lasers[i].render();
    lasers[i].update();
    if (lasers[i] && lasers[i].offscreen()){
      lasers.splice(i, 1);
    }else{

    for(var j = asteroids.length - 1; j >= 0; j--){
      if (lasers[i].hits(asteroids[j])){
        if (asteroids[j].r > 20){
          var newAsteroids = asteroids[j].breakup();
          asteroids = asteroids.concat(newAsteroids);
        }
        asteroids.splice(j, 1);
        lasers.splice(i, 1);
        break;
      }
    }}
  }

  for (let i = asteroids.length - 1; i >= 0; i--) {
        if (ship.hits(asteroids[i])){
          console.log('opps');

        }
        asteroids[i].update();
        asteroids[i].show();
        asteroids[i].edges();
    }
}


function keyReleased() {
    ship.setRotation(0);
    ship.boosting(false)
}

function keyPressed() {
  if (key == ' '){
    lasers.push(new Laser(ship.pos, ship.heading));

    if (!laserSound.isPlaying()) {
      laserSound.play();
    }


  }else if (keyCode == RIGHT_ARROW){
      ship.setRotation(0.1);

  }else if (keyCode == LEFT_ARROW){
      ship.setRotation(-0.1);

  }else if (keyCode == UP_ARROW){
    ship.boosting(true);

  }
}
