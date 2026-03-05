import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { App } from '@/app/components/App';
import { StoresProvider } from '@/app/store/rootStore/StoresProvider.tsx';
import { Dictionary } from '@/widgets/components/Dictionary/Dictionary.tsx';
import { MainGame } from '@/widgets/components/MainGame/MainGame.tsx';
import { Question } from '@/widgets/components/Question/Question.tsx';
import { Settings } from '@/widgets/components/Settings/Settngs.tsx';
import { Stats } from '@/widgets/components/Stats/Stats.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <StoresProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<App />}>
                        <Route index element={<MainGame />} />
                        <Route path='dictionary' element={<Dictionary />} />
                        <Route path='stats' element={<Stats />} />
                        <Route path='settings' element={<Settings />} />
                        <Route path='question' element={<Question />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </StoresProvider>
    </StrictMode>,
);
