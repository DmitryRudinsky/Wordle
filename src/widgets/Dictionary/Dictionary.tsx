import React from 'react';

import global from '../../shared/global_styles/_global.module.scss'
import { Clue } from '../../shared/ui/Clue/Clue';
import classes from './Dictionary.module.scss'

interface SettingsInterface {
    setWindow: React.Dispatch<React.SetStateAction<string>>;
}

export const Dictionary: React.FC<SettingsInterface> = ({ setWindow }) => {
    return (
        <div className={classes.dictionary}>
            <div className={global.container}>
                <div className={classes.dictionaryInner}>
                    <Clue setWindow={setWindow}>Dictionary</Clue>
                </div>
            </div>
        </div>
    );
};