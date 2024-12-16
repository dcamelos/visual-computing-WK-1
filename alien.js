
class Alien{
    constructor(){


        this.pos = createVector(windowWidth/3 , windowHeight - 30);
        this.r = 40;
        //this.vel = this.normalize(createVector(windowWidth/3, -windowHeight));
        //this.vel.mult(4.5);

   }

    show(){
        push();
        translate(this.pos.x, this.pos.y);
        this.shape(- this.r,0,                  //x1
            - this.r * 0.33, this.r * 0.33,     //x2
            this.r * 0.33, this.r * 0.33,       //x3
            this.r , 0,                         //x4
            this.r * 0.33, - this.r * 0.33,     //x5
            - this.r * 0.33, - this.r * 0.33,   //x6
            - this.r * 0.166, -this.r *0.66,    //x7
            this.r * 0.166, -this.r *0.66);     //x8
        pop();
    }

    update(){
        //this.pos.add(this.vel);
    }

    paths(x){
        // 8 different options, we have to normalize


    }

    edges(){
        // Edges should remove the alien
    }


    normalize(v){
        var length = (v.x*v.x + v.y*v.y) ** 0.5;
        v.x = v.x / length;
        v.y = v.y / length;
        return v
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
