import { openDB, IDBPDatabase } from 'idb';

const DB_NAME = 'react-browser-storage'
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

  async set(key: string, value: any) {
    const db = await this.dbPromise;
    return db.put(STORE_NAME, value, key);
  }

  async get(key: string): Promise<any> {
    const db = await this.dbPromise;
    return await db.get(STORE_NAME, key);
  }

  async clear(key?: string) {
    const db = await this.dbPromise;
    if (key) {
      await db.delete(STORE_NAME, key);
    } else {
      await db.clear(STORE_NAME);
    }
  }
}

export default IndexedDB.getInstance();