
/*************************************************************************************************/
/* Constants                                                                                     */
/*************************************************************************************************/

export const DEFAULT_ROWS = 10;
export const DEFAULT_COLS = 10;

export const HEADER = `
import js

grid = js.window.app.grid

def size(n, m):
    grid.reshape(n, m)

colors = {
    "black": (0, 0, 0),
    "red": (255, 0, 0),
}

def color(i, j, c):
    col = colors.get(c, None)
    if col:
        grid.bgcolor(i, j, *col)
`;

// HACK: this is to force the sys.stdout to be flushed.
export const FOOTER = `print("\\n")\n`;
