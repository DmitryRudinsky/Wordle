import { observer } from 'mobx-react';
import React from 'react';

import { useStores } from '@/app/hooks/useStores.ts';
import { windowType } from '@/app/interfaces/window.ts';
import { AddWord } from '@/widgets/components/AddWord/AddWord.tsx';
import { Dictionary } from '@/widgets/components/Dictionary/Dictionary.tsx';
import { Header } from '@/widgets/components/Header/Header';
import { MainGame } from '@/widgets/components/MainGame/MainGame.tsx';
import { Question } from '@/widgets/components/Question/Question.tsx';
import { Settings } from '@/widgets/components/Settings/Settngs.tsx';
import { Stats } from '@/widgets/components/Stats/Stats.tsx';

interface RenderScreenProps {
    window: windowType;
}

export const App = observer(() => {
    const { windowStore } = useStores();
    const window = windowStore.window;

    if (!window) {
        return null;
    }

    const renderScreen: React.FC<RenderScreenProps> = ({ window }) => {
        switch (window) {
            case 'game':
                return <MainGame />;
            case 'dictionary':
                return <Dictionary />;
            case 'add':
                return <AddWord />;
            case 'giveUp':
                return <p>give up</p>;
            case 'stats':
                return <Stats />;
            case 'settings':
                return <Settings />;
            case 'question':
                return <Question />;
            default:
                return null;
        }
    };

    return (
        <main className='main'>
            <Header />
            {renderScreen({ window })}
        </main>
    );
});
