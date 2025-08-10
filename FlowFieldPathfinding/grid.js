class Grid {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.data = this.make2DArray();
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
           const neighbours = this.current.getNeighbours(this.data, this.rows, this.cols);
           this.queue = neighbours.concat(this.queue);
           this.queue.pop();
           this.current = this.queue[this.queue.length - 1];
       }
       this.print();
       //console.log(this.queue);
    } 

    show() {
       //console.log("Show");
        noStroke();
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                const bri = map(this.data[i][j].cost, 0, 15, 255, 0);
                fill(bri);        
                rect(j * w, i * w, w, w);
            }
        }
    }
}

