let grid;
// TODO: make a grid and cell class 
// TODO: implement BFS 
// TODO: construct a flow field from the heat map
let w;
const ROWS = 5;
const COLS = 5;

function setup() {
    createCanvas(400, 400);
    randomSeed(500);
    w = width / ROWS;
    grid = new Grid(ROWS, COLS);
    grid.print();
    grid.setTarget(3, 4);
    grid.queue = [grid.current];
    grid.BFS();
    grid.calDirections();
    //grid.queue = [grid.current];
    //grid.print();
    //grid.BFS();
}

function draw() {
    background(0);
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
