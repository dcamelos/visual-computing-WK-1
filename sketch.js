var ship;

function setup() {
  createCanvas(windowWidth, windowHeight);
  ship = new Ship();
}

function draw() {
  background(0);
  ship.show();
  ship.update();
}

function keyReleased() {
    ship.setRotation(0);
    ship.boosting(false)
}

function keyPressed() {
  if (keyCode == RIGHT_ARROW){
      ship.setRotation(0.1);
  }
  if (keyCode == LEFT_ARROW){
      ship.setRotation(-0.1);
  }
  if (keyCode == UP_ARROW){
    ship.boosting(true);
  }
}