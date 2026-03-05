import React, { useMemo } from 'react';
import Cookies from 'universal-cookie';

import { isLang } from '@/app/interfaces/wordle.ts';

import { StoresContext } from './context';
import { RootStore } from './rootStore';

type Props = { children: React.ReactNode };

const cookies = new Cookies();

function getInitialLang() {
    const value = cookies.get('lang');

    if (isLang(value)) {
        return value;
    }

    return null;
}

export function StoresProvider({ children }: Props) {
    const rootStore = useMemo(() => new RootStore(getInitialLang()), []);

    return <StoresContext.Provider value={rootStore}>{children}</StoresContext.Provider>;
}
