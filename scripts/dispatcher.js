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

    /* Events                                                                                    */
    /*********************************************************************************************/

    toggle(source, idx) {
        this.emit("toggle", source, { "idx": idx });
    }
};
