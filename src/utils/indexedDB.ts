import { IDBPDatabase, openDB } from 'idb';

const DB_NAME = 'WebStorageHelper'
const STORE_NAME = DB_NAME + '-store';

class IndexedDB {
  private static instance: IndexedDB;
  private dbPromise: Promise<IDBPDatabase>;

  constructor() {
    this.dbPromise = openDB(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      },
    });
  }

  static getInstance(): IndexedDB {
    if (!IndexedDB.instance) {
      IndexedDB.instance = new IndexedDB();
    }
    return IndexedDB.instance;
  }

  async set(key: string, value: string) {
    const db = await this.dbPromise;
    const savedKey = await db.put(STORE_NAME, value, key);
    return savedKey === key
  }

  async get(key: string) {
    const db = await this.dbPromise;
    const value: string = await db.get(STORE_NAME, key);
    return value === undefined ? null : value;
  }

  async clear(key?: string) {
    try {
      const db = await this.dbPromise;
      if (key) {
        await db.delete(STORE_NAME, key);
      } else {
        await db.clear(STORE_NAME);
      }
      return true
    } catch (error) {
      return false
    }
  }
}

export default IndexedDB.getInstance();