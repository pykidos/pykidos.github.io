
/*************************************************************************************************/
/* Constants                                                                                     */
/*************************************************************************************************/

export const DEFAULT_ROWS = 10;
export const DEFAULT_COLS = 10;
export const DEFAULT_INTERVAL = .1;

export const HEADER = (locale) => `
import js

grid = js.window.app.grid

${locale.black} = (0, 0, 0)
${locale.white} = (255, 255, 255)

# ${locale.red} = (255, 0, 0)
# ${locale.green} = (0, 255, 0)
# ${locale.blue} = (0, 0, 255)
# ${locale.yellow} = (255, 255, 0)
# ${locale.orange} = (255, 100, 0)

# Basic and Softened Colors
${locale.red} = (230, 90, 90);
${locale.green} = (80, 200, 120);
${locale.blue} = (100, 150, 240);
${locale.yellow} = (255, 230, 100);
${locale.orange} = (255, 170, 70);

# Additional Colors for Variety
${locale.purple} = (150, 100, 220);
${locale.teal} = (70, 200, 200);
${locale.pink} = (255, 150, 180);
${locale.peach} = (255, 180, 150);
${locale.limeGreen} = (180, 240, 100);
${locale.skyBlue} = (135, 206, 235);
${locale.lavender} = (200, 150, 220);
${locale.mint} = (170, 255, 195);
${locale.navy} = (0, 70, 130);
${locale.maroon} = (128, 50, 50);
${locale.olive} = (128, 128, 0);
${locale.coral} = (255, 127, 80);
${locale.aqua} = (127, 255, 212);


def ${locale.size}(n, m):
    grid.reshape(n, m)

def ${locale.color}(i, j, col):
    grid.bgcolor(i, j, *col)

def ${locale.text}(i, j, text):
    grid.text(i, j, text)

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
