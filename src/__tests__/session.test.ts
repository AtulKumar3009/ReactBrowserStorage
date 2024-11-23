import session from '../utils/session'

describe("Session Storage", () => {
    const key = 'test-key';

    const { type, data } = { type: 'string', data: 'Hello, World!' }

    it(`should save and read data ${type} type correctly `, async () => {
        await session.set(key, data)
        const read = await session.get(key)
        expect(read).toEqual(data)
    });

    it(`should delete data ${type} type correctly`, async () => {
        await session.clear(key)
        const read = await session.get(key)
        expect(read).toBeNull()
    });
})