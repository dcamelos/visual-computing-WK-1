class Ship{
    constructor(){
        this.pos = createVector(windowWidth/2, windowHeight/2);
        this.r = 20;
        this.heading = 0;
        this.rotation = 0;
        this.vel = createVector(0,0);
        this.acc = createVector(0,0);
        this.isBoosting = false;


   }

    show(){
        push();
        translate(this.pos.x, this.pos.y);
        this.shape(0,
                    - this.r,
                    - this.r * 0.65,
                    + this.r,
                    + this.r * 0.65,
                    + this.r,
                    this.r * 1.90,
                    this.r * 0.75);
        pop();
    }

    update(){
        if (this.isBoosting) {
            this.boost();
        }
        this.turn();
        this.pos.add(this.vel);
        this.vel.mult(0.93);
        this.edges();
    }

    boost(){
        var force = p5.Vector.fromAngle(this.heading);
        force.mult(0.5);
        this.vel.add(force);
    }


    boosting(b){
        this.isBoosting = b;
    }

    turn(){
        this.heading += this.rotation;
    }


    setRotation(angle){
        this.rotation = angle;
    }

    hits(asteroid){
        var d=dist(this.pos.x, this.pos.y,
            asteroid.pos.x, asteroid.pos.y)
        if (d < this.r + asteroid.r){
            collisionSound.play();
            return true;
        }else{
            return false;
        }

    }


    edges(){
        if (this.pos.x > windowWidth + this.r){
            this.pos.x = - this.r;
        }
        else if (this.pos.x < -this.r){
            this.pos.x = windowWidth + this.r;
        }
        if (this.pos.y > windowHeight+ this.r){
            this.pos.y = - this.r;
        }
        else if (this.pos.y < -this.r){
            this.pos.y = windowHeight + this.r;
        }
    }




    shape(x1, y1, x2, y2, x3, y3){
        /* Pinta la forma de nuestra nave

        Mirando hacia arriba,
        x1 es la punta de la nave
        x2 es el punto abajo a la izquierda
        x3 es el punto abajo a la derecha

        */

        rotate(this.heading + PI/2);
        let arcCenter = createVector((x2 + x3)/2, (y2 + y3)/2);
        stroke(255);
        noFill();
        line(x1, y1, x2, y2);
        line(x1, y1, x3, y3);
        arc(arcCenter.x, arcCenter.y, x3 - x2, this.r * 0.65, PI, 0);
    }


}
