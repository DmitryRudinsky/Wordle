import classNames from 'classnames';
import { observer } from 'mobx-react';
import React from 'react';

import { useStores } from '@/app/hooks/useStores.ts';

import styles from './KeyButton.module.scss';

interface KeyButtonProps {
    children: string | React.ReactNode;
    action?: 'backspace' | 'enter' | 'letter';
}

export const KeyButton: React.FC<KeyButtonProps> = observer(({ children, action = 'letter' }) => {
    const { mainGameStore, animationStore, wordleStore } = useStores();
    const { usedLetters } = mainGameStore;
    const { randomWord, mapOfWords: words } = wordleStore;

    const letterKey = typeof children === 'string' ? children : '';
    const letterUsedState = usedLetters?.[letterKey];
    const shouldReveal = letterUsedState !== undefined && action === 'letter';

    const handleClick = () => {
        if (action === 'backspace') {
            mainGameStore.backspace();
        } else if (action === 'enter') {
            if (!randomWord) {
                return;
            }

            mainGameStore.submitWord({ words, selectedWord: randomWord });
        } else {
            mainGameStore.typeLetter(letterKey.toUpperCase());
        }
    };

    const keyRevealDelay = wordleStore.lettersNumber
        ? animationStore.getKeyboardRevealDelay(wordleStore.lettersNumber)
        : 0;

    const revealStyle = shouldReveal ? { transitionDelay: `${keyRevealDelay}ms` } : undefined;

    return (
        <button
            style={revealStyle}
            className={classNames(styles.keyButton, {
                [styles.wide]: action === 'backspace' || action === 'enter',
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
