import { ModalStore, ModalStoreType } from '@/entities/store/modalStore';
import { lang } from '@/app/interfaces/wordle.ts';
import { MainGameStore, MainGameStoreType } from '@/widgets/store/mainGameStore';

import { AnimationStore, AnimationStoreType } from '../animationStore';
import { StatsStore, StatsStoreType } from '../statsStore';
import { WordleStore, WordleStoreType } from '../wordleStore';

export class RootStore {
    wordleStore: WordleStoreType;
    mainGameStore: MainGameStoreType;
    modalStore: ModalStoreType;
    animationStore: AnimationStoreType;
    statsStore: StatsStoreType;

    constructor(initialLang: lang | null) {
        this.mainGameStore = new MainGameStore();
        this.modalStore = new ModalStore();
        this.wordleStore = new WordleStore(this, initialLang);
        this.animationStore = new AnimationStore();
        this.statsStore = new StatsStore();
    }
}
