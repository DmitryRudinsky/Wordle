import { observer } from 'mobx-react';

import { useStores } from '@/app/hooks/useStores.ts';
import { AddWord } from '@/widgets/AddWord/AddWord';
import { Dictionary } from '@/widgets/Dictionary/Dictionary';
import { Header } from '@/widgets/Header/Header';
import { MainGame } from '@/widgets/MainGame/MainGame';
import { Question } from '@/widgets/Question/Question';
import { Settings } from '@/widgets/Settings/Settngs';
import { Stats } from '@/widgets/Stats/Stats';

export const App = observer(() => {
    const { windowStore } = useStores();
    const window = windowStore.window;

    return (
        <main className='main'>
            <Header />
            {window === 'game' && <MainGame />}
            {window === 'dictionary' && <Dictionary />}
            {window === 'add' && <AddWord />}
            {window === 'giveUp' && <p>giveUp</p>}
            {window === 'stats' && <Stats />}
            {window === 'settings' && <Settings />}
            {window === 'question' && <Question />}
        </main>
    );
});
