import { makeAutoObservable } from 'mobx';

export class ModalStore {
    isStatusModalActive = false;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    setStatusModalActive(state: boolean) {
        this.isStatusModalActive = state;
    }

    closeStatusModal() {
        this.isStatusModalActive = false;
    }
}

export type ModalStoreType = InstanceType<typeof ModalStore>;
