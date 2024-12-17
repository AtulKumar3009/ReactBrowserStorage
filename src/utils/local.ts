class Local {
    private static instance: Local;
    private store: Storage;


    constructor() {
        this.store = localStorage
    }

    static getInstance(): Local {
        if (!this.instance) {
            this.instance = new Local();
        }
        return this.instance;
    }
    private isStorageAvailable(): boolean {
        try {
            return (
                typeof this.store !== 'undefined' &&
                'getItem' in this.store &&
                'setItem' in this.store &&
                'removeItem' in this.store &&
                'clear' in this.store
            );
        } catch {
            return false;
        }
    }
    set(key: string, value: string) {
        if (this.isStorageAvailable()) {
            this.store.setItem(key, value);
            return true
        }
        return false
    }

    get(key: string) {
        if (!this.isStorageAvailable()) return null
        return this.store.getItem(key);
    }

    clear(key?: string) {
        if (this.isStorageAvailable()) {
            if (key) {
                this.store.removeItem(key);
            } else {
                this.store.clear();
            }
            return true
        }
        return false
    }
}

export default Local.getInstance()