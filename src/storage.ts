import { decrypt, encrypt } from './encryption';
import { StorageConfig, StorageType } from './types';
import Cookie from './utils/cookie';
import IndexedDB from './utils/indexedDB';
import Local from './utils/local';
import Session from './utils/session';
import Temp from './utils/temp';

class Storage {
    private static instance: Storage;
    private config: StorageConfig = {}

    private constructor() { }

    static getInstance(): Storage {
        if (!Storage.instance) {
            Storage.instance = new Storage();
        }
        return Storage.instance;
    }

    configure(config: StorageConfig) {
        if (Object.keys(this.config).length === 0) {
            this.config = config;
        }
    }

    private validateEncryption() {
        if (!this.config.encryptionKey) {
            throw new Error('Encryption configuration is missing.');
        }
    }

    private getStorage(type: StorageType) {
        switch (type) {
            case StorageType.LOCAL:
                return Local;
            case StorageType.SESSION:
                return Session;
            case StorageType.COOKIE:
                return Cookie;
            case StorageType.INDEXED_DB:
                return IndexedDB;
            case StorageType.TEMP:
                return Temp;
        }
    }



    set(type: StorageType, key: string, value: any, encryption: boolean) {
        const storage = this.getStorage(type);
        if (!storage) return false
        let data = JSON.stringify(value);

        if (encryption) {
            this.validateEncryption();
            data = encrypt(data, this.config.encryptionKey!);

            if (this.config.encodeKey) {
                key = encrypt(key, this.config.encryptionKey!, false);
            }
        }

        return storage.set(key, data)
    }

    get(type: StorageType, key: string, encryption: boolean) {
        const storage = this.getStorage(type);
        if (!storage) return null;

        if (encryption && this.config.encodeKey) {
            key = encrypt(key, this.config.encryptionKey!, false);
        }

        const getValue = (data: string | null) => {
            if (data && encryption) {
                this.validateEncryption();
                data = decrypt(data, this.config.encryptionKey!);
            }

            try {
                return data ? JSON.parse(data) : null;
            } catch (error) {
                return data
            }
        }

        const data = storage.get(key)
        if (data instanceof Promise) {
            return new Promise(resolve =>
                data.then(data => resolve(getValue(data)))
            )
        }
        return getValue(data)

    }

    clear(type: StorageType, encryption: boolean, key?: string) {
        const storage = this.getStorage(type);
        if (!storage) return false;
        if (key && encryption && this.config.encodeKey) {
            key = encrypt(key, this.config.encryptionKey!, false);
        }
        return storage.clear(key);

    }
}

export default Storage.getInstance();
