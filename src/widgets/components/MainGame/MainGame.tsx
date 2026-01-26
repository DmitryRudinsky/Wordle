import React from 'react';

import { GameButtonList } from '@/entities/GameButtonList/GameButtonList.tsx';
import globalStyle from '@/shared/global_styles/_global.module.scss';

import styles from './MainGame.module.scss';

export const MainGame: React.FC = () => {
    return (
        <section className={styles.mainGame}>
            <div className={globalStyle.container}>
                <GameButtonList />
            </div>
        </section>
    );
};
