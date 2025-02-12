**Исправленный README.md:**

```markdown
# Сервис интеграции Wildberries и Google Таблиц

Сервис для ежечасного сбора данных о тарифах Wildberries и автоматической выгрузки в Google Таблицы.

---

## 📋 Требования
- Docker и Docker Compose
- API-ключ Wildberries
- Сервисный аккаунт Google Cloud

---

## 🚀 Быстрый старт

### 1. Клонирование репозитория
```bash
git clone https://github.com/loverjuri/wb-tariff-service.git
cd wb-tariff-service
```

### 2. Настройка окружения
Создайте файл `.env` на основе примера:
```bash
cp .env.example .env
```
Заполните значения:
```ini
WB_API_KEY=ваш_ключ_wb
GOOGLE_SERVICE_ACCOUNT_EMAIL=ваш-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
GOOGLE_SHEET_IDS=id_таблицы1,id_таблицы2
```

### 3. Запуск приложения
```bash
docker-compose up --build
```

---

## ⚙️ Настройка Google Sheets
1. Создайте сервисный аккаунт в [Google Cloud Console](https://console.cloud.google.com/).
2. Добавьте email сервисного аккаунта как редактора в настройках доступа ваших таблиц.
3. Активируйте Google Sheets API в разделе **APIs & Services → Библиотека**.

---

## ✅ Проверка работы

### Логи приложения
```bash
docker-compose logs -f app
```
**Ожидаемые сообщения:**
```
[info] Database connected
[info] Scheduler started
[info] Tariffs data updated
```

### Проверка данных в PostgreSQL
```bash
docker-compose exec postgres psql -U postgres -c "SELECT * FROM tariffs;"
```

### Проверка Google Таблиц
1. Откройте таблицу по ID из `GOOGLE_SHEET_IDS`.
2. Убедитесь в наличии листа `stocks_coefs`.
3. Данные обновляются ежедневно в **23:59**.

---

## 🏗️ Архитектура
- **Ежечасный сбор данных** с Wildberries API
- **UPSERT** в PostgreSQL для актуальных данных
- **Ежедневный экспорт** в Google Sheets с сортировкой по коэффициенту

---

## ❓ FAQ

### Ошибка аутентификации Google
1. Проверьте формат приватного ключа (должен содержать `\n` вместо переносов строк).
2. Убедитесь, что сервисный аккаунт добавлен как редактор таблицы.

### Нет данных в БД
1. Проверьте корректность API-ключа Wildberries.
2. Убедитесь, что контейнер с PostgreSQL запущен.

---

## 📄 Лицензия
MIT License
```