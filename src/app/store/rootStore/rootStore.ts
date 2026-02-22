import { ModalStore, ModalStoreType } from '@/entities/store/modalStore';
import { MainGameStore, MainGameStoreType } from '@/widgets/store/mainGameStore';

import { AnimationStore, AnimationStoreType } from '../animationStore';
import { StatsStore, StatsStoreType } from '../statsStore';
import { WindowStore, WindowStoreType } from '../windowStore';
import { WordleStore, WordleStoreType } from '../wordleStore';

export class RootStore {
    windowStore: WindowStoreType;
    wordleStore: WordleStoreType;
    mainGameStore: MainGameStoreType;
    modalStore: ModalStoreType;
    animationStore: AnimationStoreType;
    statsStore: StatsStoreType;

    constructor() {
        this.windowStore = new WindowStore();
        this.mainGameStore = new MainGameStore();
        this.modalStore = new ModalStore();
        this.wordleStore = new WordleStore(this);
        this.animationStore = new AnimationStore();
        this.statsStore = new StatsStore();
    }
}
