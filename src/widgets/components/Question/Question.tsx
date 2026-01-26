import React from 'react';

import global from '@/shared/global_styles/_global.module.scss';
import { Clue } from '@/shared/ui/Clue/Clue.tsx';
import classes from '@/widgets/components/Question/Question.module.scss';

export const Question: React.FC = () => {
    return (
        <div className={classes.question}>
            <div className={global.container}>
                <div className={classes.questionInner}>
                    <Clue>Question</Clue>
                </div>
            </div>
        </div>
    );
};
