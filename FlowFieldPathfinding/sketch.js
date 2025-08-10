let grid;
let w;
const ROWS = 10;
const COLS = 10;

function setup() {
    createCanvas(400, 400);
    randomSeed(500);
    w = width / ROWS;
    grid = new Grid(ROWS, COLS);
    grid.print();
    grid.setTarget(3, 4);
    grid.BFS();
    grid.calDirections();
}

function draw() {
    background(255);
    /* if (mouseIsPressed) {
        const x = floor(mouseX / w);
        const y = floor(mouseY / w);
        grid.data[y][x].cost = 5000;
        grid.BFS();
        ///console.log(x, y);
    } */
    grid.show();
}

/* function keyPressed() {
    grid.BFS();
} */ 
