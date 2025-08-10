let grid;
// TODO: make a grid and cell class 
// TODO: implement BFS 
// TODO: construct a flow field from the heat map
let w;
const ROWS = 10;
const COLS = 10;

function setup() {
    createCanvas(400, 400);
    randomSeed(500);

    w = width / ROWS;
    grid = new Grid(ROWS, COLS);
    grid.setTarget(3, 4);
    grid.queue = [grid.queue];
    grid.print();
    grid.BFS();
    //grid.calDir();
    //console.log(grid.directions);
}

function draw() {
    background(0);
    //console.log("this is the end")
    /*if (mouseIsPressed) {
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
