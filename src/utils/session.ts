import { StorageBrowser, StorageGeneric } from "../types";
import FakeStorage from "./FakeStorage";

class Session implements StorageGeneric {

    private static instance: Session;
    private store: StorageBrowser;


    constructor() {
        this.store = (sessionStorage === undefined ? new FakeStorage() : sessionStorage) as StorageBrowser
    }

    static getInstance(): Session {
        if (!this.instance) {
            this.instance = new Session();
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
    async set(key: string, value: any) {
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

export default Session.getInstance()