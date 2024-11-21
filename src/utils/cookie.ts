export default class Cookie {
    private isStorageAvailable(): boolean {
        try {
            return (
                typeof document.cookie !== 'undefined'
            );
        } catch {
            return false; // Return false if accessing sessionStorage throws an error
        }
    }

    set(key: string, value: string, expires?: Date, path?: string, domain?: string, secure?: boolean) {
        if (this.isStorageAvailable()) {
            let cookie = `${key}=${encodeURIComponent(value)}`;
            if (expires) cookie += `; expires=${expires.toUTCString()}`;
            if (path) cookie += `; path=${path}`;
            if (domain) cookie += `; domain=${domain}`;
            if (secure) cookie += '; secure';
            document.cookie = cookie;
        }
    }

    get(key: string) {
        if (!this.isStorageAvailable()) return null
        const cookieValue = document.cookie.split(';').find(c => c.trim().startsWith(key + '='));
        if (!cookieValue) return null;
        return decodeURIComponent(cookieValue.split('=')[1]);
    }

    clear(key?: string) {
        if (this.isStorageAvailable()) {
            if (key) {
                document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            } else {
                document.cookie = '';
            }
        }
    }
}