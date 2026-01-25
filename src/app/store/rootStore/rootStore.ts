import { WindowStore, WindowStoreType } from '../windowStore';
import { WordleStore, WordleStoreType } from '../wordleStore';

export class RootStore {
    windowStore: WindowStoreType;
    wordleStore: WordleStoreType;

    constructor() {
        this.windowStore = new WindowStore();
        this.wordleStore = new WordleStore();
    }
}
