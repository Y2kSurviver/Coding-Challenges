class Cell {
    constructor(i, j) {
        this.visited = false;
        this.i = i;
        this.j = j;
        this.block = false; 
        this.cost = -1;
    }

    getNeighbours(gridData, rows, cols) {
        const nei = [];
        for (let l = -1; l < 2; l++) {
            for (let e = -1; e < 2; e++) {
                if (l == 0 || e == 0) {
                    let cell;
                    if (this.isValidPos(this.i + l, this.j + e, rows, cols)) {
                        cell = gridData[this.i + l][this.j + e];
                    }

                    if (this.isValid(cell)) {
                        cell.visited = true; 
                        cell.cost = this.cost + 1;
                        nei.push(cell);
                    }
                }
            }
        }
        return nei;
    }
    
    isValidPos(i, j, rows, cols) {
        return i >= 0 && i <= rows - 1 && j >= 0 && j <= cols - 1;
    }

    isValid(cell) {
        return cell && !cell.visited && !cell.block;
    }
}
