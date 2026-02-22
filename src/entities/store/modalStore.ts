import { makeAutoObservable } from 'mobx';

export class ModalStore {
    isStatusModalActive = false;
    isGiveUpModalActive = false;
    isChallengeModalActive = false;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    setStatusModalActive(state: boolean) {
        this.isStatusModalActive = state;
    }

    closeStatusModal() {
        this.isStatusModalActive = false;
    }

    setGiveUpModalActive(state: boolean) {
        this.isGiveUpModalActive = state;
    }

    closeGiveUpModal() {
        this.isGiveUpModalActive = false;
    }

    setChallengeModalActive(state: boolean) {
        this.isChallengeModalActive = state;
    }

    closeChallengeModal() {
        this.isChallengeModalActive = false;
    }
}

export type ModalStoreType = InstanceType<typeof ModalStore>;
