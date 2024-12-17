import Local from '../utils/local'

describe('Local storage test', () => {
    test('Should save value in local storage', () => {
        const saved = Local.set('key', 'value')
        expect(saved).toBe(true)
    })

    test('Should read value from local storage', () => {
        const saved = Local.get('key')
        expect(saved).toBe('value')
    })

    test('Should clear value from local storage', () => {
        const cleared = Local.clear('key')
        expect(cleared).toBeTruthy()
        const saved = Local.get('key')
        expect(saved).toBeNull()
    })
})