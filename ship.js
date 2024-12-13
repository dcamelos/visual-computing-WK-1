class Ship{
    constructor(){
        this.pos = createVector(windowWidth/2, windowHeight/2);
        this.r = 20;
   }

    show(){
        this.shipShape(this.pos.x + 0, 
                    this.pos.y - this.r, 
                    this.pos.x - this.r * 0.65, 
                    this.pos.y + this.r, 
                    this.pos.x + this.r * 0.65, 
                    this.pos.y + this.r, 
                    this.r * 1.90, 
                    this.r * 0.75);
    }

    update(){

    }


    shipShape(x1, y1, x2, y2, x3, y3, w, h){
        /* Pinta la forma de nuestra nave
        
        Mirando hacia arriba, 
        x1 es la punta de la nave
        x2 es el punto abajo a la izquierda
        x3 es el punto abajo a la derecha
        
        */
        let arcCenter = createVector((x2 + x3)/2, (y2 + y3)/2);
        stroke(255);
        fill(255);
        strokeWeight(2);
        noFill();
        line(x1, y1, x2, y2);
        line(x1, y1, x3, y3);
        arc(arcCenter.x, arcCenter.y, x3 - x2, this.r * 0.65, PI, 0);
    }

}