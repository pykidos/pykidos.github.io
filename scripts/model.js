export { Model, };



/*************************************************************************************************/
/* Model class                                                                                      */
/*************************************************************************************************/

class Model {
    constructor() {

        // // Open the local cache.
        // caches.open('localCache').then((c) => {
        //     this.localCache = c;
        // });
    }

    /* Internal                                                                                  */
    /*********************************************************************************************/

    async load() {
        let pyodide = await loadPyodide();
        console.log(pyodide.runPython(`
                import sys
                sys.version
            `));
        pyodide.runPython("print(1 + 2)");
    }
}
