import { makeAutoObservable } from 'mobx';

interface GameResult {
    won: boolean;
    attempts: number;
}

export class StatsStore {
    totalGames: number = 0;
    gamesWon: number = 0;
    currentStreak: number = 0;
    bestStreak: number = 0;
    bestAttempt: number | null = null;
    attemptsDistribution: Record<number, number> = {};
    private lastGameId: string | null = null;

    constructor() {
        makeAutoObservable(this);
        this.loadFromLocalStorage();
    }

    get winPercentage(): number {
        if (this.totalGames === 0) {
            return 0;
        }
        return Math.round((this.gamesWon / this.totalGames) * 100);
    }

    addGameResult({ won, attempts }: GameResult) {
        const gameId = `${Date.now()}-${won}-${attempts}`;

        if (this.lastGameId === gameId) {
            return;
        }

        this.lastGameId = gameId;
        this.totalGames += 1;

        if (won) {
            this.gamesWon += 1;
            this.currentStreak += 1;

            if (this.currentStreak > this.bestStreak) {
                this.bestStreak = this.currentStreak;
            }

            if (this.bestAttempt === null || attempts < this.bestAttempt) {
                this.bestAttempt = attempts;
            }

            this.attemptsDistribution[attempts] = (this.attemptsDistribution[attempts] ?? 0) + 1;
        } else {
            this.currentStreak = 0;
        }

        this.saveToLocalStorage();
    }

    resetStats() {
        this.totalGames = 0;
        this.gamesWon = 0;
        this.currentStreak = 0;
        this.bestStreak = 0;
        this.bestAttempt = null;
        this.attemptsDistribution = {};
        this.lastGameId = null;
        this.saveToLocalStorage();
    }

    clearLastGameId() {
        this.lastGameId = null;
    }

    private saveToLocalStorage() {
        const data = {
            totalGames: this.totalGames,
            gamesWon: this.gamesWon,
            currentStreak: this.currentStreak,
            bestStreak: this.bestStreak,
            bestAttempt: this.bestAttempt,
            attemptsDistribution: this.attemptsDistribution,
        };
        localStorage.setItem('wordle-stats', JSON.stringify(data));
    }

    private loadFromLocalStorage() {
        const stored = localStorage.getItem('wordle-stats');
        if (!stored) {
            return;
        }

        try {
            const data = JSON.parse(stored);
            this.totalGames = data.totalGames ?? 0;
            this.gamesWon = data.gamesWon ?? 0;
            this.currentStreak = data.currentStreak ?? 0;
            this.bestStreak = data.bestStreak ?? 0;
            this.bestAttempt = data.bestAttempt ?? null;
            this.attemptsDistribution = data.attemptsDistribution ?? {};
        } catch (error) {
            console.error('Failed to load stats from localStorage:', error);
        }
    }

    getShareText(): string {
        const distributionText = Object.entries(this.attemptsDistribution)
            .sort(([a], [b]) => Number(a) - Number(b))
            .map(([attempts, count]) => `${attempts} попыток: ${count} раз`)
            .join('\n');

        return `Моя статистика в Wordle:
🎮 Всего игр: ${this.totalGames}
✅ Побед: ${this.gamesWon}
📊 Процент побед: ${this.winPercentage}%
🔥 Текущая серия: ${this.currentStreak}
🏆 Лучшая серия: ${this.bestStreak}
⭐ Лучшая попытка: ${this.bestAttempt ?? '-'}

Распределение побед:
${distributionText || 'Пока нет данных'}`;
    }
}

export type StatsStoreType = InstanceType<typeof StatsStore>;
