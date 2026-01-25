import type { WindowStoreType } from '../windowStore';
import type { WordleStoreType } from '../wordleStore';

export interface RootStore {
    windowStore: WindowStoreType;
    wordleStore: WordleStoreType;
}
