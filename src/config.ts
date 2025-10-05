// Конфигурация игры

// Цветовая схема Game Boy
export const COLORS = {
    // Canvas
    CANVAS_BACKGROUND: '#a8b56b',
    CANVAS_GRID: '#306230',
    
    // Блоки
    BLOCK_FILL: '#0f380f',
    BLOCK_BORDER: '#306230',
    
    // UI панели
    PANEL_BACKGROUND: '#9bbc0f',
    PANEL_BORDER: '#0f380f',
    PANEL_SHADOW: '#306230',
    
    // Текст
    TEXT_PRIMARY: '#0f380f',
    TEXT_SECONDARY: '#306230',
    TEXT_MUTED: '#0f380f',
    
    // Кнопки
    BUTTON_BG: '#306230',
    BUTTON_TEXT: '#9bbc0f',
    BUTTON_BORDER: '#0f380f',
    BUTTON_SHADOW: '#0f380f',
    
    // Модальные окна
    MODAL_BG_DARK: '#0f380f',
    MODAL_TEXT_LIGHT: '#9bbc0f',
    MODAL_TEXT_MUTED: '#8bac0f',
    
    // Таблица
    TABLE_HEADER_BG: '#306230',
    TABLE_BORDER: '#306230',
    TABLE_HOVER: '#8bac0f',
    
    // Выход
    LOGOUT_BG: '#306230',
    LOGOUT_BORDER: '#0f380f',
    LOGOUT_SHADOW: '#0f380f',
    LOGOUT_TEXT: '#9bbc0f',
    
    // Game Over
    GAMEOVER_TITLE: '#0f380f'
} as const;

export const GAME_CONFIG = {
    // Размеры игрового поля
    COLS: 10,
    ROWS: 20,
    BLOCK_SIZE: 30,
    
    // Размеры canvas для следующей фигуры
    NEXT_CANVAS_SIZE: 120,
    
    // Игровая механика
    INITIAL_SPEED: 1000, // мс
    MIN_SPEED: 100, // мс
    SPEED_DECREASE_PER_LEVEL: 100, // мс
    LINES_PER_LEVEL: 10,
    
    // Очки за линии
    SCORE_MULTIPLIERS: {
        1: 40,
        2: 100,
        3: 300,
        4: 1200
    },
    
    // localStorage ключи
    STORAGE_KEYS: {
        USERNAME: 'tetris.username',
        SCORES: 'tetris.scores'
    },
    
    // Количество рекордов для сохранения
    MAX_SCORES: 10
} as const;

// Определение фигур тетриса (7 классических фигур)
export const TETROMINOS = [
    {
        name: 'I',
        shape: [
            [1, 1, 1, 1]
        ],
        color: '#0000f0' // синий
    },
    {
        name: 'O',
        shape: [
            [1, 1],
            [1, 1]
        ],
        color: '#f00000' // красный
    },
    {
        name: 'T',
        shape: [
            [0, 1, 0],
            [1, 1, 1]
        ],
        color: '#a000f0' // фиолетовый
    },
    {
        name: 'S',
        shape: [
            [1, 1, 0],
            [0, 1, 1]
        ],
        color: '#00f000' // зеленый
    },
    {
        name: 'Z',
        shape: [
            [0, 1, 1],
            [1, 1, 0]
        ],
        color: '#f0f000' // желтый
    },
    {
        name: 'L',
        shape: [
            [1, 0, 0],
            [1, 1, 1]
        ],
        color: '#f0a000' // оранжевый
    },
    {
        name: 'J',
        shape: [
            [0, 0, 1],
            [1, 1, 1]
        ],
        color: '#00f0f0' // голубой
    }
] as const;

// CSS селекторы
export const DOM_IDS = {
    // Контейнеры
    LOGIN_CONTAINER: 'loginContainer',
    GAME_CONTAINER: 'gameContainer',
    
    // Формы и кнопки
    LOGIN_FORM: 'loginForm',
    USERNAME_INPUT: 'username',
    LOGOUT_BUTTON: 'logoutButton',
    RESTART_BUTTON: 'restartButton',
    
    // Canvas
    GAME_CANVAS: 'gameCanvas',
    NEXT_CANVAS: 'nextCanvas',
    
    // UI элементы
    PLAYER_NAME: 'playerName',
    LEVEL: 'level',
    SCORE: 'score',
    LINES: 'lines',
    
    // Game Over
    GAME_OVER: 'gameOver',
    FINAL_SCORE: 'finalScore',
    FINAL_LINES: 'finalLines',
    
    // Pause
    PAUSE_MODAL: 'pauseModal',
    
    // Таблица рекордов
    SCORES_TABLE: 'scoresTable',
    SCORES_BODY: 'scoresBody'
} as const;

