class Temp {
    private static instance: Temp;
    private store: Map<string, string>;

    constructor() {
        this.store = new Map();
    }

    static getInstance(): Temp {
        if (!Temp.instance) {
            Temp.instance = new Temp();
        }
        return Temp.instance;
    }

    set(key: string, value: string): void {
        this.store.set(key, value);
    }

    get(key: string): string | undefined {
        return this.store.get(key);
    }

    delete(key: string): void {
        this.store.delete(key);
    }

    clear(): void {
        this.store.clear();
    }
}

export default Temp.getInstance();
