import React from 'react';

import global from '@/shared/global_styles/_global.module.scss';
import { Clue } from '@/shared/ui/Clue/Clue.tsx';
import styles from '@/widgets/components/Question/Question.module.scss';

export const Question: React.FC = () => {
    return (
        <div className={styles.question}>
            <div className={global.container}>
                <div className={styles.questionInner}>
                    <Clue>Question</Clue>

                    <div className={styles.content}>
                        <p className={styles.intro}>
                            Wordle — это игра, в которой вам нужно угадать скрытое слово за шесть
                            попыток. После каждой догадки вы получаете подсказки, которые помогают
                            найти верное слово.
                        </p>

                        <h2 className={styles.title}>Правила Wordle</h2>

                        <p className={styles.text}>
                            Каждая догадка должна быть настоящим пятибуквенным словом. После
                            отправки догадки игра даёт цветовую подсказку:
                        </p>

                        <ul className={styles.rules}>
                            <li className={styles.rule}>
                                <span className={styles.emoji}>🟩</span>
                                <span className={styles.ruleText}>
                                    <strong>Зеленый:</strong> Буква стоит на правильном месте.
                                </span>
                            </li>
                            <li className={styles.rule}>
                                <span className={styles.emoji}>🟨</span>
                                <span className={styles.ruleText}>
                                    <strong>Желтый:</strong> Буква есть в слове, но расположена в
                                    другом месте.
                                </span>
                            </li>
                            <li className={styles.rule}>
                                <span className={styles.emoji}>⬜</span>
                                <span className={styles.ruleText}>
                                    <strong>Серый:</strong> Буквы нет в слове совсем.
                                </span>
                            </li>
                        </ul>

                        <p className={styles.text}>
                            Используйте полученные подсказки, чтобы уточнять свои предположения и
                            найти скрытое слово. Ваша цель — угадать его за шесть попыток.
                        </p>

                        <p className={styles.footer}>
                            Получайте удовольствие и постарайтесь угадать слово как можно быстрее!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
