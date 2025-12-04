# Crypto Luck Backend

Бэкенд на NestJS для проекта Crypto Luck.

## Возможности

- REST API endpoints
- Swagger документация
- TypeScript поддержка
- CORS настроен для работы с frontend

## Установка

```bash
npm install
```

## Запуск

### Режим разработки

```bash
npm run dev
```

Сервер запустится на `http://localhost:3001`

### Сборка для продакшена

```bash
npm run build
```

### Запуск продакшн версии

```bash
npm run start:prod
```

## API Endpoints

### Получить список пользователей

```
GET /api/users
```

**Ответ:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Иван Иванов",
      "email": "ivan@example.com",
      "role": "user"
    }
  ]
}
```

## Swagger документация

После запуска сервера, Swagger UI доступен по адресу:

```
http://localhost:3001/api/swagger
```

## Структура проекта

```
server/
├── src/
│   ├── users/
│   │   ├── dto/
│   │   │   └── user.dto.ts      # DTO для пользователей
│   │   ├── users.controller.ts  # Контроллер пользователей
│   │   ├── users.service.ts     # Сервис пользователей
│   │   └── users.module.ts      # Модуль пользователей
│   ├── app.module.ts            # Главный модуль
│   └── main.ts                  # Точка входа приложения
├── package.json
├── tsconfig.json
└── nest-cli.json
```
