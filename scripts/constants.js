
/*************************************************************************************************/
/* Constants                                                                                     */
/*************************************************************************************************/

export const DEFAULT_ROWS = 10;
export const DEFAULT_COLS = 10;
export const MAX_ROWS = 100;
export const MAX_COLS = 100;
export const DEFAULT_INTERVAL = .1;
export const DEFAULT_VISUAL = "grid"; // Later versions could support other visuals like canvas
export const DEFAULT_VERSION = 1;

export const HEADER = (locale) => `
import js

# Python "pointer" to the Grid Javascript object.
grid = js.window.app.model.grid

# Colors.
${locale.black} = (0, 0, 0)
${locale.white} = (255, 255, 255)
def ${locale.gray}(level=128):
    return (level, level, level)

${locale.red} = (230, 90, 90);
${locale.green} = (80, 200, 120);
${locale.blue} = (100, 150, 240);
${locale.yellow} = (255, 230, 100);
${locale.orange} = (255, 170, 70);

${locale.pink} = (255, 150, 180);
${locale.maroon} = (128, 50, 50);
${locale.purple} = (150, 100, 220);

# Global variables.
# ${locale.interval} = ${DEFAULT_INTERVAL}

# Grid functions.
def ${locale.size}(n, m):
    grid.reshape(n, m)

def ${locale.font}(size):
    grid.font(f"{size}pt")


def ${locale.color}(i, j, col=()):
    if callable(col): col = col()
    output = grid.bgcolor(i, j, *col)
    return tuple(output) if output else None

def ${locale.text}(i, j, text=None):
    output = grid.text(i, j, text)
    return str(output) if output else ""


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

export const DEFAULT_CODE = (locale) => `print("Hello world!")
${locale.color}(0, 0, ${locale.red})
`;
