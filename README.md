# PyKidos: Python visual playground in the browser

Welcome to [**PyKidos**](https://pykidos.github.io/), a small JavaScript application (still rough around the edges) that offers a Python playground for teaching purposes. It is mainly intended for use by adults who are teaching programming to their kids, and it is not really designed for independent use by children without adult supervision.

[![PyKidos](https://github.com/pykidos/pykidos.github.io/assets/1942359/7974ace5-aeb6-4a6c-8678-c40ed5eb0af0)](https://pykidos.github.io/)

The grid cells (color and text) can be manipulated from Python. You can make simple grid animations and react to click and keyboard events.

Kids (and adults) can program toy games to learn basic Python coding skills.


## Gallery

![tictactoe](https://github.com/pykidos/pykidos.github.io/assets/1942359/d15c94f2-806a-4514-b5cc-aa332612789e)
![gameoflife](https://github.com/pykidos/pykidos.github.io/assets/1942359/3430f254-4a4e-4082-8744-c649dcc74739)
![bunny](https://github.com/pykidos/pykidos.github.io/assets/1942359/fb95d431-9112-4e4c-8361-db1b19706fe7)
![checkerboard-320](https://github.com/pykidos/pykidos.github.io/assets/1942359/8f11c785-3396-4879-8479-044a652bc25e)

More screenshots to come soon (pull requests welcome).


## Features

- Entirely client-side: the data is only stored in your browser (localStorage).
- Uses [**Pyodide**](https://pyodide.org/en/stable/), a CPython port to WebAssembly.
- Uses the [**ACE**](https://ace.c9.io/) code editor.
- Unicode emoji picker and color picker.
- NumPy is supported (and potentially other scientific Python libraries; those will require a [quick pull request](https://github.com/pykidos/pykidos.github.io/blob/3fa5fac7b49f59c1e4a11e362adc310ac720ab2a/scripts/runner.js#L106) at the moment though)
- Manipulate a grid (cell colors and text, including Unicode emojis) from Python.
- React to click and keyboard events in the grid.
- Animations.
- Download your Python scripts locally.
- Share your code by getting a URL with the entire code and data encoded in it (limited to a few kilobytes compressed).


## Development notes

The code is written in custom HTML, CSS, vanilla JavaScript.

The code uses the following external components:

- [ACE editor](https://ace.c9.io/) (code editor)
- [Pyodide](https://pyodide.org/en/stable/) (CPython port to WebAssembly)
- [Pako](https://github.com/nodeca/pako) (gzip compression/decompression)
- [emoji-picker-element](https://github.com/nolanlawson/emoji-picker-element) (emoji selector)
- [coloris](https://github.com/mdbassit/Coloris) (color picker)

To serve your own version, just statically serve this repository.

Feel free to open issues, ask questions, make suggestions, propose pull requests.


## Credits and history

I wrote this small application in a few days to teach programming concepts to my 8-year-old boy (I couldn't find an existing web-based application so I couldn't help building my own).

A bare IPython terminal looked too boring to my son and he wanted a visual component. The grid looked like a simple option. Future versions could support alternative widgets, such as a canvas.
