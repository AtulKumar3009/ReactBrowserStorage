import { StorageConfig, StorageType } from './types';
import Storage from './storage'

export const configureStorage = (config: StorageConfig) => {
    Storage.configure(config)
}

const createStorageMethods = (type: StorageType) => ({
    set: (key: string, value: any, encryption = false) => Storage.set(type, key, value, encryption),
    get: (key: string, encryption = false) => Storage.get(type, key, encryption),
    clear: (key?: string, encryption = false) => Storage.clear(type, encryption, key)
});

const storage = {
    local: createStorageMethods(StorageType.LOCAL),
    session: createStorageMethods(StorageType.SESSION),
    cookie: createStorageMethods(StorageType.COOKIE),
    indexedDB: createStorageMethods(StorageType.INDEXED_DB),
    temp: createStorageMethods(StorageType.TEMP),
};

export default storage;
