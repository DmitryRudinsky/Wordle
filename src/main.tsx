import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { App } from '@/app/components/App';
import { LangGate } from '@/app/components/LangGate';
import { DEFAULT_LANG } from '@/app/interfaces/wordle';
import { StoresProvider } from '@/app/store/rootStore/StoresProvider.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <StoresProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Navigate to={`/${DEFAULT_LANG}`} replace />} />
                    <Route path='/:lang' element={<LangGate />}>
                        <Route index element={<App />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </StoresProvider>
    </StrictMode>,
);
