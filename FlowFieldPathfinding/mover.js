class Mover {
    constructor(flowField, x, y, speed, target) {
        this.flowField = flowField;
        this.target = target;
        this.speed = speed;
        this.pos = createVector(x, y);
        this.vel = createVector(this.speed, 0);
        this.r = 5; 
        this.maxDist = this.pos.dist(this.target);
    }

    update() {
        this.pos.add(this.vel);
    }

    show() {
        fill(255, 0, 255);
        noStroke();
        circle(this.pos.x, this.pos.y, this.r * 2);
    }

    setVel() {
       const i = floor(this.pos.y / w); 
       const j = floor(this.pos.x / w);
       const dir = this.flowField[i][j];
            const dist = this.pos.dist(this.target);
            const damped = map(dist, 0, this.maxDist, 0, this.speed);
            this.vel.setMag(damped);
        if (dir) {
            this.vel.setHeading(dir);
        }
    }
}
