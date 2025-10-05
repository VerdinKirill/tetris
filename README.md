# Tetris Game - Лабораторная работа

## Требования

- Node.js 22+ (или любая LTS версия)
- TypeScript
- nginx (для HTTPS)
- OpenSSL (для генерации сертификатов)

## Установка (продакшен с HTTPS)

### 1. Установка зависимостей

```bash
npm install
```

### 2. Компиляция TypeScript

```bash
npm run build
```

Для разработки с автоматической перекомпиляцией:

```bash
npm run watch
```

### 3. Генерация SSL сертификатов

#### Для Linux/macOS:

```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout example.key -out example.crt \
  -subj "/C=RU/ST=Moscow/L=Moscow/O=University/CN=localhost"
```

Затем скопируйте сертификаты:

```bash
sudo mkdir -p /etc/ssl/certs /etc/ssl/private
sudo cp example.crt /etc/ssl/certs/example.com_nginx.crt
sudo cp example.key /etc/ssl/private/example.com_nginx.key
```

### 4. Настройка nginx

#### Для Linux (Ubuntu/Debian):

```bash
sudo apt-get install nginx
```

#### Для macOS:

```bash
brew install nginx
```

#### Копирование конфигурации:

**Linux:**
```bash
sudo cp nginx.conf /etc/nginx/sites-available/tetris
sudo ln -s /etc/nginx/sites-available/tetris /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

**macOS:**
```bash
# Обновите путь root в nginx.conf на полный путь к проекту
sudo cp nginx.conf /usr/local/etc/nginx/servers/tetris.conf
sudo nginx -t
sudo nginx -s reload
```

### 5. Запуск

Откройте браузер и перейдите по адресу:

```
https://localhost
```

**Примечание:** Браузер покажет предупреждение о безопасности (т.к. сертификат самоподписанный). Нажмите "Дополнительно" → "Принять риск и продолжить".

## Управление игрой

- **←** - перемещение фигуры влево
- **→** - перемещение фигуры вправо
- **↓** - ускорить падение фигуры
- **Пробел** - повернуть фигуру на 90°
- **↑** - "уронить" фигуру (мгновенное падение)

## Структура проекта

```
tetris/
├── src/                 # Исходники TypeScript (модульная структура)
│   ├── config.ts        # Конфигурация и константы
│   ├── types.ts         # TypeScript типы
│   ├── storage.ts       # Работа с localStorage
│   ├── tetromino.ts     # Логика фигур тетриса
│   ├── board.ts         # Логика игрового поля
│   ├── renderer.ts      # Отрисовка на canvas
│   ├── scoring.ts       # Система подсчета очков
│   ├── ui.ts            # Управление UI
│   └── game.ts          # Главный файл-координатор
├── dist/                # Скомпилированный JavaScript
├── index.html           # Главная страница
├── styles.css           # Стили
├── nginx.conf           # Конфигурация nginx
├── tsconfig.json        # Конфигурация TypeScript
├── package.json         # Зависимости npm
```

## Система подсчёта очков

- 1 линия: 40 × уровень
- 2 линии: 100 × уровень
- 3 линии: 300 × уровень
- 4 линии (Tetris): 1200 × уровень

## Уровни сложности

Игра начинается с уровня 1. Каждые 10 убранных линий уровень увеличивается, и фигуры падают быстрее.

## Сохранение данных

Все данные (имя пользователя, рекорды) сохраняются в localStorage браузера:
- `tetris.username` - имя игрока
- `tetris.scores` - массив с топ-10 рекордами

## Технологии

- TypeScript - основной язык разработки
- Canvas API - отрисовка игры
- LocalStorage API - сохранение данных
- nginx - веб-сервер с HTTPS
- OpenSSL - генерация SSL сертификатов

## Демонстрация игры

![Форма логина в игру](https://github.com/VerdinKirill/tetris/raw/main/examples/loginForm.png)
![Процесс игры](https://github.com/VerdinKirill/tetris/raw/main/examples/game.png)
![Пауза](https://github.com/VerdinKirill/tetris/raw/main/examples/pause.png)
![Игра окончена](https://github.com/VerdinKirill/tetris/raw/main/examples/gameover.png)

## Автор

Лабораторная работа по дисциплине "Web-технологии"
Вердин Кирилл группа 3344

