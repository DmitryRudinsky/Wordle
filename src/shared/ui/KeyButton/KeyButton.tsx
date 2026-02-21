import classNames from 'classnames';
import { observer } from 'mobx-react';
import React from 'react';

import { useStores } from '@/app/hooks/useStores.ts';

import styles from './KeyButton.module.scss';

interface KeyButtonProps {
    children: string;
}

export const KeyButton: React.FC<KeyButtonProps> = observer(({ children }) => {
    const { mainGameStore, animationStore, wordleStore } = useStores();
    const { usedLetters } = mainGameStore;

    const letterUsedState = usedLetters?.[children];
    const shouldReveal = letterUsedState !== undefined;

    const handleClick = () => {
        mainGameStore.typeLetter(children.toUpperCase());
    };

    const keyRevealDelay = wordleStore.lettersNumber
        ? animationStore.getKeyboardRevealDelay(wordleStore.lettersNumber)
        : 0;

    const revealStyle = shouldReveal ? { transitionDelay: `${keyRevealDelay}ms` } : undefined;

    return (
        <button
            style={revealStyle}
            className={classNames(styles.keyButton, {
                [styles.reveal]: shouldReveal,
                [styles[animationStore.LETTER_STATES.CORRECT]]: letterUsedState === true,
                [styles[animationStore.LETTER_STATES.ELSEWHERE]]: letterUsedState === false,
                [styles[animationStore.LETTER_STATES.INCORRECT]]: letterUsedState === null,
            })}
            onClick={handleClick}
        >
            {children}
        </button>
    );
});
