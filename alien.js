
class Alien{
    constructor(){


        this.size = this.determineSize();
        this.defineStart = Math.floor(Math.random() * 4);
        this.timeToSpawn = Math.floor(Math.random() * 200) + 300 ;
        //this.timeToSpawn = 0; //for testing
        this.isFirstTime = true;
        this.isActive = false;
        this.timeToChangeDirection = 100;
        this.pos = this.determineStart();
        this.vel = createVector(0,0);
        this.velMultiplier = 4;

   }

    show(){
        push();
        translate(this.pos.x, this.pos.y);
        this.shape(- this.size,0,                  //x1
            - this.size * 0.33, this.size* 0.33,     //x2
            this.size* 0.33, this.size* 0.33,       //x3
            this.size, 0,                         //x4
            this.size* 0.33, - this.size* 0.33,     //x5
            - this.size* 0.33, - this.size* 0.33,   //x6
            - this.size* 0.166, -this.size*0.66,    //x7
            this.size* 0.166, -this.size*0.66);     //x8
        pop();
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
            this.moveAlien(this.isFirstTime)
        }

        this.pos.add(this.vel);
        this.edges();

        
    }
    moveAlien(flag){
        if (flag == true){

            if (this.defineStart == 0 || this.defineStart == 1){
                this.vel.x = 1;
            }

            else if (this.defineStart == 2 || this.defineStart == 3){
                this.vel.x = -1;
            }
            this.pos.add(this.vel);

            this.timeToChangeDirection -= 1;

            if (this.timeToChangeDirection <= 0){

                this.isFirstTime = false;
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
        direction = p5.Vector.fromAngle(direction);
        direction.mult(this.velMultiplier);
        this.vel = direction;
        this.timeToChangeDirection = 100;
        }
    this.timeToChangeDirection -= 1;
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
            y = createVector(-this.size,  this.size);
            return y;
        }
        else if (this.defineStart == 1){
            //start bottom left
            y = createVector(-this.size,  windowHeight - this.size);
            return y;
        }

        else if (this.defineStart == 2){
            //start top right
            y = createVector(windowWidth + this.size,  this.size);
            return y;
        }

        else if (this.defineStart  == 3){
            //start bottom right
            y = createVector(windowWidth + this.size,  windowHeight - this.size);
            return y;
        }
    }



    edges(){
        // Horizontal edges should remove the alien
        if (this.pos.x > windowWidth + this.size){
        }
        else if (this.pos.x < -this.size){
        }
        if (this.pos.y > windowHeight+ this.size){
            this.pos.y = - this.size;
        }
        else if (this.pos.y < -this.size){
            this.pos.y = windowHeight + this.size;
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
