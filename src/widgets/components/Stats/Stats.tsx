import { observer } from 'mobx-react';
import React from 'react';

import { useStores } from '@/app/hooks/useStores.ts';
import global from '@/shared/global_styles/_global.module.scss';
import { Clue } from '@/shared/ui/Clue/Clue.tsx';
import styles from '@/widgets/components/Stats/Stats.module.scss';
import { DEFAULT_MAX_ATTEMPTS } from '@/widgets/interface/mainGame.ts';

export const Stats: React.FC = observer(() => {
    const { statsStore } = useStores();

    const handleShare = async () => {
        const text = statsStore.getShareText();
        if (navigator.share) {
            try {
                await navigator.share({ text });
            } catch {
                console.error('Share cancelled');
            }
        } else {
            try {
                await navigator.clipboard.writeText(text);
                alert('Статистика скопирована в буфер обмена!');
            } catch (error) {
                console.error('Failed to copy:', error);
            }
        }
    };

    const maxDistributionValue = Math.max(...Object.values(statsStore.attemptsDistribution), 1);

    const allAttempts = Array.from({ length: DEFAULT_MAX_ATTEMPTS }, (_, i) => i + 1);

    return (
        <div className={styles.stats}>
            <div className={global.container}>
                <div className={styles.statsInner}>
                    <Clue>Statistics</Clue>

                    <div className={styles.statsGrid}>
                        <div className={styles.statCard}>
                            <div className={styles.statValue}>{statsStore.totalGames}</div>
                            <div className={styles.statLabel}>Всего игр</div>
                        </div>
                        <div className={styles.statCard}>
                            <div className={styles.statValue}>{statsStore.gamesWon}</div>
                            <div className={styles.statLabel}>Побед</div>
                        </div>
                        <div className={styles.statCard}>
                            <div className={styles.statValue}>{statsStore.winPercentage}%</div>
                            <div className={styles.statLabel}>Процент побед</div>
                        </div>
                    </div>

                    <div className={styles.statsGrid}>
                        <div className={styles.statCard}>
                            <div className={styles.statValue}>{statsStore.currentStreak}</div>
                            <div className={styles.statLabel}>Текущая серия</div>
                        </div>
                        <div className={styles.statCard}>
                            <div className={styles.statValue}>{statsStore.bestStreak}</div>
                            <div className={styles.statLabel}>Лучшая серия</div>
                        </div>
                        <div className={styles.statCard}>
                            <div className={styles.statValue}>{statsStore.bestAttempt ?? '-'}</div>
                            <div className={styles.statLabel}>Лучшая попытка</div>
                        </div>
                    </div>

                    <button onClick={handleShare} className={styles.shareButton}>
                        Поделиться статистикой
                    </button>

                    <div className={styles.distribution}>
                        <h3 className={styles.distributionTitle}>
                            Распределение побед по попыткам
                        </h3>
                        <div className={styles.distributionBars}>
                            {allAttempts.map((attempts) => {
                                const count = statsStore.attemptsDistribution[attempts] ?? 0;
                                const percentage = (count / maxDistributionValue) * 100;
                                return (
                                    <div key={attempts} className={styles.barRow}>
                                        <div className={styles.barLabel}>{attempts}</div>
                                        <div className={styles.barContainer}>
                                            <div
                                                className={styles.bar}
                                                style={{ width: `${percentage}%` }}
                                            >
                                                <span className={styles.barValue}>{count}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});
