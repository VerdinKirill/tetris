// Логика работы с фигурами тетриса

import { GAME_CONFIG, TETROMINOS } from './config.js';
import { Tetromino } from './types.js';

export class TetrominoFactory {
    /**
     * Создать случайную фигуру
     */
    static createRandom(): Tetromino {
        const template = TETROMINOS[Math.floor(Math.random() * TETROMINOS.length)];
        return {
            shape: template.shape.map(row => [...row]),
            color: template.color,
            x: Math.floor(GAME_CONFIG.COLS / 2) - Math.floor(template.shape[0].length / 2),
            y: 0
        };
    }

    /**
     * Повернуть матрицу фигуры на 90° по часовой стрелке
     */
    static rotateMatrix(matrix: number[][]): number[][] {
        const rows = matrix.length;
        const cols = matrix[0].length;
        const rotated: number[][] = [];

        for (let col = 0; col < cols; col++) {
            const newRow: number[] = [];
            for (let row = rows - 1; row >= 0; row--) {
                newRow.push(matrix[row][col]);
            }
            rotated.push(newRow);
        }

        return rotated;
    }

    /**
     * Получить индекс цвета фигуры
     */
    static getColorIndex(color: string): number {
        const index = TETROMINOS.findIndex(t => t.color === color);
        return index + 1; // 1-based индекс
    }
}

