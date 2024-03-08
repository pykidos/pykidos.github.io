import { DEFAULT_ROWS, DEFAULT_COLS } from "./constants.js";
import { clamp } from "./utils.js";

export { Grid };



/*************************************************************************************************/
/* Grid                                                                                          */
/*************************************************************************************************/

class Grid {
    constructor(state, model, dispatcher) {
        this.state = state;
        this.model = model;
        this.dispatcher = dispatcher;

        this.grid = document.getElementById('grid');
        this.gridTable = document.getElementById('grid-table');
        this.rows = DEFAULT_ROWS;
        this.cols = DEFAULT_COLS;
        this.reshape(this.rows, this.cols);

        this.setupDispatcher();
    }

    setupDispatcher() {
    }

    reshape(n, m) {
        this.rows = n;
        this.cols = m;

        // Clear the grid.
        while (this.gridTable.firstChild) {
            this.gridTable.removeChild(this.gridTable.firstChild);
        }

        let k = clamp((60.0 * m) / n, 1, 60);
        this.grid.style.width = `${k}vmin`;
        this.gridTable.style.gridTemplateColumns = `repeat(${m}, 1fr)`;
        this.gridTable.style.gridTemplateRows = `repeat(${n}, 1fr)`;
        for (let i = 0; i < n * m; i++) {
            let cell = document.createElement('div');
            this.gridTable.appendChild(cell);
        }
    }

    cell(i, j) {
        return this.gridTable.childNodes[i * this.rows + j];
    }

    bgcolor(i, j, r, g, b) {
        let cell = this.cell(i, j);
        cell.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    }

    text(i, j, string) {
        let cell = this.cell(i, j);
        cell.textContent = string;
    }

    fill(r, g, b) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.bgcolor(i, j, r, g, b);
            }
        }
    }

    clear() {
        this.fill(255, 255, 255);
    }

    line(i, r, g, b) {
        for (let j = 0; j < this.cols; j++) {
            this.bgcolor(i, j, r, g, b);
        }
    }

    column(j, r, g, b) {
        for (let i = 0; i < this.rows; i++) {
            this.bgcolor(i, j, r, g, b);
        }
    }

    diagonal(k, r, g, b) {
        for (let i = 0; i < Math.min(this.rows, this.cols); i++) {
            if (i + k < this.rows && i + k < this.cols) {
                this.bgcolor(i + k, i + k, r, g, b);
            }
        }
    }

    block(i0, j0, i1, j1, r, g, b) {
        for (let i = i0; i < i1; i++) {
            for (let j = j0; j < j1; j++) {
                this.bgcolor(i, j, r, g, b);
            }
        }
    }
};
