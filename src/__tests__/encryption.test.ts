import { decrypt, encrypt } from "../encryption";
import { testData } from './data'

describe('Encryption', () => {
    const key = 'test-key';
    testData.forEach(({ type, data }) => {
        it(`should encrypt and decrypt data ${type} type correctly - static`, () => {
            const encrypted = encrypt(data, key, false);
            const decrypted = decrypt(encrypted, key, false);
            expect(decrypted).toEqual(data);
        });

        it(`should encrypt and decrypt data ${type} type correctly - dynamic`, () => {
            const encrypted = encrypt(data, key);
            const decrypted = decrypt(encrypted, key);
            expect(decrypted).toEqual(data);
        });
    })
});
