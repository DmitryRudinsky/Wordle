import { useContext } from 'react';

import { StoresContext } from '@/app/store/rootStore/context.ts';
import type { RootStore } from '@/app/store/rootStore/interface.ts';

export const useStores = (): RootStore => {
    const stores = useContext(StoresContext);

    if (!stores) {
        throw new Error('useStores() must be used within the useStores');
    }

    return stores;
};
