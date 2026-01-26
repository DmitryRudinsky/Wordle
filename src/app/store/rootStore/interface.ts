import type { MainGameStoreType } from '@/widgets/store/mainGameStore.ts';

import type { WindowStoreType } from '../windowStore';
import type { WordleStoreType } from '../wordleStore';

export interface RootStore {
    windowStore: WindowStoreType;
    wordleStore: WordleStoreType;
    mainGameStore: MainGameStoreType;
}
