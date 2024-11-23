import local from '../utils/local'

describe("Local Storage", () => {
    const key = 'test-key';

    const { type, data } = { type: 'string', data: 'Hello, World!' }

    it(`should save and read data ${type} type correctly `, async () => {
        await local.set(key, data)
        const read = await local.get(key)
        expect(read).toEqual(data)
    });

    it(`should delete data ${type} type correctly`, async () => {
        await local.clear(key)
        const read = await local.get(key)
        expect(read).toBeNull()
    });
})