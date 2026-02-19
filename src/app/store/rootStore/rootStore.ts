import { ModalStore, ModalStoreType } from '@/entities/store/modalStore';
import { MainGameStore, MainGameStoreType } from '@/widgets/store/mainGameStore';

import { WindowStore, WindowStoreType } from '../windowStore';
import { WordleStore, WordleStoreType } from '../wordleStore';

export class RootStore {
    windowStore: WindowStoreType;
    wordleStore: WordleStoreType;
    mainGameStore: MainGameStoreType;
    modalStore: ModalStoreType;

    constructor() {
        this.windowStore = new WindowStore();
        this.mainGameStore = new MainGameStore();
        this.modalStore = new ModalStore();
        this.wordleStore = new WordleStore(this);
    }
}
