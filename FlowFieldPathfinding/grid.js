class Grid {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.data = this.make2DArray();
        this.directions = this.make2DArray();
        this.generateCells(0.1);
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

    calDirections() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                const cell = this.data[i][j];
                // get the lowest cost neighbour of a cell
                const lowest = cell.getLowestCost(this.data, this.rows, this.cols);
                let dir = p5.Vector.sub(lowest.pos, cell.pos);
                this.directions[i][j] = dir.heading();
            }
        }

        console.table(this.directions);
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
           this.current.visited = true;
           let neighbours = this.current.getNeighbours(this.data, this.rows, this.cols);
           neighbours = this.current.areValid(neighbours); // are valid also sets the cost and visited
           this.current.setParm(neighbours);
           this.queue = neighbours.concat(this.queue);
           this.queue.pop();
           this.current = this.queue[this.queue.length - 1];
      }
       this.print();
    } 

    show() {
       //console.log("Show");
        noStroke();
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (this.data[i][j].block) {
                    fill(255, 0, 0);
                    rect(j * w, i * w, w, w);
                } else {
                    //const bri = map(this.data[i][j].cost, 0, 15, 255, 0);
                    //fill(bri);        
                    stroke(0);
                    fill(255);
                    rect(j * w, i * w, w, w);
                    push();
                    translate(j * w, i * w);
                    rotate(this.directions[i][j]);
                    //rotate(0);
                    //stroke(0, 255, 0);
                    line(w / 2, w / 2, w, w / 2);
                    pop();
                }
            }
        }
    }
}

