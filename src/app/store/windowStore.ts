import { makeAutoObservable } from 'mobx';

import { windowType } from '@/app/interfaces/window.ts';

export class WindowStore {
    windowValue: windowType | null = null;

    constructor() {
        makeAutoObservable(this);
        this.init();
    }

    init() {
        this.setWindowValue('game');
    }

    get window() {
        return this.windowValue;
    }

    setWindowValue(newValue: windowType) {
        this.windowValue = newValue;
    }
}

export type WindowStoreType = InstanceType<typeof WindowStore>;
