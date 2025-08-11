// Made by Y2kSurviver
// https://github.com/Y2kSurviver/Coding-Challenges/tree/main/FlowFieldPathfinding
// Fluid Flow Pathfinding simulation with p5js

let grid;
let w;
const ROWS = 10;
const COLS = 10;
const totalMovers = 10;
const movers = [];

function setup() {
    createCanvas(400, 400);
    // seed = 6843
    randomSeed(6843);
    w = width / ROWS;
    grid = new Grid(ROWS, COLS);
    grid.setTarget(3, 4);
    grid.BFS();
    grid.calcFlowField();
    for (let i = 0; i < totalMovers; i++) {
        let mover = new Mover(grid.flowField, random(width), random(height), 2, grid.target.pos);
        movers.push(mover);
    }
}

function draw() {
    background(255);
    grid.show();
    
    for (let mover of movers) {
        mover.setVel(); 
        mover.update();
        mover.show();
    }
}

