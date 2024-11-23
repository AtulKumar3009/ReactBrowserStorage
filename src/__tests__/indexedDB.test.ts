import "core-js/stable/structured-clone";
import "fake-indexeddb/auto";
import indexedDB from '../utils/indexedDB';

describe("IndexedDB", () => {
    const key = 'test-key';
    const testData = [
        { type: 'string', data: 'Hello, World!' },
        { type: 'number', data: 12345 },
        { type: 'boolean', data: true },
        { type: 'object', data: { name: 'John', age: 30 } },
        { type: 'array', data: [1, 2, 3, 4, 5] },
        { type: 'null', data: null },
    ];

    const { type, data } = { type: 'string', data: 'Hello, World!' }

    it(`should save and read data ${type} type correctly `, async () => {
        await indexedDB.set(key, data)
        const read = await indexedDB.get(key)
        expect(read).toEqual(data)
    });

    it(`should delete data ${type} type correctly`, async () => {
        await indexedDB.clear(key)
        const read = await indexedDB.get(key)
        expect(read).toBeNull()
    });



    // testData.forEach(({ type, data }) => {
    //     it(`should save and read data ${type} type correctly `, async () => {
    //         await indexedDB.set(key, data)
    //         const read = await indexedDB.get(key)
    //         expect(read).toEqual(data)
    //     });

    //     it(`should delete data ${type} type correctly`, async () => {
    //         await indexedDB.clear(key)
    //         const read = await indexedDB.get(key)
    //         expect(read).toBeNull()
    //     });
    // })
})