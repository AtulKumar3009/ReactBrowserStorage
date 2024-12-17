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

export type SetReturnType<T extends StorageType> =
    T extends StorageType.INDEXED_DB ? Promise<boolean> : boolean;

export type GetReturnType<T extends StorageType> =
    T extends StorageType.INDEXED_DB ? Promise<any> : any;

export type ClearReturnType<T extends StorageType> =
    T extends StorageType.INDEXED_DB ? Promise<boolean> : boolean;