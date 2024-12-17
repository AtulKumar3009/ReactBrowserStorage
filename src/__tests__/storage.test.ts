import "core-js/stable/structured-clone";
import "fake-indexeddb/auto";
import storage, { configureStorage } from '../';
import { StorageType } from '../types';
import { testData } from './data';

describe('Storage tests', () => {

    beforeAll(() => {
        configureStorage({ encryptionKey: 'test-key', encodeKey: true });
    })

    Object.values(StorageType).forEach(storageType => {
        testData.forEach(({ type: dataType, data }) => {
            it(`should read, write and delete in ${storageType} storage data ${dataType} type correctly - plain`, async () => {
                const key = `${storageType}-${dataType}-plain`

                const saved = await storage[storageType].set(key, data)
                expect(saved).toBe(true)

                let value = await storage[storageType].get(key)
                expect(data).toEqual(value);

                const cleared = await storage[storageType].clear(key)
                expect(cleared).toBe(true)

                value = await storage[storageType].get(key)
                expect(value).toBeNull();
            });
        })
    })

    Object.values(StorageType).forEach(storageType => {
        testData.forEach(({ type: dataType, data }) => {
            it(`should read, write and delete in ${storageType} storage data ${dataType} type correctly - encrypted`, async () => {
                const key = `${storageType}-${dataType}-encrypted`

                const saved = await storage[storageType].set(key, data, true)
                expect(saved).toBe(true)

                let value = await storage[storageType].get(key, true)
                expect(data).toEqual(value);

                const cleared = await storage[storageType].clear(key)
                expect(cleared).toBe(true)

                value = await storage[storageType].get(key)
                expect(value).toBeNull();
            });
        })
    })

});
