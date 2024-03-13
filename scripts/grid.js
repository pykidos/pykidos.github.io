import { DEFAULT_ROWS, DEFAULT_COLS, MAX_ROWS, MAX_COLS } from "./constants.js";
import { clamp } from "./utils.js";

export { Grid };



/*************************************************************************************************/
/* Grid                                                                                          */
/*************************************************************************************************/

class Grid {
    constructor() {
        this.grid = document.getElementById('grid');
        this.gridTable = document.getElementById('grid-table');
        this.rows = 0;// DEFAULT_ROWS;
        this.cols = 0;//DEFAULT_COLS;
        this.reshape(this.rows, this.cols);

        this.setupInput();
    }

    init() {

    }

    /* Internal functions                                                                        */
    /*********************************************************************************************/

    _createCell(i) {
        let cell = document.createElement('div');
        let row = Math.floor(i / this.rows);
        let col = i % this.rows;
        cell.addEventListener("click", (e) => {
            if (this._onClick) this._onClick(row, col);
        });
        cell.title = `${row}, ${col}`;
        this.gridTable.appendChild(cell);
    }

    /* Input events                                                                              */
    /*********************************************************************************************/

    setupInput() {
        this._onClick = null;
        this._onKeyboard = null;
        this.gridTable.addEventListener("keydown", (e) => {
            if (this._onKeyboard) this._onKeyboard(e.key);
        });
    }

    onClick(f) {
        this._onClick = f;
    }

    onKeyboard(f) {
        this._onKeyboard = f;
    }

    /* Grid manipulation                                                                         */
    /*********************************************************************************************/

    reshape(n, m) {
        if ((n == this.rows) && (m == this.cols)) return;

        console.log(`Grid reshape to (${n}, ${m}).`);

        // Clear the grid.
        while (this.gridTable.firstChild) {
            this.gridTable.removeChild(this.gridTable.firstChild);
        }

        n = this.rows = clamp(Math.round(n), 1, MAX_ROWS);
        m = this.cols = clamp(Math.round(m), 1, MAX_COLS);

        for (let i = 0; i < n * m; i++) {
            this._createCell(i);
        }

        // HACK: found an adequate grid width in "vmin" unit by trial and error.
        let k = clamp((60.0 * m) / n, 1, 60);
        this.grid.style.width = `${k}vmin`;
        this.font(`calc((30vw + 30vh - 250px) / (2 * ${this.rows}))`);

        this.gridTable.style.gridTemplateColumns = `repeat(${m}, 1fr)`;
        this.gridTable.style.gridTemplateRows = `repeat(${n}, 1fr)`;

    }

    clear() {
        console.log("Clear the grid.");
        for (let i = 0; i < this.rows * this.cols; i++) {
            const cell = this.gridTable.children[i];
            if (cell && cell.style) {
                cell.style.backgroundColor = "";
                cell.textContent = "";
            }
        }
    }

    /* Global functions                                                                          */
    /*********************************************************************************************/

    font(size) {
        this.gridTable.style.fontSize = size;
    }

    /* Cell functions                                                                            */
    /*********************************************************************************************/

    cell(i, j) {
        i = Math.floor(i);
        j = Math.floor(j);
        if (0 <= i && i < this.rows && 0 <= j && j < this.cols)
            return this.gridTable.children[i * this.rows + j];
    }

    bgcolor(i, j, r, g, b) {
        let cell = this.cell(i, j);
        if (cell && cell.style && r != null && r != undefined) {
            cell.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        }

        // NOTE: if not rgb, return the bg color
        if (r == null || r == undefined) {
            const bgcolor = cell ? cell.style.backgroundColor : "";
            if (!bgcolor) return null;
            const [r, g, b] = bgcolor.match(/\d+/g).map(Number);
            return [r, g, b];
        }
    }

    text(i, j, string) {
        let cell = this.cell(i, j);
        if (cell && string != null && string != undefined) {
            cell.textContent = string;
        }

        // NOTE: if string is undefined, return the text
        if (string == null || string == undefined) {
            return cell.textContent;
        }
    }

    /* Multi-cell functions                                                                      */
    /*********************************************************************************************/

    fill(r, g, b) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.bgcolor(i, j, r, g, b);
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

    /* Serialization                                                                             */
    /*********************************************************************************************/

    dump() {
        const cells = {};
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                const cell = this.cell(i, j);
                if (cell) {
                    const bgColor = getComputedStyle(cell).getPropertyValue('background-color');
                    const text = cell.textContent.trim();

                    const emptyColor = bgColor == "rgba(0, 0, 0, 0)";
                    if (emptyColor && !text)
                        continue;

                    const rgb = bgColor.match(/\d+/g);
                    cells[`${i},${j}`] = {
                        bgcolor: emptyColor ? null : rgb.map(Number),
                        text: text
                    };
                }
            }
        }
        return {
            "rows": this.rows,
            "cols": this.cols,
            "cells": cells,
            "fontSize": this.gridTable.style.fontSize,
        };
    }

    load(data) {
        if (!data) return;

        this.clear();
        this.reshape(data.rows, data.cols);
        if (data.fontSize)
            this.font(data.fontSize);

        for (const key in data.cells) {
            const cellData = data.cells[key];
            if (!cellData) continue;
            const [i, j] = key.split(',').map(Number);
            const { bgcolor, text } = cellData;
            if (bgcolor)
                this.bgcolor(i, j, ...bgcolor);
            if (text)
                this.text(i, j, text);
        }
    }
};
