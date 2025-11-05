type Watcher<T> = (value: T) => void;

interface ReadonlyWatched<T> {
    get(): T;
    derive<U>(fn: (value: T) => U): ReadonlyWatched<U>;
    watch(callback: Watcher<T>): () => void;
    watchFor(value: T, callback: Watcher<T>): () => void;
}

export class Watched<T> {

    private _watchers: Set<Watcher<T>> = new Set();

    constructor(
        private _value: T,
    ) { }

    set(value: T) {
        if (value !== this._value) {
            this._value = value;
            this.notify();
        }
    }

    get(): T {
        return this._value;
    }

    watch(callback: Watcher<T>): () => void {
        this._watchers.add(callback);
        callback(this._value);
        return () => {
            this._watchers.delete(callback);
        };
    }

    watchFor(value: T, callback: Watcher<T>): () => void {
        const newCallback = () => {
            if (value === this._value) {
                callback(this._value)
            }
        };
        this._watchers.add(newCallback);
        return () => {
            this._watchers.delete(newCallback);
        }
    }

    derive<U>(fn: (value: T) => U): ReadonlyWatched<U> {
        const initial = fn(this._value);
        const derived = new Watched<U>(initial);
        this.watch(value => {
            derived.set(fn(value));
        });
        derived.notify();
        return derived.asReadonly();
    }

    asReadonly(): ReadonlyWatched<T> {
        return {
            get: this.get.bind(this),
            derive: this.derive.bind(this),
            watch: this.watch.bind(this),
            watchFor: this.watchFor.bind(this),
        };
    }
    
    private notify() {
        for (const callback of this._watchers) {
            callback(this._value);
        }
    }
}