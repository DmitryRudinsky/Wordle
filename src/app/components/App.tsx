import { observer } from 'mobx-react';
import { useState } from 'react';

import { AddWord } from '@/widgets/AddWord/AddWord';
import { Dictionary } from '@/widgets/Dictionary/Dictionary';
import { Header } from '@/widgets/Header/Header';
import { MainGame } from '@/widgets/MainGame/MainGame';
import { Question } from '@/widgets/Question/Question';
import { Settings } from '@/widgets/Settings/Settngs';
import { Stats } from '@/widgets/Stats/Stats';

export const App = observer(() => {
    const [window, setWindow] = useState<string>('game');

    return (
        <main className='main'>
            <Header setWindow={setWindow} window={window} />
            {window === 'game' && <MainGame />}
            {window === 'dictionary' && <Dictionary setWindow={setWindow} />}
            {window === 'add' && <AddWord setWindow={setWindow} />}
            {window === 'giveUp' && <p>giveUp</p>}
            {window === 'stats' && <Stats setWindow={setWindow} />}
            {window === 'settings' && <Settings setWindow={setWindow} />}
            {window === 'question' && <Question setWindow={setWindow} />}
        </main>
    );
});
