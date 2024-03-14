# PyKidos: Python visual playground in the browser

Welcome to [**PyKidos**](https://pykidos.github.io/)! This is a small Javascript application (still rough around the edges) that provides a Python playground [running entirely in the browser](https://pyodide.org/en/stable/), which is convenient for teaching purposes (kids and adults).

[![PyKidos:](https://github.com/pykidos/pykidos.github.io/assets/1942359/7974ace5-aeb6-4a6c-8678-c40ed5eb0af0)](https://pykidos.github.io/)

The grid cells (color and text) can be manipulated from Python. You can make simple grid animations and react to click and keyboard events.

Kids (and adults) can program toy games to learn basic Python coding skills.


## Gallery


![Bunny](https://github.com/pykidos/pykidos.github.io/assets/1942359/b2bd0f47-673b-456c-ad32-a72cd814e779)

![Tic-tac-toe](https://github.com/pykidos/pykidos.github.io/assets/1942359/dcdbfadb-efae-488d-9172-017818e7c9c2)

![Game of life](https://github.com/pykidos/pykidos.github.io/assets/1942359/cb6d6b3d-3f1c-49c0-ae49-86ca45835c8f)

![Checkerboard](https://github.com/pykidos/pykidos.github.io/assets/1942359/d770ec45-5c6d-4611-af5d-4814f1514d41)


<!-- ![Antialiased disc](https://github.com/pykidos/pykidos.github.io/assets/1942359/f39e1046-b163-428a-91a6-a05887a37b00) -->

More images to come soon (pull requests welcome).


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

The code is written in custom HTML, CSS, vanilla Javascript.

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
