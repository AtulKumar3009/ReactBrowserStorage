class Temp {
    private static instance: Temp;
    private store: Map<string, string>;

    constructor() {
        this.store = new Map();
    }

    static getInstance(): Temp {
        if (!Temp.instance) {
            Temp.instance = new Temp();
        }
        return Temp.instance;
    }

    set(key: string, value: string) {
        this.store.set(key, value);
        return true
    }

    get(key: string) {
        const value = this.store.get(key);
        return value === undefined ? null : value
    }

    clear(key?: string) {
        if (key) {
            this.store.delete(key);
        } else {
            this.store.clear();
        }
        return true
    }
}

export default Temp.getInstance();
