import crypto from 'crypto-js';

export const encrypt = (data: any, key: string, dynamic = true): string => {
    data = JSON.stringify(data)
    return (new Encryption()).encrypt(data, key, dynamic)

};

export const decrypt = (cipher: string, key: string, dynamic = true): string => {
    try {
        return JSON.parse(new Encryption().decrypt(cipher, key, dynamic))
    } catch (error) {
        return cipher
    }
};


class Encryption {
    private k(key: string) {
        const a = (start: number) => Array.from({ length: 32 }).map((_, i) => ((i + i + 7) ** 2) + start).map(code => String.fromCharCode(code)).join('')
        return `${a(100)}${key}${a(200)}`
    }
    encrypt(data: any, key: string, dynamic: boolean) {
        key = this.k(key)
        if (dynamic) return crypto.AES.encrypt(data, key).toString();

        const hash = this.makehash(key)
        const nextHash = this.keyIterator(hash)
        const encrypted = data.split('').map((char: string) => {
            const getCode = (char: string) => {
                return char.charCodeAt(0)
            }

            const code = getCode(char) + getCode(nextHash())
            return String.fromCharCode(code)
        }).join('')
        return this.toBase64(encrypted)
    }

    decrypt(cipher: string, key: string, dynamic: boolean) {
        key = this.k(key)
        if (dynamic) {
            const bytes = crypto.AES.decrypt(cipher, key);
            return bytes.toString(crypto.enc.Utf8);
        }
        if (!cipher) return cipher
        const hash = this.makehash(key)
        const nextHash = this.keyIterator(hash)
        return this.fromBase64(cipher).split('').map((char: string) => {
            const getCode = (char: string) => {
                return char.charCodeAt(0)
            }

            const code = getCode(char) - getCode(nextHash())
            return String.fromCharCode(code)
        }).join('')
    }

    private suffleString(str: string) {
        const hashValues = Array.from(str).map((char, index) => {
            const hash = crypto.HmacSHA256(char + index, str).toString(crypto.enc.Hex);
            return { char, hash };
        });
        hashValues.sort((a, b) => a.hash.localeCompare(b.hash));
        return hashValues.map(item => item.char).join('');
    }

    private makehash(str: string) {
        const hash = crypto.SHA512(str).toString(crypto.enc.Base64url);
        return this.suffleString(hash)
    }

    private keyIterator(key: string) {
        let positionCurrent = 0;
        const positionMax = key.length - 1

        return () => {
            if (positionCurrent > positionMax) {
                positionCurrent = 0
            }
            return key[positionCurrent++]
        }
    }

    private toBase64(data: string) {
        const base64 = crypto.enc.Base64.stringify(crypto.enc.Utf8.parse(data));
        return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }

    private fromBase64(data: string) {
        const base64 = data.replace(/-/g, '+').replace(/_/g, '/');
        const paddedBase64 = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, '=');
        return crypto.enc.Utf8.stringify(crypto.enc.Base64.parse(paddedBase64));
    }
}
