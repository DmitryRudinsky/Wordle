import React from 'react';

import { GameButtonList } from '../../entities/GameButtonList/GameButtonList';
import globalStyle from '../../shared/global_styles/_global.module.scss';

export const MainGame: React.FC = () => {
    return (
        <section className='MainGame__section'>
            <div className={globalStyle.container}>
                <GameButtonList />
            </div>
        </section>
    );
};
