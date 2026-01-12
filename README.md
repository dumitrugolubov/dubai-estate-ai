# DubaiEstate AI - Telegram Mini App для риэлторов Дубая

Telegram Mini App для риэлторов Дубая с AI-генерацией 3D рендеров из чертежей и созданием продающих текстов.

## Возможности

- **3D Рендеринг**: Превращайте чертежи квартир в фотореалистичные 3D визуализации
- **AI Тексты**: Генерируйте продающие описания на русском и английском языках
- **Автопостинг**: Публикуйте объекты в Telegram каналы одним кликом
- **Подписка**: $49.99/месяц через Stripe

## Технологии

- React 18 + Vite
- Telegram WebApp SDK
- Tailwind CSS
- Framer Motion
- Zustand
- OpenRouter API (Gemini 3 Flash + Nano Banana Pro)

## Быстрый старт

### Установка зависимостей

```bash
npm install
```

### Настройка переменных окружения

```bash
cp .env.example .env
```

Добавьте ваш OpenRouter API Key в файл `.env`:

```
VITE_OPENROUTER_API_KEY=your_api_key_here
```

### Запуск в режиме разработки

```bash
npm run dev
```

Приложение будет доступно по адресу `http://localhost:3000`

## Развёртывание на Vercel

1. Загрузите проект на GitHub
2. Подключите репозиторий в Vercel
3. Добавьте переменную окружения:
   - `VITE_OPENROUTER_API_KEY` — ваш API ключ OpenRouter
4. Нажмите Deploy

## OpenRouter Настройка

### Для текстов (Gemini 3 Flash)

Модель: `google/gemini-3-flash`

### Для изображений (Nano Banana Pro)

Модель: `nano-banana/pro`

Получите API ключ на: https://openrouter.ai/

## Структура проекта

```
src/
├── components/     # UI компоненты
├── pages/          # Страницы приложения
├── services/       # API сервисы
├── store/          # Zustand стейт
├── context/        # React контексты
└── utils/          # Утилиты
```

## Telegram Bot

1. Создайте бота через @BotFather
2. Добавьте Menu Button → Web App с URL вашего приложения
3. Добавьте бота как администратора в каналы для постинга

## Лицензия

MIT
