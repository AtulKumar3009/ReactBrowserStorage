import Temp from '../utils/temp'

describe('Temp storage test', () => {
    test('Should save value in Temp storage', () => {
        const saved = Temp.set('key', 'value')
        expect(saved).toBe(true)
    })

    test('Should read value from Temp storage', () => {
        const saved = Temp.get('key')
        expect(saved).toBe('value')
    })

    test('Should clear value from Temp storage', () => {
        const cleared = Temp.clear('key')
        expect(cleared).toBeTruthy()
        const saved = Temp.get('key')
        expect(saved).toBeNull()
    })
})
