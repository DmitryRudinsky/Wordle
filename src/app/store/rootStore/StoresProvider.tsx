import React, { useMemo } from 'react';

import { StoresContext } from './context';
import { RootStore } from './rootStore';

type Props = { children: React.ReactNode };

export function StoresProvider({ children }: Props) {
    const rootStore = useMemo(() => new RootStore(), []);

    return <StoresContext.Provider value={rootStore}>{children}</StoresContext.Provider>;
}
