import { StorageBrowser, StorageGeneric } from "../types";
import FakeStorage from "./FakeStorage";

class Cookie implements StorageGeneric {
    private static instance: Cookie;
    private store: StorageBrowser;


    constructor() {
        this.store = ((new FakeStorage()) as unknown) as StorageBrowser
    }

    static getInstance(): Cookie {
        if (!this.instance) {
            this.instance = new Cookie();
        }
        return this.instance;
    }
    private isStorageAvailable(): boolean {
        return Boolean(document) && Boolean(document.cookie)
    }

    async set(key: string, value: string) {
        value = encodeURIComponent(value)
        if (this.isStorageAvailable()) {
            let cookie = `${key}=${value}; path=/`;
            document.cookie = cookie;
        } else {
            this.store.setItem(key, value)
        }
    }

    async get(key: string) {
        let value: string | null
        if (this.isStorageAvailable()) {
            const cookieValue = document.cookie.split(';').find(c => c.trim().startsWith(key + '='));
            if (!cookieValue) return null;
            value = cookieValue.split('=')[1]
        } else {
            value = this.store.getItem(key)
        }
        return value ? decodeURIComponent(value) : null;
    }

    async clear(key?: string) {
        if (this.isStorageAvailable()) {
            if (key) {
                document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            } else {
                document.cookie = '';
            }
        } else {
            if (key) {
                this.store.removeItem(key)
            } else {
                this.store.clear()
            }
        }
    }
}

export default Cookie.getInstance()