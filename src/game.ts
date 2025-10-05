// Главный файл игры - координация всех модулей

import { DOM_IDS } from './config.js';
import { GameState, Tetromino, ScoreRecord } from './types.js';
import { StorageManager } from './storage.js';
import { TetrominoFactory } from './tetromino.js';
import { Board } from './board.js';
import { Renderer, NextPieceRenderer } from './renderer.js';
import { ScoringSystem } from './scoring.js';
import { UIManager } from './ui.js';
/**
 * Класс игры Tetris
 */
class TetrisGame {
    private board: Board;
    private renderer: Renderer;
    private nextRenderer: NextPieceRenderer;
    private gameState: GameState;
    private gameLoopInterval: number | null = null;
    private playerName: string = '';

    constructor() {
        this.board = new Board();
        
        const canvas = document.getElementById(DOM_IDS.GAME_CANVAS) as HTMLCanvasElement;
        const nextCanvas = document.getElementById(DOM_IDS.NEXT_CANVAS) as HTMLCanvasElement;
        
        this.renderer = new Renderer(canvas);
        this.nextRenderer = new NextPieceRenderer(nextCanvas);

        this.gameState = this.createInitialState();
    }

    /**
     * Создать начальное состояние игры
     */
    private createInitialState(): GameState {
        return {
            board: [],
            currentPiece: null,
            nextPiece: null,
            score: 0,
            lines: 0,
            level: 1,
            gameOver: false,
            isPaused: false
        };
    }

    /**
     * Инициализировать новую игру
     */
    public initialize(playerName: string): void {
        this.playerName = playerName;
        this.board.reset();
        
        this.gameState = {
            board: this.board.getGrid(),
            currentPiece: null,
            nextPiece: TetrominoFactory.createRandom(),
            score: 0,
            lines: 0,
            level: 1,
            gameOver: false,
            isPaused: false
        };

        this.gameState.currentPiece = this.gameState.nextPiece;
        this.gameState.nextPiece = TetrominoFactory.createRandom();

        this.updateUI();
        UIManager.loadScoresTable();
        this.start();
    }

    /**
     * Запустить игровой цикл
     */
    private start(): void {
        if (this.gameLoopInterval) {
            clearInterval(this.gameLoopInterval);
        }
        
        const speed = ScoringSystem.calculateSpeed(this.gameState.level);
        this.gameLoopInterval = window.setInterval(() => this.gameLoop(), speed);
        this.draw();
    }

    /**
     * Остановить игровой цикл
     */
    public stop(): void {
        if (this.gameLoopInterval) {
            clearInterval(this.gameLoopInterval);
            this.gameLoopInterval = null;
        }
    }

    /**
     * Основной игровой цикл
     */
    private gameLoop(): void {
        if (this.gameState.gameOver || this.gameState.isPaused) {
            return;
        }

        if (!this.moveDown()) {
            this.lockPiece();
            const linesCleared = this.board.clearLines();
            
            if (linesCleared > 0) {
                this.handleLinesCleared(linesCleared);
            }
            this.spawnNewPiece();
        }

        this.draw();
    }

    /**
     * Обработка убранных линий
     */
    private handleLinesCleared(linesCleared: number): void {
        this.gameState.lines += linesCleared;
        this.gameState.score += ScoringSystem.calculateScore(linesCleared, this.gameState.level);
        
        const newLevel = ScoringSystem.calculateLevel(this.gameState.lines);
        if (newLevel > this.gameState.level) {
            this.gameState.level = newLevel;
            this.stop();
            this.start();
        }

        this.updateUI();
    }

    /**
     * Создать новую фигуру
     */
    private spawnNewPiece(): void {
        this.gameState.currentPiece = this.gameState.nextPiece;
        this.gameState.nextPiece = TetrominoFactory.createRandom();

        if (!this.board.isValidPosition(this.gameState.currentPiece!)) {
            this.endGame();
        }

        this.updateUI();
    }

    /**
     * Закрепить фигуру на поле
     */
    private lockPiece(): void {
        if (!this.gameState.currentPiece) return;

        const colorIndex = TetrominoFactory.getColorIndex(this.gameState.currentPiece.color);
        this.board.mergePiece(this.gameState.currentPiece, colorIndex);
    }

    /**
     * Движение вниз
     */
    public moveDown(): boolean {
        if (!this.gameState.currentPiece) return false;

        if (this.board.isValidPosition(this.gameState.currentPiece, 0, 1)) {
            this.gameState.currentPiece.y++;
            this.draw();
            return true;
        }
        return false;
    }

    /**
     * Движение влево
     */
    public moveLeft(): void {
        if (!this.gameState.currentPiece || this.gameState.gameOver) return;

        if (this.board.isValidPosition(this.gameState.currentPiece, -1, 0)) {
            this.gameState.currentPiece.x--;
            this.draw();
        }
    }

    /**
     * Движение вправо
     */
    public moveRight(): void {
        if (!this.gameState.currentPiece || this.gameState.gameOver) return;

        if (this.board.isValidPosition(this.gameState.currentPiece, 1, 0)) {
            this.gameState.currentPiece.x++;
            this.draw();
        }
    }

    /**
     * Поворот фигуры
     */
    public rotate(): void {
        if (!this.gameState.currentPiece || this.gameState.gameOver) return;

        const rotated = TetrominoFactory.rotateMatrix(this.gameState.currentPiece.shape);
        const originalShape = this.gameState.currentPiece.shape;
        this.gameState.currentPiece.shape = rotated;

        if (!this.board.isValidPosition(this.gameState.currentPiece)) {
            this.gameState.currentPiece.shape = originalShape;
        } else {
            this.draw();
        }
    }

    /**
     * Мгновенное падение (hard drop)
     */
    public hardDrop(): void {
        if (!this.gameState.currentPiece || this.gameState.gameOver) return;

        while (this.board.isValidPosition(this.gameState.currentPiece, 0, 1)) {
            this.gameState.currentPiece.y++;
        }
        
        this.draw();
        
        setTimeout(() => this.gameLoop(), 50);
    }

    /**
     * Отрисовка
     */
    private draw(): void {
        this.renderer.clear();
        this.renderer.drawGrid();
        this.renderer.drawBoard(this.board.getGrid());

        if (this.gameState.currentPiece) {
            this.renderer.drawPiece(this.gameState.currentPiece);
        }
    }

    /**
     * Обновить UI
     */
    private updateUI(): void {
        UIManager.updateGameStats(
            this.gameState.level,
            this.gameState.score,
            this.gameState.lines
        );

        if (this.gameState.nextPiece) {
            this.nextRenderer.draw(this.gameState.nextPiece);
        }
    }

    /**
     * Завершить игру
     */
    private endGame(): void {
        this.gameState.gameOver = true;
        this.stop();

        // Сохраняем результат
        const scoreRecord: ScoreRecord = {
            player: this.playerName,
            score: this.gameState.score,
            lines: this.gameState.lines,
            date: new Date().toISOString()
        };
        StorageManager.saveScore(scoreRecord);

        // Показываем экран Game Over
        UIManager.showGameOver(this.gameState.score, this.gameState.lines);
        UIManager.loadScoresTable();
    }

    /**
     * Перезапустить игру
     */
    public restart(): void {
        UIManager.hideGameOver();
        this.initialize(this.playerName);
    }

    /**
     * Проверка, завершена ли игра
     */
    public isGameOver(): boolean {
        return this.gameState.gameOver;
    }

    /**
     * Переключить паузу
     */
    public togglePause(): void {
        if (this.gameState.gameOver) return;
        
        this.gameState.isPaused = !this.gameState.isPaused;
        
        const pauseModal = document.getElementById(DOM_IDS.PAUSE_MODAL) as HTMLDivElement;
        if (this.gameState.isPaused) {
            pauseModal.classList.remove('hidden');
        } else {
            pauseModal.classList.add('hidden');
        }
    }
}

// Глобальный экземпляр игры
let game: TetrisGame;

// Переменные для плавного ускорения
let softDropInterval: number | null = null;
let isDownKeyPressed = false;

/**
 * Инициализация приложения
 */
function initializeApp(): void {
    UIManager.showLoginScreen();

    const loginForm = document.getElementById(DOM_IDS.LOGIN_FORM) as HTMLFormElement;
    loginForm.addEventListener('submit', handleLogin);

    const logoutButton = document.getElementById(DOM_IDS.LOGOUT_BUTTON) as HTMLButtonElement;
    logoutButton.addEventListener('click', handleLogout);

    const restartButton = document.getElementById(DOM_IDS.RESTART_BUTTON) as HTMLButtonElement;
    restartButton.addEventListener('click', handleRestart);

    document.addEventListener('keydown', handleKeyPress);
}

/**
 * Обработка входа
 */
function handleLogin(event: Event): void {
    event.preventDefault();
    const usernameInput = document.getElementById(DOM_IDS.USERNAME_INPUT) as HTMLInputElement;
    const username = usernameInput.value.trim();

    if (username) {
        StorageManager.saveUsername(username);
        startGame(username);
    }
}

/**
 * Обработка выхода
 */
function handleLogout(): void {
    if (confirm('Вы уверены, что хотите выйти? Текущая игра будет завершена.')) {
        if (game) {
            game.stop();
        }
        
        if (softDropInterval) {
            clearInterval(softDropInterval);
            softDropInterval = null;
        }
        isDownKeyPressed = false;
        
        UIManager.showLoginScreen();
    }
}

/**
 * Обработка перезапуска
 */
function handleRestart(): void {
    if (game) {
        game.restart();
    }
}

/**
 * Запуск игры
 */
function startGame(playerName: string): void {
    UIManager.showGameScreen(playerName);
    game = new TetrisGame();
    game.initialize(playerName);
}

/**
 * Обработка нажатий клавиш
 */
function handleKeyPress(event: KeyboardEvent): void {
    if (!game || game.isGameOver()) return;

    switch (event.key) {
        case 'ArrowLeft':
            event.preventDefault();
            game.moveLeft();
            break;
        case 'ArrowRight':
            event.preventDefault();
            game.moveRight();
            break;
        case 'ArrowDown':
            event.preventDefault();
            if (!isDownKeyPressed) {
                isDownKeyPressed = true;
                game.moveDown();
                softDropInterval = window.setInterval(() => {
                    game.moveDown();
                }, 50); 
            }
            break;
        case 'ArrowUp':
            event.preventDefault();
            game.hardDrop();
            break;
        case ' ':
            event.preventDefault();
            game.rotate();
            break;
        case 'p':
        case 'P':
        case 'Escape':
            event.preventDefault();
            game.togglePause();
            break;
    }
}

/**
 * Обработка отпускания клавиш
 */
function handleKeyUp(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown') {
        isDownKeyPressed = false;
        if (softDropInterval) {
            clearInterval(softDropInterval);
            softDropInterval = null;
        }
    }
}

// Инициализация при загрузке страницы
window.addEventListener('DOMContentLoaded', initializeApp);

// Добавляем обработчик отпускания клавиш
document.addEventListener('keyup', handleKeyUp);
