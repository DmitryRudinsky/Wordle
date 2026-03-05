import type { ModalStoreType } from '@/entities/store/modalStore';
import type { MainGameStoreType } from '@/widgets/store/mainGameStore.ts';

import type { AnimationStoreType } from '../animationStore';
import type { StatsStoreType } from '../statsStore';
import type { WordleStoreType } from '../wordleStore';

export interface RootStore {
    wordleStore: WordleStoreType;
    mainGameStore: MainGameStoreType;
    modalStore: ModalStoreType;
    animationStore: AnimationStoreType;
    statsStore: StatsStoreType;
}
