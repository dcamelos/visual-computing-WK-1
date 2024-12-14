var ship;
var lasers =[];

function setup() {
  createCanvas(windowWidth, windowHeight);
  ship = new Ship();
}

function draw() {
  background(0);
  ship.show();
  ship.update();

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

}


function keyReleased() {
    ship.setRotation(0);
    ship.boosting(false)
}

function keyPressed() {
  if (key == ' '){
    lasers.push(new Laser(ship.pos, ship.heading));
  }else if (keyCode == RIGHT_ARROW){
      ship.setRotation(0.1);

  }else if (keyCode == LEFT_ARROW){
      ship.setRotation(-0.1);

  }else if (keyCode == UP_ARROW){
    ship.boosting(true);

  }
}