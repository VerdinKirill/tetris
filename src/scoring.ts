// Система подсчета очков и уровней

import { GAME_CONFIG } from './config.js';

export class ScoringSystem {
    /**
     * Рассчитать очки за убранные линии
     */
    static calculateScore(linesCleared: number, level: number): number {
        const multiplier = GAME_CONFIG.SCORE_MULTIPLIERS[linesCleared as keyof typeof GAME_CONFIG.SCORE_MULTIPLIERS];
        return (multiplier || 0) * level;
    }

    /**
     * Рассчитать уровень на основе количества линий
     */
    static calculateLevel(totalLines: number): number {
        return Math.floor(totalLines / GAME_CONFIG.LINES_PER_LEVEL) + 1;
    }

    /**
     * Рассчитать скорость игры для текущего уровня
     */
    static calculateSpeed(level: number): number {
        const speed = GAME_CONFIG.INITIAL_SPEED - (level - 1) * GAME_CONFIG.SPEED_DECREASE_PER_LEVEL;
        return Math.max(GAME_CONFIG.MIN_SPEED, speed);
    }
}

