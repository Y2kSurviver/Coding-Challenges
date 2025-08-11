class Grid {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.heatMap = this.make2DArray();
        this.flowField = this.make2DArray();
        this.generateCells(0.1);
        this.current = null;
        this.target = null;
        this.queue = [];
        // BLOCK is a arbitrary high number to indicate a obstacle
        this.BLOCK = 5000;
    }
    
    // Debugging Purpuses, used to print the heat map and flow field
    print(select = "heat map") {
        let data = this.heatMap;
        if (select == "flow field") data = this.flowField;
        if (select == "heat map") {
            const printData = this.make2DArray(this.rows, this.cols);
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                   if (this.heatMap[i][j].block) 
                        printData[i][j] = this.BLOCK;
                    else
                        printData[i][j] = data[i][j].cost;                            
                }
            } 
            console.table(printData);
        } else if (select == "flow field") {
           console.table(data);
       }
    }

    make2DArray() {
        const arr = [];
        for (let i = 0; i < this.cols; i++) {
            arr[i] = new Array(this.rows);
        }
        return arr;
    }

    calcFlowField() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                const cell = this.heatMap[i][j];
               if (!cell.block) {
                    // get the lowest cost neighbour of a cell
                    const lowest = cell.getLowestCost(this.heatMap, this.rows, this.cols);
                    // calculate direction from lowest cost cell to current cell
                    let dir = p5.Vector.sub(lowest.pos, cell.pos);
                    this.flowField[i][j] = dir.heading();
               }
            }
        } 

        this.print("flow field");
    } 

    generateCells(prob) { 
        // Probability to spawn a block which is no considered in BFS (prob)
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.heatMap[i][j] = new Cell(i, j); 
                
                if (random(1) < prob) {
                    this.heatMap[i][j].block = true;
                    this.heatMap[i][j].cost = this.BLOCK;
                }
            }
        }
    }

    setTarget(i, j) {
        this.heatMap[i][j].visited = true;
        this.heatMap[i][j].cost = 0;
        this.current = this.heatMap[i][j];
        this.target = this.current;
        this.queue.push(this.target);
    }

    // Breadth-First Search 
    BFS() {
      while (this.queue.length > 0) {
           let neighbours = this.current.getNeighbours(this.heatMap, this.rows, this.cols);
           neighbours = this.current.areValid(neighbours); // are valid also sets the cost and visited
           this.current.setParm(neighbours);
           this.queue = neighbours.concat(this.queue);
           this.queue.pop();
           this.current = this.queue[this.queue.length - 1];
      }
    } 

    show() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (this.heatMap[i][j].block) {
                    noStroke();
                    fill(255, 0, 0);
                    rect(j * w, i * w, w, w);
                } else {
                    stroke(0);
                    //const bri = map(this.heatMap[i][j].cost, 0, 15, 255, 0);
                    //fill(bri);        
                    rectMode(CORNER);
                    noFill();
                    rect(j * w, i * w, w, w);
                    push();
                    fill(0);
                    rectMode(CENTER);
                    translate(j * w + w / 2, i * w + w / 2);
                    rotate(this.flowField[i][j]);
                    rect(10, 0, 5, 5);
                    line(0, 0, 10, 0);
                    pop();
                }
            }
        }
        fill(0, 255, 0);
        rect(this.target.j * w, this.target.i * w, w, w);
    }
}

