import "core-js/stable/structured-clone";
import "fake-indexeddb/auto";
import IndexedDB from '../utils/indexedDB';

describe('IndexedDB storage test', () => {
    test('Should save value in IndexedDB storage', async () => {
        const saved = await IndexedDB.set('key', 'value')
        expect(saved).toBe(true)
    })

    test('Should read value from IndexedDB storage', async () => {
        const saved = await IndexedDB.get('key')
        expect(saved).toBe('value')
    })

    test('Should clear value from IndexedDB storage', async () => {
        const cleared = await IndexedDB.clear('key')
        expect(cleared).toBeTruthy()
        const saved = await IndexedDB.get('key')
        expect(saved).toBeNull()
    })
})
