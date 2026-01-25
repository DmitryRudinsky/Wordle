import React from 'react';

import global from '../../shared/global_styles/_global.module.scss'
import { Clue } from '../../shared/ui/Clue/Clue';
import classes from './AddWord.module.scss'

interface SettingsInterface {
    setWindow: React.Dispatch<React.SetStateAction<string>>;
}

export const AddWord: React.FC<SettingsInterface> = ({ setWindow }) => {
    return (
        <div className={classes.AddWord}>
            <div className={global.container}>
                <div className={classes.AddWordInner}>
                    <Clue setWindow={setWindow}>Add Word</Clue>
                </div>
            </div>
        </div>
    );
};