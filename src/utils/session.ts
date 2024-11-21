export default class Session {
    private isStorageAvailable(): boolean {
        try {
            return (
                typeof sessionStorage !== 'undefined' &&
                'getItem' in sessionStorage &&
                'setItem' in sessionStorage &&
                'removeItem' in sessionStorage &&
                'clear' in sessionStorage
            );
        } catch {
            return false; // Return false if accessing sessionStorage throws an error
        }
    }
    set(key: string, value: string): void {
        if (this.isStorageAvailable()) {
            sessionStorage.setItem(key, value);
        }
    }

    get(key: string): string | null {
        if (!this.isStorageAvailable()) return null
        return sessionStorage.getItem(key);
    }

    clear(key?: string): void {
        if (this.isStorageAvailable()) {
            if (key) {
                sessionStorage.removeItem(key);
            } else {
                sessionStorage.clear();
            }
        }
    }
}