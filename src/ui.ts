// Управление пользовательским интерфейсом

import { DOM_IDS } from './config.js';
import { StorageManager } from './storage.js';

export class UIManager {
    /**
     * Показать экран входа
     */
    static showLoginScreen(): void {
        const loginContainer = document.getElementById(DOM_IDS.LOGIN_CONTAINER) as HTMLDivElement;
        const gameContainer = document.getElementById(DOM_IDS.GAME_CONTAINER) as HTMLDivElement;
        loginContainer.classList.remove('hidden');
        gameContainer.classList.add('hidden');
    }

    /**
     * Показать игровой экран
     */
    static showGameScreen(playerName: string): void {
        const loginContainer = document.getElementById(DOM_IDS.LOGIN_CONTAINER) as HTMLDivElement;
        const gameContainer = document.getElementById(DOM_IDS.GAME_CONTAINER) as HTMLDivElement;
        const usernameInput = document.getElementById(DOM_IDS.USERNAME_INPUT) as HTMLInputElement;
        const lastUsername = StorageManager.getUsername();
        if (lastUsername) {
            usernameInput.value = lastUsername;
        } else {
            usernameInput.value = '';
        }
        loginContainer.classList.add('hidden');
        gameContainer.classList.remove('hidden');
        
        const playerNameSpan = document.getElementById(DOM_IDS.PLAYER_NAME) as HTMLSpanElement;
        playerNameSpan.textContent = playerName;
    }

    /**
     * Обновить статистику игры
     */
    static updateGameStats(level: number, score: number, lines: number): void {
        const levelSpan = document.getElementById(DOM_IDS.LEVEL) as HTMLSpanElement;
        const scoreSpan = document.getElementById(DOM_IDS.SCORE) as HTMLSpanElement;
        const linesSpan = document.getElementById(DOM_IDS.LINES) as HTMLSpanElement;

        levelSpan.textContent = level.toString();
        scoreSpan.textContent = score.toString();
        linesSpan.textContent = lines.toString();
    }

    /**
     * Показать экран Game Over
     */
    static showGameOver(score: number, lines: number): void {
        const gameOverDiv = document.getElementById(DOM_IDS.GAME_OVER) as HTMLDivElement;
        const finalScoreSpan = document.getElementById(DOM_IDS.FINAL_SCORE) as HTMLSpanElement;
        const finalLinesSpan = document.getElementById(DOM_IDS.FINAL_LINES) as HTMLSpanElement;

        finalScoreSpan.textContent = score.toString();
        finalLinesSpan.textContent = lines.toString();
        gameOverDiv.classList.remove('hidden');
    }

    /**
     * Скрыть экран Game Over
     */
    static hideGameOver(): void {
        const gameOverDiv = document.getElementById(DOM_IDS.GAME_OVER) as HTMLDivElement;
        gameOverDiv.classList.add('hidden');
    }

    /**
     * Загрузить и отобразить таблицу рекордов
     */
    static loadScoresTable(): void {
        const scores = StorageManager.getScores();
        const scoresBody = document.getElementById(DOM_IDS.SCORES_BODY) as HTMLTableSectionElement;
        
        scoresBody.innerHTML = '';
        
        if (scores.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = '<td colspan="4" style="text-align: center; color: #999;">Нет записей</td>';
            scoresBody.appendChild(row);
            return;
        }

        scores.forEach((score, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${score.player}</td>
                <td>${score.score}</td>
                <td>${score.lines}</td>
            `;
            scoresBody.appendChild(row);
        });
    }
}

