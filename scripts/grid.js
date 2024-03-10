import { DEFAULT_ROWS, DEFAULT_COLS, MAX_ROWS, MAX_COLS } from "./constants.js";
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
        this.setupKeyboard();
    }

    setupKeyboard() {
        this.gridTable.addEventListener("keydown", (e) => {
            this.dispatcher.keyboard(this, e.key);
        });
    }

    setupDispatcher() {
        this.dispatcher.on("clear", (e) => { this.clear(); });
    }

    reshape(n, m) {
        n = this.rows = clamp(Math.round(n), 1, MAX_ROWS);
        m = this.cols = clamp(Math.round(m), 1, MAX_COLS);

        // Clear the grid.
        while (this.gridTable.firstChild) {
            this.gridTable.removeChild(this.gridTable.firstChild);
        }

        // HACK: found an adequate grid width in "vmin" unit by trial and error.
        let k = clamp((60.0 * m) / n, 1, 60);
        this.grid.style.width = `${k}vmin`;

        this.gridTable.style.gridTemplateColumns = `repeat(${m}, 1fr)`;
        this.gridTable.style.gridTemplateRows = `repeat(${n}, 1fr)`;

        for (let i = 0; i < n * m; i++) {
            this._createCell(i);
        }
    }

    _createCell(i) {
        let cell = document.createElement('div');
        let row = Math.floor(i / this.rows);
        let col = i % this.rows;
        cell.addEventListener("click", (e) => {
            this.dispatcher.click(this, row, col);
        });
        cell.title = `${row}, ${col}`;
        let size = cell.width;
        cell.style.fontSize = `calc((95vw - 300px) / (2 * ${this.rows}))`;
        this.gridTable.appendChild(cell);
    }

    cell(i, j) {
        i = Math.floor(i);
        j = Math.floor(j);
        if (0 <= i && i < this.rows && 0 <= j && j < this.cols)
            return this.gridTable.childNodes[i * this.rows + j];
    }

    bgcolor(i, j, r, g, b) {
        let cell = this.cell(i, j);
        if (cell)
            cell.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    }

    text(i, j, string) {
        let cell = this.cell(i, j);
        if (cell)
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

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.text(i, j, "");
            }
        }
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
