export enum StorageType {
    LOCAL = 'local',
    SESSION = 'session',
    COOKIE = 'cookie',
    INDEXED_DB = 'indexedDB',
    TEMP = 'temp',
}

export interface StorageConfig {
    encryptionKey?: string;
    encodeKey?: boolean;

}

export interface StorageGeneric {
    set(key: string, value: string): Promise<any>;
    get(key: string): Promise<any>
    clear(key?: string): Promise<void>;
}

export interface StorageBrowser {
    setItem(key: string, value: string): any
    getItem(key: string): string | null
    removeItem(key: string): void
    clear(): void
}