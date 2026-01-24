import React from 'react';
import globalStyle from '../../shared/global_styles/_global.module.scss'
import { GameButtonList } from "../../entities/GameButtonList/GameButtonList";

interface MainGameInterface {
    lettersCount: number
}


export const MainGame: React.FC<MainGameInterface> = ({ lettersCount }) => {
    return (
        <section className='MainGame__section'>
            <div className={globalStyle.container}>
                <GameButtonList lettersCount={lettersCount}/>
            </div>
        </section>
    );
};
