import React from 'react';

import global from '../../shared/global_styles/_global.module.scss';
import { Clue } from '../../shared/ui/Clue/Clue';
import classes from './AddWord.module.scss';

export const AddWord: React.FC = () => {
    return (
        <div className={classes.AddWord}>
            <div className={global.container}>
                <div className={classes.AddWordInner}>
                    <Clue>Add Word</Clue>
                </div>
            </div>
        </div>
    );
};
