import React from 'react';

import global from '../../shared/global_styles/_global.module.scss';
import { Clue } from '../../shared/ui/Clue/Clue';
import classes from './Dictionary.module.scss';

export const Dictionary: React.FC = () => {
    return (
        <div className={classes.dictionary}>
            <div className={global.container}>
                <div className={classes.dictionaryInner}>
                    <Clue>Dictionary</Clue>
                </div>
            </div>
        </div>
    );
};
