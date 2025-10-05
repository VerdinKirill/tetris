// Работа с localStorage

import { GAME_CONFIG } from './config.js';
import { ScoreRecord } from './types.js';

export class StorageManager {
    /**
     * Сохранить имя пользователя
     */
    static saveUsername(username: string): void {
        localStorage.setItem(GAME_CONFIG.STORAGE_KEYS.USERNAME, username);
    }

    /**
     * Получить сохраненное имя пользователя
     */
    static getUsername(): string | null {
        return localStorage.getItem(GAME_CONFIG.STORAGE_KEYS.USERNAME);
    }

    /**
     * Получить все рекорды
     */
    static getScores(): ScoreRecord[] {
        const scoresJson = localStorage.getItem(GAME_CONFIG.STORAGE_KEYS.SCORES);
        return scoresJson ? JSON.parse(scoresJson) : [];
    }

    /**
     * Сохранить новый рекорд
     */
    static saveScore(scoreRecord: ScoreRecord): void {
        const scores = this.getScores();
        scores.push(scoreRecord);
        
        // Сортируем по убыванию очков
        scores.sort((a, b) => b.score - a.score);
        
        // Сохраняем только топ-N
        const topScores = scores.slice(0, GAME_CONFIG.MAX_SCORES);
        localStorage.setItem(GAME_CONFIG.STORAGE_KEYS.SCORES, JSON.stringify(topScores));
    }

    /**
     * Очистить все данные игры
     */
    static clearAll(): void {
        localStorage.removeItem(GAME_CONFIG.STORAGE_KEYS.USERNAME);
        localStorage.removeItem(GAME_CONFIG.STORAGE_KEYS.SCORES);
    }
}

