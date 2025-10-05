// Отрисовка игры на canvas

import { GAME_CONFIG, TETROMINOS, COLORS } from './config.js';
import { Tetromino } from './types.js';

export class Renderer {
    private ctx: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement) {
        this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    }

    /**
     * Очистить canvas
     */
    clear(): void {
        this.ctx.fillStyle = COLORS.CANVAS_BACKGROUND;
        this.ctx.fillRect(0, 0, 
            GAME_CONFIG.COLS * GAME_CONFIG.BLOCK_SIZE,
            GAME_CONFIG.ROWS * GAME_CONFIG.BLOCK_SIZE
        );
    }

    /**
     * Нарисовать сетку
     */
    drawGrid(): void {
        this.ctx.strokeStyle = COLORS.CANVAS_GRID;
        this.ctx.lineWidth = 1;

        for (let row = 0; row <= GAME_CONFIG.ROWS; row++) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, row * GAME_CONFIG.BLOCK_SIZE);
            this.ctx.lineTo(GAME_CONFIG.COLS * GAME_CONFIG.BLOCK_SIZE, row * GAME_CONFIG.BLOCK_SIZE);
            this.ctx.stroke();
        }

        for (let col = 0; col <= GAME_CONFIG.COLS; col++) {
            this.ctx.beginPath();
            this.ctx.moveTo(col * GAME_CONFIG.BLOCK_SIZE, 0);
            this.ctx.lineTo(col * GAME_CONFIG.BLOCK_SIZE, GAME_CONFIG.ROWS * GAME_CONFIG.BLOCK_SIZE);
            this.ctx.stroke();
        }
    }

    /**
     * Нарисовать игровое поле
     */
    drawBoard(board: number[][]): void {
        for (let row = 0; row < GAME_CONFIG.ROWS; row++) {
            for (let col = 0; col < GAME_CONFIG.COLS; col++) {
                if (board[row][col]) {
                    const colorIndex = board[row][col] - 1;
                    const color = TETROMINOS[colorIndex]?.color || '#ffffff';
                    this.drawBlock(col, row, color);
                }
            }
        }
    }

    /**
     * Нарисовать фигуру
     */
    drawPiece(piece: Tetromino): void {
        for (let row = 0; row < piece.shape.length; row++) {
            for (let col = 0; col < piece.shape[row].length; col++) {
                if (piece.shape[row][col]) {
                    this.drawBlock(piece.x + col, piece.y + row, piece.color);
                }
            }
        }
    }

    /**
     * Нарисовать один блок
     */
    private drawBlock(x: number, y: number, color: string): void {
        const pixelX = x * GAME_CONFIG.BLOCK_SIZE;
        const pixelY = y * GAME_CONFIG.BLOCK_SIZE;

        // Основной блок
        this.ctx.fillStyle = COLORS.BLOCK_FILL;
        this.ctx.fillRect(pixelX + 2, pixelY + 2, 
            GAME_CONFIG.BLOCK_SIZE - 4, GAME_CONFIG.BLOCK_SIZE - 4);

        // Рамка блока
        this.ctx.strokeStyle = COLORS.BLOCK_BORDER;
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(pixelX + 2, pixelY + 2, 
            GAME_CONFIG.BLOCK_SIZE - 4, GAME_CONFIG.BLOCK_SIZE - 4);
    }
}

/**
 * Рендерер для предпросмотра следующей фигуры
 */
export class NextPieceRenderer {
    private ctx: CanvasRenderingContext2D;
    private canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    }

    /**
     * Нарисовать следующую фигуру
     */
    draw(piece: Tetromino): void {
        // Очищаем canvas
        this.ctx.fillStyle = COLORS.CANVAS_BACKGROUND;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        const offsetX = (this.canvas.width - piece.shape[0].length * GAME_CONFIG.BLOCK_SIZE) 
            / 2 / GAME_CONFIG.BLOCK_SIZE;
        const offsetY = (this.canvas.height - piece.shape.length * GAME_CONFIG.BLOCK_SIZE) 
            / 2 / GAME_CONFIG.BLOCK_SIZE;

        for (let row = 0; row < piece.shape.length; row++) {
            for (let col = 0; col < piece.shape[row].length; col++) {
                if (piece.shape[row][col]) {
                    this.drawBlock(offsetX + col, offsetY + row, piece.color);
                }
            }
        }
    }

    /**
     * Нарисовать блок
     */
    private drawBlock(x: number, y: number, color: string): void {
        const pixelX = x * GAME_CONFIG.BLOCK_SIZE;
        const pixelY = y * GAME_CONFIG.BLOCK_SIZE;

        // Основной блок
        this.ctx.fillStyle = COLORS.BLOCK_FILL;
        this.ctx.fillRect(pixelX + 2, pixelY + 2, 
            GAME_CONFIG.BLOCK_SIZE - 4, GAME_CONFIG.BLOCK_SIZE - 4);

        // Рамка блока
        this.ctx.strokeStyle = COLORS.BLOCK_BORDER;
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(pixelX + 2, pixelY + 2, 
            GAME_CONFIG.BLOCK_SIZE - 4, GAME_CONFIG.BLOCK_SIZE - 4);
    }
}

