export { Dispatcher };




/*************************************************************************************************/
/* Dispatcher                                                                                    */
/*************************************************************************************************/

class Dispatcher {
    constructor() {
        this.el = document.getElementById('dispatcher');
    }

    /* Internals                                                                                 */
    /*********************************************************************************************/

    emit(name, source, data) {
        const payload = {
            name: name,
            detail: {
                source: source,
                data: data,
            },
        };
        const ev = new CustomEvent(name, payload);

        this.el.dispatchEvent(ev);
    }

    on(name, callback) {
        this.el.addEventListener(name, (ev) => { return callback(ev.detail.data, ev.detail.source); });
    }

    connect(source) {
        // Request a WebSocket connection.
        this.emit("connect", source);
    }

    /* Code management                                                                           */
    /*********************************************************************************************/

    // clear(source) {
    //     // Clear the grid.
    //     this.emit("clear", source);
    // }

    new(source) {
        this.emit("new", source, {});
    }

    rename(source, oldName, newName) {
        this.emit("rename", source, { "oldName": oldName, "newName": newName });
    }

    delete(source, name) {
        this.emit("delete", source, { "name": name });
    }

    save(source) {
        this.emit("save", source);
    }

    /* Runner                                                                                    */
    /*********************************************************************************************/

    // start(source, code) {
    //     this.emit("stop", source, { "code": code });
    // }

    // stop(source) {
    //     this.emit("stop", source);
    // }

    run(source, code) {
        this.emit("run", source, { "code": code });
    }

    select(source, name) {
        this.emit("select", source, { "name": name });
    }

    spinning(source, isSpinning) {
        this.emit("spinning", source, { "isSpinning": isSpinning });
    }

    /* Input events                                                                              */
    /*********************************************************************************************/

    click(source, i, j) {
        this.emit("click", source, { "row": i, "col": j });
    }

    keyboard(source, key) {
        this.emit("keyboard", source, { "key": key });
    }
};
