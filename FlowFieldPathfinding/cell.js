class Cell {
    constructor(i, j) {
        this.visited = false;
        this.i = i;
        this.j = j;
        this.pos = createVector(this.j * w, this.i * w);
        this.block = false; 
        this.cost = -1;
    }

    getNeighbours(gridData, rows, cols) {
        const nei = [];
        for (let l = -1; l < 2; l++) {
            for (let e = -1; e < 2; e++) {
                let cell;
                if (this.isValidPos(this.i + l, this.j + e, rows, cols)) {
                    cell = gridData[this.i + l][this.j + e];
                    nei.push(cell);
                }
            }
        }
        return nei;
    }
    
    isValidPos(i, j, rows, cols) {
        return i >= 0 && i <= rows - 1 && j >= 0 && j <= cols - 1 && !(i == this.i && j == this.j);
    }

    areValid(neighbours) {
        const filtered = [];
        for (let neighbour of neighbours) {
            if (!neighbour.visited && !neighbour.block) {
                filtered.push(neighbour);
            }
        }
        return filtered;
    } 

    setParm(neighbours) {
        for (let neighbour of neighbours) {
            neighbour.cost = this.cost + 1;
            neighbour.visited = true;
        }
    }

    getLowestCost(gridData, rows, cols) {
        let neighbours = this.getNeighbours(gridData, rows, cols);
        let lowestCost = Infinity;
        let record = neighbours[0];
        for (let neighbour of neighbours) {
            if (neighbour.cost < lowestCost) {
                lowestCost = neighbour.cost;
                record = neighbour;
            }
        }
        return record; 
    }
}
