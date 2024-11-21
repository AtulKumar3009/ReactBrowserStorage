export default class Local {

    private isStorageAvailable(): boolean {
        try {
            return (
                typeof localStorage !== 'undefined' &&
                'getItem' in localStorage &&
                'setItem' in localStorage &&
                'removeItem' in localStorage &&
                'clear' in localStorage
            );
        } catch {
            return false; // Return false if accessing localStorage throws an error
        }
    }
    set(key: string, value: string) {
        if (this.isStorageAvailable()) {
            localStorage.setItem(key, value);
        }
    }

    get(key: string): string | null {
        if (!this.isStorageAvailable()) return null
        return localStorage.getItem(key);
    }

    clear(key?: string): void {
        if (this.isStorageAvailable()) {
            if (key) {
                localStorage.removeItem(key);
            } else {
                localStorage.clear();
            }
        }
    }
}