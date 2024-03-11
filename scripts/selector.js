export { Selector };


/*************************************************************************************************/
/* Selector                                                                                      */
/*************************************************************************************************/

class Selector {
    constructor(state, model, dispatcher) {
        this.state = state;
        this.model = model;
        this.dispatcher = dispatcher;

        this.el = document.getElementById("selector");
        this.newButton = document.getElementById("new-item");

        this.names = [];
        this.setupDispatcher();
        this.setupNewButton();
    }

    init() {
        // Load the list of names stored in the storage.
        let names = this.model.storage.list();

        let first = names ? names[0] : null;

        this.state.name = this.state.name || first;

        // Set the selector list with those names.
        this.setNames(names, this.state.name);
    }

    /* Setup functions                                                                           */
    /*********************************************************************************************/

    setupDispatcher() {
    }

    setupNewButton() {
        this.newButton.addEventListener('click', (e) => { this.new(); });
    }

    /* Internal functions                                                                        */
    /*********************************************************************************************/

    _createItem(name, selected) {
        // Create HTML item.
        const item = document.createElement('div');
        item.classList.add('item');
        if (selected)
            item.classList.add('selected');

        // Listing name.
        const itemName = document.createElement('span');
        itemName.textContent = name;
        item.appendChild(itemName);

        // Rename button.
        const renameButton = document.createElement('button');
        renameButton.textContent = '✏️';
        renameButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.rename(name, window.prompt("new name?", name));
        });
        item.appendChild(renameButton);

        // Delete button.
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '🗑️';
        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation();
            if (window.confirm(`delete ${name}?`))
                this.delete(name);
        });
        item.appendChild(deleteButton);

        return item;
    }

    _updateAndSelect(name) {
        // Update the list to reflect the list of items stored, and select a code listing.

        // Load the list of names stored in the storage.
        let names = this.model.storage.list();

        // Update the list of names, and select an item.
        this.setNames(names, name);
    }

    /* Public functions                                                                          */
    /*********************************************************************************************/

    setNames(names, selectedName) {
        // Recreate the items.
        this.el.innerHTML = '';
        this.names = names;

        names.forEach(name => {
            const item = this._createItem(name, name == selectedName);
            item.addEventListener('click', () => this.select(name));
            this.el.appendChild(item);
        });

        if (selectedName)
            this.select(selectedName);
    }

    select(name) {
        // Called when clicking on an item.

        if (!name) return;

        console.log(`Select code listing "${name}".`);

        // Add the selected CSS class only on the selected item.
        for (let child of this.el.childNodes) {
            if (child.childNodes[0].innerHTML != name)
                child.classList.remove('selected');
            else
                child.classList.add('selected');
        }

        // Load the code listings in the storage.
        // try {
        let listing = this.model.storage.retrieve(name);

        // Get the code in the listing object.
        let code = listing.code;

        // Show the code in the editor.
        this.model.editor.setCode(code);

        // Load the grid.
        this.model.grid.load(listing.data);

        // Update the state.
        this.state.name = name;

        // Emit the select event.
        this.dispatcher.select(this, name);
        // }
        // catch (err) {
        //     console.warn(`Code listing ${name} not found.`);
        // }
    }

    new() {
        // Create a new code listing in the storage, and retrieve its name.
        let name = this.model.storage.new();

        // Select the newly-created code listing.
        this._updateAndSelect(name)

        // Emit the new event.
        this.dispatcher.new(this);
    }

    rename(oldName, newName) {
        if (!newName) return;
        console.log(`Rename code listing from "${oldName}" to "${newName}".`);

        // Rename the item in the storage.
        this.model.storage.rename(oldName, newName);

        // Update the list of items.
        this._updateAndSelect(newName);

        // Emit the rename event.
        this.dispatcher.rename(this, oldName, newName);
    }

    delete(name) {
        if (!name) return;
        console.log(`Delete code listing "${name}".`);

        // Delete the item from the storage.
        this.model.storage.delete(name);

        // Update the list of items.
        this._updateAndSelect(this.model.storage.first());

        // Emit the delete event.
        this.dispatcher.delete(this, name);
    }
};
