import React from 'react';
import globalStyle from '../../shared/global_styles/_global.module.scss'
import GameButtonList from "../../entities/GameButtonList/GameButtonList";

const MainGame: React.FC = () => {
    return (
        <section className='MainGame__section'>
            <div className={globalStyle.container}>
                <GameButtonList letterCount={5}/>
            </div>
        </section>
    );
};

export default MainGame;