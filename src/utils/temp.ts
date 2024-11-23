import { StorageGeneric } from "../types";

class Temp implements StorageGeneric {
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

    async set(key: string, value: string) {
        this.store.set(key, value);
    }

    async get(key: string) {
        const value = this.store.get(key);
        return value === undefined ? null : value
    }

    async clear(key?: string) {
        if (key) {
            this.store.delete(key);
        } else {
            this.store.clear();
        }
    }
}

export default Temp.getInstance();
