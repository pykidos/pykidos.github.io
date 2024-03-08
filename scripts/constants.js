
/*************************************************************************************************/
/* Constants                                                                                     */
/*************************************************************************************************/

export const DEFAULT_ROWS = 10;
export const DEFAULT_COLS = 10;

export const HEADER = (locale) => `
import js

grid = js.window.app.grid

${locale.black} = (0, 0, 0)
${locale.red} = (255, 0, 0)
${locale.green} = (0, 255, 0)
${locale.blue} = (0, 0, 255)
${locale.yellow} = (255, 255, 0)

def ${locale.size}(n, m):
    grid.reshape(n, m)

def ${locale.color}(i, j, col):
    grid.bgcolor(i, j, *col)

def ${locale.fill}(col):
    grid.fill(*col)

def ${locale.clear}():
    grid.clear()

def ${locale.line}(i, col):
    grid.line(i, *col)

def ${locale.column}(j, col):
    grid.column(j, *col)

def ${locale.diagonal}(k, col):
    grid.diagonal(k, *col)

def ${locale.block}(i0, j0, i1, j1, col):
    grid.block(i0, j0, i1, j1, *col)

`;

// HACK: this is to force the sys.stdout to be flushed.
export const FOOTER = `print("\\n")\n`;

export const DEFAULT_CODE = (locale) => `for i in range(${DEFAULT_ROWS}):
    ${locale.color}(i, i, ${locale.red})
`;
