import { observer } from 'mobx-react';
import React from 'react';

import { useStores } from '@/app/hooks/useStores.ts';
import global from '@/shared/global_styles/_global.module.scss';
import { Clue } from '@/shared/ui/Clue/Clue.tsx';
import styles from '@/widgets/components/Settings/Settings.module.scss';

export const Settings: React.FC = observer(() => {
    const { wordleStore } = useStores();
    return (
        <div className={styles.settings}>
            <div className={global.container}>
                <div className={styles.settingsInner}>
                    <Clue>Settings</Clue>
                    <p>Number of Letters</p>
                    {Array.from({ length: 8 }, (_, index) => (
                        <button
                            onClick={() => wordleStore.setLettersNumber(index + 4)}
                            type='button'
                            className={
                                wordleStore.lettersNumber === index + 4
                                    ? styles.settingsButtonSelected
                                    : styles.settingsButton
                            }
                            key={index}
                        >
                            {index + 4}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
});
