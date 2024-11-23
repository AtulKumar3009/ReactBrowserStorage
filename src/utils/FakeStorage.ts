import { StorageBrowser } from '../types';

export default class FakeStorage implements StorageBrowser {
    private store: Map<string, string>;

    constructor() {
        this.store = new Map();
    }
    setItem(key: string, value: string) {
        this.store.set(key, value);
    }

    getItem(key: string): string | null {
        const value = this.store.get(key);
        return value === undefined ? null : value
    }

    removeItem(key: string): void {
        this.store.delete(key);
    }

    clear(): void {
        this.store.clear();
    }

}