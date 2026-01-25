import { createContext } from 'react';

import type { RootStore } from './interface';

export const StoresContext = createContext<RootStore | null>(null);
