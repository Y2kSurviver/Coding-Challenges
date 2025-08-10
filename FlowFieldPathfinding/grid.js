class Grid {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.data = this.make2DArray();
        this.directions = this.make2DArray();
        this.generateCells(0);

        this.current = null;
        this.queue = [];
        this.BLOCK = 5000;
    }
    
    print() {
        const dataP = this.make2DArray(this.rows, this.cols);
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
               if (this.data[i][j].block) 
                    dataP[i][j] = this.BLOCK;
                else
                    dataP[i][j] = this.data[i][j].cost;//this.data[i][j].cost ? this.data[i][j].cost : -1;
                            
            }
        }
        console.table(dataP);
    }

    make2DArray() {
        const arr = [];
        for (let i = 0; i < this.cols; i++) {
            arr[i] = new Array(this.rows);
        }
        return arr;
    }

    generateCells(prob) { 
        // Probability to spawn a block which is no considered in BFS (prob)
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.data[i][j] = new Cell(i, j); 
                
                if (random(1) < prob) {
                    this.data[i][j].block = true;
                    this.data[i][j].cost = this.BLOCK;
                }
            }
        }
    }

    setTarget(i, j) {
        //console.log("Set target");
        //console.log(this.data[i][j]);
        this.data[i][j].visited = true;
        this.data[i][j].cost = 0;
        this.current = this.data[i][j];
    }

    // Breadth-First Search 
    BFS() {
      while (this.queue.length > 0) {
           let neighbours = this.current.getNeighbours(this.data, this.rows, this.cols);
           neighbours = this.current.areValid(neighbours);
           this.queue = neighbours.concat(this.queue);
           this.queue.pop();
           this.current = this.queue[this.queue.length - 1];
       }
       this.print();
       //console.log(this.queue);
    }

    calDir() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                const cell = this.data[i][j];
                const neighbours = cell.getNeighbours(this.data, this.rows, this.cols);
                // get the lowest cost neighbour 
                const lowest = this.getLowestCost(neighbours);
                // Calculate the direction to that lowest cost cell
                let dir = p5.Vector.sub(lowest.pos, cell.pos);
                dir = p5.Vector.normalize(dir);
                this.directions.push(dir); 
            }
        }
    }
    
    getLowestCost(neighbours) {
        let cost = Infinity;
        let record = neighbours[0];
        // console.log("lowest cost")
        for (let neighbour of neighbours) {
           if (neighbour.cost < cost) {
               cost = neighbour.cost;
               record = neighbour;
           }
        }

        return record;
    }

    show() {
        //console.log("Show");
        const red = color(255, 0, 0);
        const white = color(255, 255, 255);
        //console.log(red);
        noStroke();
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                const amt = map(this.data[i][j].cost, 0, 11, 0, 1);
                const heatMap = lerpColor(red, white, amt);
                fill(heatMap);
                rect(j * w, i * w, w, w);
            }
        }
    }
}

