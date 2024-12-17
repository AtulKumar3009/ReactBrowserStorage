import Cookie from '../utils/cookie'

describe('Cookie storage test', () => {
    test('Should save value in Cookie storage', () => {
        const saved = Cookie.set('key', 'value')
        expect(saved).toBe(true)
    })

    test('Should read value from Cookie storage', () => {
        const saved = Cookie.get('key')
        expect(saved).toBe('value')
    })

    test('Should clear value from Cookie storage', () => {
        const cleared = Cookie.clear('key')
        expect(cleared).toBeTruthy()
        const saved = Cookie.get('key')
        expect(saved).toBeNull()
    })
})