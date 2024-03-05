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
        this.reshape(DEFAULT_ROWS, DEFAULT_COLS);

        this.setupDispatcher();
    }

    setupDispatcher() {
    }

    reshape(n, m) {
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


    bgcolor(i, j, r, g, b) {
        let cell = this.gridTable.rows[i].cells[j].childNodes[0];
        cell.style.backgroundColor = `rgb(${r},${g},${b})`;
    }

    text(i, j, string) {
        let cell = this.gridTable.rows[i].cells[j].childNodes[0];
        console.log(cell);
        cell.textContent = string;
    }
};
