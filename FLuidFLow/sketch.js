const w = 10;
let cols, rows;
let flowField;
let offsetX = 0;
let offsetY = 1000;
let change = 0.01;
let mover;
let vel;
let accMag = 2;

function setup() {
    createCanvas(400, 400);
    cols = floor(width / w);
    rows = floor(height / w);
    
    mover = createVector(width/2, height/2);
    vel = p5.Vector.random2D();

    // The initial flow field
    flowField = []; 
    for(let i = 0; i < rows; i++) {
        flowField[i] = [];
        offsetX += change;
        for (let j = 0; j < cols; j++) {
            offsetY += change; 
            const angle = map(noise(offsetX, offsetY), 0, 1, 0, TWO_PI);
           
            //flowField[i][j] = p5.Vector.random2D();
            flowField[i][j] = p5.Vector.fromAngle(angle);
            flowField[i][j].mult(accMag);
        }
    }
    //console.log(flowField);
    //noLoop(); 
}

function draw() {
    background(0);
    offsetX = 0;
    offsetY = 1000;
    
    for(let i = 0; i < rows; i++) {
        offsetX += change;
        for (let j = 0; j < cols; j++) {
            offsetY += change; 
            /*const angleX = map(noise(offsetX + frameCount * change), 0, 1, 0, TWO_PI);
            const angleY = map(noise(offsetY + frameCount * change), 0, 1, 0, TWO_PI);
            const angle = angleX + angleY; */ 
            
            const angle = map(noise(offsetX + frameCount * change, offsetY + frameCount * change), 0, 1, 0, TWO_PI); 
            flowField[i][j].setHeading(angle);
        }
    }
    //frameRate(5);
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const x = w * j;
            const y = w * i;
            const diffX = abs(mover.x - x);
            const diffY = abs(mover.y - y);
            /*if (diffX < w && diffY < w) {
                fill(255, 0, 0);
                circle(x, y, 10); 
                mover.add(flowField[floor(x/w)][floor(y/w)]); 
            }*/
          if (intersect(mover, x, y, w)) {
                mover.add(flowField[floor(x/w)][floor(y/w)]);
                //fill(255, 0, 0);
                //circle(x, y, 10);
                //vel = flowField[floor(x/w)][floor(y/w)].copy();
            } 
        }
    }
  
    mover.add(vel);
    screenWrap();
 
    fill(0, 255, 0);
    noStroke();
    circle(mover.x, mover.y, 5);
    
    noFill();
    stroke(255);
    strokeWeight(0.7); 
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const x = w * j;
            const y = w * i;
            //rect(x, y, w, w);
            push();
            translate(x + w/2, y + w/2);
            rotate(flowField[i][j].heading());
            drawArrow(w/4);
            //line(-w/3, 0, w/3, 0); 
            pop();
        }
    }
}

function screenWrap() {
    if (mover.x > width) mover.x = 20;
    if (mover.x < 0) mover.x = width - 20;
    if (mover.y > height) mover.y = 20;
    if (mover.y < 0) mover.y = height - 20;
}

function drawArrow(len) {
    line(-len, 0, len, 0);
    triangle(len, -len / 2, 1.5*len, 0, len, len / 2); 
}

function intersect(v, x, y, w) {
    return (v.x >= x) && (v.x <= x + w) && (v.y >= y) && (v.y <= y + w); 
}

class Mover {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = p5.Vector.random2D();
        this.acc = createVector();
    }
    
    show() {
        fill(0, 255, 0);
        noStroke();
        circle(this.pos.x, this.pos.y, 5);
    }

    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
    }
}
