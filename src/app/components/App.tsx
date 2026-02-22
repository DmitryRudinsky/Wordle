import { observer } from 'mobx-react';
import React from 'react';

import { useStores } from '@/app/hooks/useStores.ts';
import { windowType } from '@/app/interfaces/window.ts';
import { Dictionary } from '@/widgets/components/Dictionary/Dictionary.tsx';
import { Footer } from '@/widgets/components/Footer/Footer.tsx';
import { Header } from '@/widgets/components/Header/Header';
import { MainGame } from '@/widgets/components/MainGame/MainGame.tsx';
import { Question } from '@/widgets/components/Question/Question.tsx';
import { Settings } from '@/widgets/components/Settings/Settngs.tsx';
import { Stats } from '@/widgets/components/Stats/Stats.tsx';

import styles from './App.module.scss';

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
        <div className={styles.app}>
            <Header />
            <div className={styles.appContent}>{renderScreen({ window })}</div>
            <Footer />
        </div>
    );
});
