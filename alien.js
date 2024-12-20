
class Alien{
    constructor(){
        this.restartValues();  
   }
    restartValues(){
        //basically the constructor but is callable
        this.r = this.determineSize();
        this.defineStart = Math.floor(Math.random() * 4);
        this.timeToSpawn = Math.floor(Math.random() * 300) + 500 ;
        //this.timeToSpawn = 0; //for testing
        this.isFirstTimeInScreen = true;
        this.isActive = false;
        this.timeToChangeDirection = 100;
        this.pos = this.determineStart();
        this.vel = createVector(0,0);
        this.heading = 0;
        this.velMultiplier = 4;
    }

    show(){
        if (this.isActive == true){
            push();
            translate(this.pos.x, this.pos.y);
            this.shape(- this.r,0,                  //x1
                - this.r * 0.33, this.r* 0.33,     //x2
                this.r* 0.33, this.r* 0.33,       //x3
                this.r, 0,                         //x4
                this.r* 0.33, - this.r* 0.33,     //x5
                - this.r* 0.33, - this.r* 0.33,   //x6
                - this.r* 0.166, -this.r*0.66,    //x7
                this.r* 0.166, -this.r*0.66);     //x8
            pop();
        }

    }

    update(){
        if (this.isActive == false){
            this.timeToSpawn -= 1;
            if (this.timeToSpawn <= 0){
                this.isActive = true;
            }
        }
        else {
            //define movement
            this.moveAlien(this.isFirstTimeInScreen)
        }

        this.pos.add(this.vel);
        this.edges();

        
    }

    moveAlien(flag){
        if (flag == true){

            if (this.defineStart == 0 || this.defineStart == 1){
                this.vel.x = 1;
                this.heading = 0;
            }

            else if (this.defineStart == 2 || this.defineStart == 3){
                this.vel.x = -1;
                this.heading = PI;
            }
            this.pos.add(this.vel);

            this.timeToChangeDirection -= 1;

            if (this.timeToChangeDirection <= 0){

                this.isFirstTimeInScreen = false;
            }
        }
        else{
            this.setPath();
            
        }

    }

    setPath(){
    var direction = 1;
    if (this.timeToChangeDirection <= 0){
        //Only enters to change direction and set new velocity.
        if (this.defineStart == 0 || this.defineStart == 1){
            direction = (Math.random() * (5*PI/7) - (5*PI/14)); //mucha matematica
        }
        else if (this.defineStart == 2 || this.defineStart == 3){
            direction = Math.random() * (5*PI/7) - (5*PI/14) + PI ;
        }
        this.heading = direction;
        direction = p5.Vector.fromAngle(direction);
        direction.mult(this.velMultiplier);
        this.vel = direction;
        this.timeToChangeDirection = 100;
        }
    this.timeToChangeDirection -= 1;
    }

    hits(asteroid){
        if (this.isActive == true){
            var d=dist(this.pos.x, this.pos.y,
                asteroid.pos.x, asteroid.pos.y)
            if (d < this.r + asteroid.r){
                collisionSound.play();
                return true;
            }else{
                return false;
            }
        }
    }

    determineSize(){
        var x = Math.floor(Math.random() * 5);
        if(x == 0){
            return 20;
        }
        else{
            return 40;
        }
    }

    determineStart(){
        var y;
        if (this.defineStart == 0){
            //start top left
            y = createVector(-this.r,  this.r);
            return y;
        }
        else if (this.defineStart == 1){
            //start bottom left
            y = createVector(-this.r,  windowHeight - this.r);
            return y;
        }

        else if (this.defineStart == 2){
            //start top right
            y = createVector(windowWidth + this.r,  this.r);
            return y;
        }

        else if (this.defineStart  == 3){
            //start bottom right
            y = createVector(windowWidth + this.r,  windowHeight - this.r);
            return y;
        }
    }



    edges(){
        // Horizontal edges should remove the alien
        if (this.pos.x > windowWidth + this.r){
            //alien cannot spawn if level is complete
            this.restartValues();
        }
        else if (this.pos.x < -this.r){
            this.restartValues();
        }
        if (this.pos.y > windowHeight+ this.r){
            this.pos.y = - this.r;
        }
        else if (this.pos.y < -this.r){
            this.pos.y = windowHeight + this.r;
        }
        
    }


    shape(x1, y1, x2, y2, x3, y3, x4, y4, x5, y5, x6, y6, x7, y7, x8, y8){
        /* Pinta la forma de la nave alienigena. */


        stroke(255);
        fill(255);
        line(x1, y1, x2, y2);
        line(x2, y2, x3, y3);
        line(x3, y3, x4, y4);
        line(x1, y1, x4, y4);
        line(x4, y4, x5, y5);
        line(x5, y5, x6, y6);
        line(x6, y6, x1, y1);
        line(x6, y6, x7, y7);
        line(x7, y7, x8, y8);
        line(x8, y8, x5, y5);

    }


}
