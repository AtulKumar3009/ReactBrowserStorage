import { StorageBrowser, StorageGeneric } from "../types";
import FakeStorage from "./FakeStorage";


class Local implements StorageGeneric {
    private static instance: Local;
    private store: StorageBrowser;


    constructor() {
        this.store = (localStorage === undefined ? new FakeStorage() : localStorage) as StorageBrowser
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
    async set(key: string, value: string) {
        if (this.isStorageAvailable()) {
            this.store.setItem(key, value);
        }
    }

    async get(key: string) {
        if (!this.isStorageAvailable()) return null
        return this.store.getItem(key);
    }

    async clear(key?: string) {
        if (this.isStorageAvailable()) {
            if (key) {
                this.store.removeItem(key);
            } else {
                this.store.clear();
            }
        }
    }
}

export default Local.getInstance()