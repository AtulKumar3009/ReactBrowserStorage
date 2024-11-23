import temp from '../utils/temp'

describe("Temp Storage", () => {
    const key = 'test-key';

    const { type, data } = { type: 'string', data: 'Hello, World!' }

    it(`should save and read data ${type} type correctly `, async () => {
        await temp.set(key, data)
        const read = await temp.get(key)
        expect(read).toEqual(data)
    });

    it(`should delete data ${type} type correctly`, async () => {
        await temp.clear(key)
        const read = await temp.get(key)
        expect(read).toBeNull()
    });
})