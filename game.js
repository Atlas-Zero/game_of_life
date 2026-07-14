export default class Game {
    constructor(rows, cols, data) {
        this.rows = rows;
        this.cols = cols;
        this.data = data;
    }

    next() {
        const current = this.data;
        const next = [];

        for (let x = 0; x < this.cols; x++) {
            next[x] = [];
            for (let y = 0; y < this.rows; y++) {

                const alive = current[x][y] === 1;

                // collect neighbours, checking bounds
                const neighbours = [];
                for (let dx = -1; dx <= 1; dx++) {
                    for (let dy = -1; dy <= 1; dy++) {
                        if (dx === 0 && dy === 0) continue; // skip self

                        const nx = x + dx;
                        const ny = y + dy;

                        if (nx >= 0 && nx < this.cols && ny >= 0 && ny < this.rows) {
                            neighbours.push(current[nx][ny]);
                        }
                    }
                }

                const aliveNeighbours = neighbours.filter(n => n === 1).length;

                // Conway's Game of Life rules: B3/S23[web:16][web:18]
                let newState = 0;
                if (alive && (aliveNeighbours === 2 || aliveNeighbours === 3)) {
                    newState = 1; // survival
                } else if (!alive && aliveNeighbours === 3) {
                    newState = 1; // birth
                }

                next[x][y] = newState;
            }
        }

        this.data = next;
    }
}