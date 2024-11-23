import cookie from '../utils/cookie'

describe("Cookie Storage", () => {
    const key = 'test-key';

    const { type, data } = { type: 'string', data: 'Hello, World!' }

    it(`should save and read data ${type} type correctly `, async () => {
        await cookie.set(key, data)
        const read = await cookie.get(key)
        expect(read).toEqual(data)
    });

    it(`should delete data ${type} type correctly`, async () => {
        await cookie.clear(key)
        const read = await cookie.get(key)
        expect(read).toBeNull()
    });
})