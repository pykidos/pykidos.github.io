import { DEFAULT_CODE } from "./constants.js";
import { LOCALE } from "./locale.js";

export { Storage };


/*************************************************************************************************/
/* Storage                                                                                       */
/*************************************************************************************************/

class Storage {
    constructor(state, model, dispatcher) {
        this.state = state;
        this.model = model;
        this.dispatcher = dispatcher;

        this.setupDispatcher();
    }

    init() {
        if (this.count() == 0) {
            this.new();
        }
        this.updateSelector(this.first());
    }

    setupDispatcher() {
        this.dispatcher.on("select", (e) => {
            try {
                let code = this.retrieve(e.name);
                this.model.setCode(code);
                this.state.name = e.name;
            }
            catch (err) {
                console.warn(`Code listing ${e.name} not found.`);
            }
        });

        // Save on run.
        this.dispatcher.on("run", (e) => {
            let code = this.model.getCode();
            this.save(this.state.name, code);
        });

        this.dispatcher.on("new", (e) => {
            this.updateSelector(this.new());
        });

        this.dispatcher.on("rename", (e) => {
            this.rename(e.oldName, e.newName);
            this.updateSelector(e.newName);
        });

        this.dispatcher.on("delete", (e) => {
            this.delete(e.name);
            this.updateSelector(this.first());
        });
    }

    updateSelector(name) {
        // The selector will update the list of names with this and will raise a new select event.
        this.dispatcher.setNames(this, this.list(), name);
    }

    count() {
        return localStorage.length;
    }

    new() {
        let index = 0;
        let newName;
        do {
            newName = `untitled ${index}`;
            index++;
        } while (localStorage.getItem(newName) !== null);
        localStorage.setItem(newName, DEFAULT_CODE(LOCALE));
        return newName;
    }

    rename(oldName, newName) {
        const listing = localStorage.getItem(oldName);
        if (listing !== null) {
            localStorage.setItem(newName, listing);
            localStorage.removeItem(oldName);
        } else {
            throw new Error(`Listing "${oldName}" not found.`);
        }
    }

    save(name, code) {
        localStorage.setItem(name, code);
    }

    first() {
        const names = Object.keys(localStorage);
        if (names.length > 0) {
            return names[0];
        }
    }

    retrieve(name) {
        const listing = localStorage.getItem(name);
        if (listing !== null) {
            return listing;
        }
        else {
            throw new Error(`Listing "${name}" not found.`);
        }
    }

    list(order) {
        const names = Object.keys(localStorage);
        if (order === 'desc') {
            return names.sort().reverse();
        } else {
            return names.sort();
        }
    }

    delete(name) {
        localStorage.removeItem(name);
    }
};
