import React from 'react';

import global from '../../shared/global_styles/_global.module.scss';
import { Clue } from '../../shared/ui/Clue/Clue';
import classes from './Question.module.scss';

interface QuestionProps {
    setWindow: React.Dispatch<React.SetStateAction<string>>;
}

export const Question: React.FC<QuestionProps> = ({ setWindow }) => {
    return (
        <div className={classes.question}>
            <div className={global.container}>
                <div className={classes.questionInner}>
                    <Clue setWindow={setWindow}>Question</Clue>
                </div>
            </div>
        </div>
    );
};
