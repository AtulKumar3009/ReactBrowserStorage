import Session from '../utils/session'

describe('Session storage test', () => {
    test('Should save value in Session storage', () => {
        const saved = Session.set('key', 'value')
        expect(saved).toBe(true)
    })

    test('Should read value from Session storage', () => {
        const saved = Session.get('key')
        expect(saved).toBe('value')
    })

    test('Should clear value from Session storage', () => {
        const cleared = Session.clear('key')
        expect(cleared).toBeTruthy()
        const saved = Session.get('key')
        expect(saved).toBeNull()
    })
})
