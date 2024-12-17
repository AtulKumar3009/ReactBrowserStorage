class Cookie {
    private static instance: Cookie;

    static getInstance(): Cookie {
        if (!this.instance) {
            this.instance = new Cookie();
        }
        return this.instance;
    }
    private isStorageAvailable(): boolean {
        try {
            // Try setting a test cookie
            document.cookie = "test_cookie=test; path=/";
            const isAvailable = document.cookie.includes("test_cookie=test");

            // Clean up the test cookie
            document.cookie = "test_cookie=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";

            return isAvailable;
        } catch (error) {
            return false;
        }
    }

    set(key: string, value: string) {
        value = encodeURIComponent(value)
        if (this.isStorageAvailable()) {
            let cookie = `${key}=${value}; path=/`;
            document.cookie = cookie;
            return true
        }
        return false
    }

    get(key: string) {
        let value: string | null = null
        if (this.isStorageAvailable()) {
            const cookieValue = document.cookie.split(';').find(c => c.trim().startsWith(key + '='));
            if (!cookieValue) return null;
            value = cookieValue.split('=')[1]
        }
        return value ? decodeURIComponent(value) : null;
    }

    clear(key?: string) {
        if (this.isStorageAvailable()) {
            if (key) {
                document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            } else {
                document.cookie = '';
            }
            return true
        }
        return false
    }
}

export default Cookie.getInstance()