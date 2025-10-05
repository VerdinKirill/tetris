// Логика игрового поля

import { GAME_CONFIG } from './config.js';
import { Tetromino } from './types.js';

/**
 * Класс игрового поля
 */
export class Board {
    private grid: number[][];

    constructor() {
        this.grid = this.createEmpty();
    }

    /**
     * Создать пустое поле
     */
    private createEmpty(): number[][] {
        const board: number[][] = [];
        for (let row = 0; row < GAME_CONFIG.ROWS; row++) {
            board.push(new Array(GAME_CONFIG.COLS).fill(0));
        }
        return board;
    }

    /**
     * Получить текущее состояние поля
     */
    getGrid(): number[][] {
        return this.grid;
    }

    /**
     * Проверить возможность размещения фигуры
     */
    isValidPosition(piece: Tetromino, offsetX: number = 0, offsetY: number = 0): boolean {
        const newX = piece.x + offsetX;
        const newY = piece.y + offsetY;

        for (let row = 0; row < piece.shape.length; row++) {
            for (let col = 0; col < piece.shape[row].length; col++) {
                if (piece.shape[row][col]) {
                    const boardX = newX + col;
                    const boardY = newY + row;

                    if (boardX < 0 || boardX >= GAME_CONFIG.COLS || boardY >= GAME_CONFIG.ROWS) {
                        return false;
                    }

                    if (boardY >= 0 && this.grid[boardY][boardX]) {
                        return false;
                    }
                }
            }
        }

        return true;
    }

    /**
     * Закрепить фигуру на поле
     */
    mergePiece(piece: Tetromino, colorIndex: number): void {
        for (let row = 0; row < piece.shape.length; row++) {
            for (let col = 0; col < piece.shape[row].length; col++) {
                if (piece.shape[row][col]) {
                    const boardY = piece.y + row;
                    const boardX = piece.x + col;
                    
                    if (boardY >= 0 && boardY < GAME_CONFIG.ROWS && 
                        boardX >= 0 && boardX < GAME_CONFIG.COLS) {
                        this.grid[boardY][boardX] = colorIndex;
                    }
                }
            }
        }
    }

    /**
     * Удалить заполненные линии и вернуть их количество
     */
    clearLines(): number {
        let linesCleared = 0;

        for (let row = GAME_CONFIG.ROWS - 1; row >= 0; row--) {
            if (this.grid[row].every(cell => cell !== 0)) {
                this.grid.splice(row, 1);
                this.grid.unshift(new Array(GAME_CONFIG.COLS).fill(0));
                linesCleared++;
                row++;
            }
        }

        return linesCleared;
    }

    /**
     * Сбросить поле
     */
    reset(): void {
        this.grid = this.createEmpty();
    }
}

