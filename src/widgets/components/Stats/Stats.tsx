import React from 'react';

import global from '@/shared/global_styles/_global.module.scss';
import { Clue } from '@/shared/ui/Clue/Clue.tsx';
import classes from '@/widgets/components/Stats/Stats.module.scss';

export const Stats: React.FC = () => {
    return (
        <div className={classes.Stats}>
            <div className={global.container}>
                <div className={classes.StatsInner}>
                    <Clue>Statistics</Clue>
                </div>
            </div>
        </div>
    );
};
