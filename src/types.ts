
/**
 * Типы данных для игры Tetris
 */

/**
 * Тип данных для позиции
 */
export interface Position {
    x: number;
    y: number;
}

/**
 * Тип данных для фигуры тетриса
 */
export interface Tetromino {
    shape: number[][];
    color: string;
    x: number;
    y: number;
}

/**
 * Тип данных для состояния игры
 */
export interface GameState {
    board: number[][];
    currentPiece: Tetromino | null;
    nextPiece: Tetromino | null;
    score: number;
    lines: number;
    level: number;
    gameOver: boolean;
    isPaused: boolean;
}

/**
 * Тип данных для записи очков
 */
export interface ScoreRecord {
    player: string;
    score: number;
    lines: number;
    date: string;
}

