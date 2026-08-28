# 🐕 DOGSS - Полная документация проекта

> **Проект**: Конструктор сайтов для заводчиков собак + платформа объявлений
> **Stack**: Nuxt 3 + Vue 3 + Pinia + Express.js + PostgreSQL
> **Статус**: В активной разработке

---

## 📋 Оглавление

1. [Обзор проекта](#-обзор-проекта)
2. [Структура и архитектура](#-структура-и-архитектура)
3. [Tech Stack](#tech-stack)
4. [Аутентификация (Flow #1)](#-flow-1-аутентификация)
5. [Создание объявления (Flow #2)](#-flow-2-создание-объявления)
6. [Конструктор сайта (Flow #3)](#-flow-3-конструктор-сайта-заводчика)
7. [Каталог и фильтрация (Flow #4)](#-flow-4-просмотр-объявлений-и-фильтрация)
8. [Pinia Stores - Справка](#-pinia-stores---справочник)
9. [API Services](#-api-services)
10. [Типы данных](#-типы-данных)

---

## 🎯 Обзор проекта

### Что это?

**DOGSS** — платформа для заводчиков собак с двумя основными компонентами:

1. **Конструктор сайтов** — позволяет заводчикам создать собственный сайт питомника
2. **Платформа объявлений** — публикация и просмотр объявлений о продаже/вязке собак

### Основной функционал

✅ **Реализовано:**
- Система аутентификации (Email + OTP)
- Каталог объявлений с фильтрами
- Создание/редактирование объявлений (draft/active)
- Конструктор сайта заводчика
- Профили пользователей
- Личный кабинет
- Админ-панель (модерация)
- Загрузка фото в S3
- Избранные объявления

⏳ **В разработке:**
- Система комментариев
- Рейтинг заводчиков

📋 **Планы:**
- Бонусная программа (рефереральная)
- Stories (временные публикации)
- Родословная (pedigree)
- Аналитика для заводчиков
- Подписки/платежи

---

## 📁 Структура и архитектура

### Дерево проекта

```
dogss/
├── src/
│   ├── assets/style/          # SCSS стили
│   ├── components/             # Vue компоненты
│   │   ├── Base/               # Переиспользуемые UI
│   │   ├── Breeders/           # Конструктор сайта
│   │   ├── Ad/                 # Объявления
│   │   ├── Personal/           # Личный кабинет
│   │   ├── Admin/              # Админ функции
│   │   └── Form/               # Формы
│   ├── pages/                  # Маршруты (auto-routing)
│   │   ├── auth/               # Логин/регистрация
│   │   ├── catalog/            # Каталог объявлений
│   │   ├── breeders/           # Питомники
│   │   ├── personal/           # Личный кабинет
│   │   └── admin/              # Админ-панель
│   ├── stores/                 # Pinia хранилище
│   │   ├── auth.store.ts
│   │   ├── ad.store.ts
│   │   ├── breeder.store.ts
│   │   ├── personal.store.ts
│   │   ├── admin.store.ts
│   │   └── ... (10+ stores)
│   ├── service/                # API сервисы
│   │   ├── baseApi.service.ts
│   │   ├── auth.service.ts
│   │   ├── ad.service.ts
│   │   └── ... (10+ services)
│   ├── struct/                 # TypeScript типы
│   ├── utils/                  # Хелперы
│   └── nuxt.config.ts
├── migrations/                 # БД миграции
├── package.json
└── README.md
```

### Слои архитектуры

```
┌─────────────────────────────────┐
│    Pages (маршруты)             │  Vue компоненты с маршрутами
├─────────────────────────────────┤
│    Components (UI)              │  Переиспользуемые части
├─────────────────────────────────┤
│    Stores (Pinia)               │  Управление состоянием
├─────────────────────────────────┤
│    Services (API)               │  HTTP запросы
├─────────────────────────────────┤
│    Backend (Express)            │  REST API
├─────────────────────────────────┤
│    Database (PostgreSQL)        │  Хранилище данных
└─────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend

| Технология | Версия | Назначение |
|-----------|--------|-----------|
| **Nuxt** | ^3.13.0 | Full-stack фреймворк |
| **Vue** | latest | Реактивный UI |
| **TypeScript** | - | Типизация |
| **Pinia** | ^2.2.4 | State management |
| **SCSS** | ^1.79.4 | Препроцессор стилей |
| **GSAP** | ^3.12.7 | Анимации и ScrollTrigger |
| **Swiper** | latest | Карусели и слайдеры |
| **Vue Advanced Cropper** | ^2.8.9 | Обрезка изображений |
| **Day.js** | ^2.1.11 | Работа с датами |
| **Axios** | ^1.7.9 | HTTP клиент |

### Backend

| Технология | Версия | Назначение |
|-----------|--------|-----------|
| **Express.js** | ^4.21.0 | REST API сервер |
| **PostgreSQL** | - | Релационная БД |
| **Sequelize** | ^6.37.7 | ORM для PostgreSQL |
| **JWT** | ^9.0.2 | Токены аутентификации |
| **Nodemailer** | ^6.10.1 | Отправка email |
| **AWS SDK** | ^2.1692.0 | S3 для файлов |
| **Multer** | ^2.0.1 | Загрузка файлов |
| **Telegram Bot API** | ^0.66.0 | Уведомления в Telegram |

---

## 🔐 FLOW #1: АУТЕНТИФИКАЦИЯ

### Диаграмма потока

```
STEP 1: ВХОД
════════════════════════════════════════════════════════════════════

auth/login.vue
    │
    ├─ Пользователь вводит email
    ├─ v-model="email"
    ├─ Валидация (format, exists check)
    │
    └──► authStore.sendEmailForLogin(email)
         │
         └──► AuthService.loginEmail(email)
              │
              └──► POST /api/auth/login
                   │
                   Backend:
                   1. Генерирует OTP (6 цифр)
                   2. Отправляет email через Nodemailer
                   3. Сохраняет OTP в Redis (TTL 5 минут)
                   │
                   └──► Response: { message: "Code sent" }

    ✓ Alert: "Код отправлен на email"
    ✓ Router: /auth/token?email=...


STEP 2: ПОДТВЕРЖДЕНИЕ OTP
════════════════════════════════════════════════════════════════════

auth/token.vue
    │
    ├─ Email из query параметра: route.query.email
    ├─ Пользователь вводит 6-значный код
    ├─ v-model="otp"
    │
    └──► authStore.verifyOtp(email, otp)
         │
         └──► AuthService.verifyOtp(email, otp)
              │
              └──► GET /api/auth/verify?email=...&otp=...
                   │
                   Backend:
                   1. Проверяет OTP из Redis
                   2. Если верно:
                      ├─ Находит/создает пользователя
                      ├─ Генерирует JWT токен
                      └─ Сохраняет sessionToken в БД
                   3. Если неверно:
                      └─ 401 Unauthorized
                   │
                   └──► Response: { token: "eyJhbGc..." }

    ✓ authStore.updateSessionToken(token)
      ├─ tokenLocalStore.value = token
      ├─ Или sessionTokenCookie.value = token
      └─ getSessionToken()
    
    ✓ authStore.getUserFullData()
      └─► Загружает полные данные пользователя
    
    ✓ statusUser = 'authorized'
    ✓ Router: / (главная страница)


STEP 3: ЗАГРУЗКА ДАННЫХ ПОЛЬЗОВАТЕЛЯ
════════════════════════════════════════════════════════════════════

authStore.getUserFullData()
    │
    ├─ Проверка: sessionToken существует?
    │
    └──► AuthService.getSession(sessionToken)
         │
         └──► GET /api/auth/session
              Headers: Authorization: Bearer {token}
              │
              Backend:
              1. Проверяет JWT токен
              2. Если невалиден → 401
              3. Если валиден:
                 ├─ Декодирует JWT
                 ├─ Находит пользователя в БД
                 ├─ Если есть breeder_id → загружает
                 └─ Возвращает полные данные
              │
              └──► Response: UserItemFullStruct
                   {
                     id: 123,
                     email: "user@example.com",
                     id_breeder: 45,
                     personal_data: { ... },
                     status_user: "authorized"
                   }

    ✓ userFullData.value = response
    ✓ statusUser = 'authorized'
    ✓ Все компоненты могут использовать данные
```

### Методы Auth Store

```typescript
// 1️⃣ ОТПРАВИТЬ EMAIL ДЛЯ ВХОДА
sendEmailForLogin(email: string): Promise<{ message: string }>
  └─ Отправляет POST запрос
  └─ Backend генерирует OTP и отправляет email
  └─ TTL кода: 5 минут

// 2️⃣ ПОДТВЕРДИТЬ OTP КОД
verifyOtp(email: string, otp: string): Promise<{ token: string }>
  └─ Проверяет код
  └─ Генерирует JWT токен
  └─ Возвращает token для сохранения

// 3️⃣ ОБНОВИТЬ ТОКЕН СЕССИИ
updateSessionToken(token: string): Promise<void>
  └─ Сохраняет токен локально
  └─ Загружает полные данные пользователя
  └─ Обновляет statusUser

// 4️⃣ ЗАГРУЗИТЬ ПОЛНЫЕ ДАННЫЕ
getUserFullData(): Promise<void>
  └─ GET /api/auth/session
  └─ Требует валидный sessionToken
  └─ Обновляет userFullData в store

// 5️⃣ ВЫХОД ИЗ СИСТЕМЫ
logout(): Promise<void>
  └─ updateSessionToken('') → очистить токен
  └─ Редирект на /auth/login (middleware)
```

---

## 📰 FLOW #2: СОЗДАНИЕ ОБЪЯВЛЕНИЯ

### Диаграмма потока

```
ШАГИ СОЗДАНИЯ
════════════════════════════════════════════════════════════════════

1. ОТКРЫТЬ /create-ad
   ├─ Middleware: requirementUser = 'authorized'
   ├─ Проверка: пользователь авторизован?
   └─ Если нет → Redirect /auth/login

2. ИНИЦИАЛИЗИРОВАТЬ ФОРМУ
   ├─ Если редактирование:
   │  └─ Заполнить поля из itemChangeDateAd
   └─ Если создание:
      └─ Пустая форма

3. ЗАПОЛНИТЬ ОСНОВНЫЕ ДАННЫЕ
   ├─ name: string (макс 100)
   ├─ description: string (макс 5000)
   ├─ type_ad: 'purchase' | 'good-hands' | 'mating' | 'lost'
   ├─ breed_id: number (select)
   ├─ gender: 'male' | 'female' | 'litter'
   ├─ quantitative: 'one' | 'litter'
   ├─ date_birth: string (2024-05-15)
   ├─ approximate_age: 'puppy' | 'young' | 'adult' | 'elderly'
   ├─ price: number (опционально для 'mating')
   ├─ is_contractual_price: boolean
   ├─ region_main: number (select)
   ├─ city_main: number (select)
   ├─ is_export: boolean
   ├─ regionsExport: number[] (если export)
   ├─ parents_mum: number (опционально)
   ├─ parents_dad: number (опционально)
   └─ photos: IUploadImageInBase[] (minimum 1)

4. ЗАГРУЗИТЬ ФОТО
   ├─ Пользователь кликает: "Загрузить фото"
   ├─ Выбирает изображение
   ├─ Система обрезает и позиционирует
   │
   └──► uploadStore.uploadImage(formData)
        │
        └──► POST /api/upload (multipart/form-data)
             │
             Backend (AWS S3):
             1. Валидирует файл (jpg/png, макс 5MB)
             2. Загружает в S3
             3. Возвращает URL и позиции
             │
             └──► Response: {
                    url: "https://s3.../abc.jpg",
                    positionBanner: {
                      desktop: "center center",
                      tablet: "left top",
                      mobile: "right bottom"
                    }
                  }

   ✓ formData.photos.push(response)
   ✓ Показать preview

5. ВАЛИДАЦИЯ ФОРМЫ
   ├─ name не пусто ✓
   ├─ description не пусто ✓
   ├─ photos.length > 0 ✓
   ├─ type_ad обязателен ✓
   ├─ breed_id обязателен ✓
   ├─ gender обязателен ✓
   ├─ region_main обязателен ✓
   ├─ city_main обязателен ✓
   ├─ Если type != 'mating': price обязателен ✓
   └─ Если gender == 'litter': number_male или number_female > 0 ✓

   Если ошибка:
   └──► commonStore.addUserErrorAlert("Заполните все поля")
        └─ Form не отправляется

6. ОТПРАВКА НА СЕРВЕР
   ├─ Определить статус:
   │  ├─ Если редактирование: status = 'active'
   │  └─ Если создание: status = 'draft'
   │
   └──► personalAdStore.createPersonalAd(formData)
        │
        └──► PersonalAdService.postAdItem(formData)
             │
             └──► POST /api/personal/ad
                  Headers: Authorization: Bearer {token}
                  │
                  Backend:
                  1. Валидирует body
                  2. Проверяет owner_id == current_user.id
                  3. Создает запись в БД:
                     INSERT INTO ads (
                       owner_id, type_ad, name, description,
                       breed_id, gender, price, status, ...
                     ) VALUES (...)
                  4. Если draft: только для личного каталога
                  5. Если moderation: ждет проверки админа
                  6. Если active: видно в каталоге
                  7. Отправляет email уведомление
                  │
                  └──► Response: AdItemStruct (с id)

   ✓ Alert: "Объявление создано!"
   ✓ personalAdStore.AdPersonalList обновлен
   ✓ Редирект: /personal/publications?tab=draft

7. ПОСЛЕ СОЗДАНИЯ
   ├─ Пользователь может:
   │  ├─ Отредактировать объявление
   │  ├─ Отправить на модерацию (статус: active)
   │  ├─ Удалить объявление
   │  └─ Просмотреть в каталоге
   └─ Администратор:
      ├─ Проверяет объявление
      ├─ Одобряет (active) или блокирует (blocked)
      └─ Уведомляет пользователя email
```

### Методы Personal Ad Store

```typescript
// 1️⃣ СОЗДАТЬ ОБЪЯВЛЕНИЕ
async createPersonalAd(body: AdCreateItemStruct): Promise<void>
  ├─ Отправляет POST /api/personal/ad
  ├─ Status по умолчанию: 'draft'
  ├─ Обновляет AdPersonalList
  └─ Показывает success alert

// 2️⃣ ПОЛУЧИТЬ СПИСОК ЛИЧНЫХ ОБЪЯВЛЕНИЙ
async updatePersonalAdList(): Promise<void>
  ├─ GET /api/personal/ad
  └─ Разделяет на active/draft/moderation

// 3️⃣ ПОЛУЧИТЬ ОДНО ОБЪЯВЛЕНИЕ (DRAFT)
async getPersonalAdCurrentDraft(id): Promise<void>
  └─ GET /api/personal/ad?id=123&status=draft

// 4️⃣ ПОЛУЧИТЬ ОДНО ОБЪЯВЛЕНИЕ (ACTIVE)
async getPersonalAdCurrentActive(id): Promise<void>
  └─ GET /api/personal/ad?id=123&status=active

// 5️⃣ ОБНОВИТЬ ОБЪЯВЛЕНИЕ
async updatePersonalAd(body, id, newStatus): Promise<void>
  ├─ PATCH /api/personal/ad
  ├─ Может изменить статус
  └─ Требует авторизацию

// 6️⃣ УДАЛИТЬ ОБЪЯВЛЕНИЕ
async deletePersonalAd(status, adId): Promise<void>
  ├─ DELETE /api/personal/ad?status=draft&adId=123
  ├─ Удаляет из БД
  └─ Удаляет фото из S3
```

---

## 🏠 FLOW #3: КОНСТРУКТОР САЙТА ЗАВОДЧИКА

### Диаграмма потока

```
ШАГИ СОЗДАНИЯ САЙТА
════════════════════════════════════════════════════════════════════

1. ОТКРЫТЬ /breeders/create
   ├─ Middleware: requirementUser = 'authorized'
   ├─ onMounted: Проверить есть ли уже питомник
   │  ├─ if (idMyBreeder.value) {
   │  │    Alert: "У вас уже есть питомник"
   │  │    Router.back()
   │  │ }
   └─ Если нет → показать форму

2. ЗАГРУЗИТЬ БАНЕР И АВАТАР
   ├─ BreedersSiteHeadUpload
   ├─ Пользователь кликает: "Загрузить банер"
   ├─ Открывается ImageCropper
   │  ├─ Выбрать изображение
   │  ├─ Обрезать/повернуть
   │  └─ Выбрать позицию (center/left/right)
   │
   └──► uploadStore.uploadImage(formData)
        └──► POST /api/upload
             └──► Response: { url, positionBanner }

   ✓ photoBannerItem.value = response
   ✓ Показать preview

3. ЗАПОЛНИТЬ ОСНОВНЫЕ ДАННЫЕ
   ├─ nameBreeder: string (макс 100) ✓
   ├─ description: string (макс 1000) ✓
   ├─ about_history: string (макс 5000)
   ├─ breeding_philosophy: string (макс 5000)
   ├─ contactMethods:
   │  ├─ phone: "+79000000000"
   │  ├─ whatsapp: "+79000000000"
   │  ├─ telegram: "@username"
   │  └─ viber: "+79000000000"
   │
   └─ Watch на изменения:
      ├─ Если nameBreeder изменен → звездочка (*)
      └─ Если contactMethods → валидировать формат

4. ВЫБРАТЬ СЕКЦИИ
   ├─ BreedersSiteHeadNav (табы)
   ├─ Пользователь включает/отключает секции:
   │  ├─ О нас (about) ✓
   │  ├─ Наши питомцы (my_dogs) ✓
   │  ├─ Объявления (ads) ✓
   │  ├─ Контакты (contacts) ✓
   │  └─ Отзывы (comments) ✓
   │
   └─ Каждая секция может быть видна/скрыта

5. ДОБАВИТЬ СОБАК (MY DOGS)
   ├─ Кнопка: "+ Добавить собаку"
   ├─ Откроется DogFormModal
   │  ├─ name: "Чарли"
   │  ├─ breed_id: 5
   │  ├─ birth_date: "2020-05-15"
   │  ├─ gender: "male"
   │  ├─ photo: [upload]
   │  ├─ bio: "Описание собаки"
   │  ├─ achievements: ["Чемпион 2024"]
   │  └─ pedigree_link: "https://..."
   │
   └─ Добавить в массив dogsInBreeder
      ├─ Собака отображается в галерее
      └─ Можно редактировать/удалить

6. СОХРАНИТЬ ПИТОМНИК
   ├─ Валидация:
   │  ├─ nameBreeder обязателен ✓
   │  ├─ description обязателен ✓
   │  └─ contactMethods хотя бы один ✓
   │
   ├─ Подготовка данных:
   │  const breederData: BreederSiteSaveStruct = {
   │    name, description, about_history,
   │    breeding_philosophy,
   │    banner_images, photoPreview,
   │    contact_methods, sections, dogs
   │  }
   │
   └──► breederStore.createBreeder(breederData)
        │
        └──► BreederService.postBreeder(breederData)
             │
             └──► POST /api/breeder
                  Headers: Authorization: Bearer {token}
                  │
                  Backend:
                  1. Валидирует данные
                  2. Проверяет: нет ли уже питомника
                  3. Создает запись:
                     INSERT INTO breeders (
                       user_id, name, description,
                       banner_url, logo_url,
                       phone, whatsapp, telegram, viber,
                       sections, status, created_at
                     ) VALUES (...)
                  4. Обновляет user.id_breeder = new_id
                  5. Отправляет email с поздравлением
                  │
                  └──► Response: BreederSiteItemStruct (с id)

   ✓ Alert: "Питомник создан!"
   ✓ breederStore.breederView обновлен
   ✓ authStore.userFullData.id_breeder = new_id
   ✓ Редирект: /breeders/{newBreederId}

7. ПРОСМОТР САЙТА ЗАВОДЧИКА
   ├─ /breeders/[id].vue
   ├─ Открывается публичный сайт питомника
   ├─ Дизайн:
   │  ├─ Банер + логотип (hero section)
   │  ├─ Мини навигация (секции)
   │  ├─ Содержимое каждой секции
   │  └─ Контакты в подвале
   └─ Возможности:
      ├─ Просмотр питомцев
      ├─ Просмотр объявлений заводчика
      ├─ Чтение отзывов
      ├─ Написать сообщение заводчику
      └─ Добавить в избранные
```

### Методы Breeder Store

```typescript
// 1️⃣ СОЗДАТЬ ПИТОМНИК
async createBreeder(body: BreederSiteSaveStruct): Promise<void>
  ├─ POST /api/breeder
  ├─ Requires Authorization header
  └─ Обновляет breederView и userFullData

// 2️⃣ ПОЛУЧИТЬ ДАННЫЕ ПИТОМНИКА
async getViewBreeder(type: 'setting' | 'view'): Promise<void>
  ├─ GET /api/breeder?id=123
  ├─ type='view': для публичного сайта
  └─ type='setting': для редактирования

// 3️⃣ ОБНОВИТЬ ПИТОМНИК
async editBreeder(body: BreederSiteChangeStruct, id): Promise<void>
  ├─ PATCH /api/breeder
  ├─ Body: { id, ...body }
  └─ Обновляет breederView

// 4️⃣ ПРОВЕРИТЬ МОЙ ПИТОМНИК
const idMyBreeder = computed(() => authStore.userFullData?.id_breeder)
  └─ Быстрая проверка: есть ли питомник?
```

---

## 🔍 FLOW #4: ПРОСМОТР ОБЪЯВЛЕНИЙ И ФИЛЬТРАЦИЯ

### Диаграмма потока

```
ШАГИ ПРОСМОТРА КАТАЛОГА
════════════════════════════════════════════════════════════════════

1. ОТКРЫТЬ /catalog
   ├─ onMounted:
   │  ├─ regionsStore.updateRegionsListFull() → загрузить регионы
   │  ├─ breedsStore.updateBreedsList() → загрузить породы
   │  └─ adStore.updateAdList() → загрузить объявления
   │
   └─ UI: Фильтры слева + Список объявлений справа

2. ПРИМЕНИТЬ ФИЛЬТРЫ
   ├─ CatalogFilterPanel (левая панель)
   ├─ Пользователь изменяет:
   │  ├─ Тип объявления (select)
   │  ├─ Пол (select)
   │  ├─ Порода (multi-select)
   │  ├─ Регион (select)
   │  ├─ Город (select, зависит от региона)
   │  ├─ Цена (range slider)
   │  └─ Возраст (checkbox group)
   │
   ├─ Watch на изменение региона:
   │  └─ Загрузить города для региона
   │     └─ regionsStore.getCityList(regionValue)
   │
   └─ Кнопка [APPLY FILTERS]:
      └─ emit('filter-changed', filterState)

3. ПРЕОБРАЗОВАТЬ ФИЛЬТРЫ
   ├─ Catalog/index.vue получает событие
   ├─ Построить query string:
   │  {
   │    type: 'sale',
   │    gender: 'male',
   │    breeds: '5,10,15',
   │    region: '1',
   │    priceMax: '100000',
   │    ageCategory: 'puppy,young'
   │  }
   │
   ├─ Обновить URL (для сохранения фильтров):
   │  router.push({ name: 'catalog', query })
   │
   └─ Применить фильтры:
      └─ adStore.updateAdFilter(query)

4. ЗАГРУЗИТЬ ОБЪЯВЛЕНИЯ
   ├─ AD STORE: updateAdFilter()
   │  ├─ getFilterAd(query) → парсить фильтры
   │  ├─ addQueryAgeCategory(query) → добавить возраст
   │  └─ queryRequest.value = обновленный query
   │
   ├─ AD STORE: updateAdList()
   │  └─ adService.getAdList(queryRequest.value)
   │
   └──► AD SERVICE: getAdList()
        └──► GET /api/ad?type=sale&gender=male&region=1&...
             │
             Backend:
             1. Парсировать query параметры
             2. Построить WHERE условие:
                WHERE status = 'active'
                AND type_ad = 'sale'
                AND gender = 'male'
                AND region_main = 1
                AND breed_id IN (5, 10, 15)
                AND price BETWEEN 10000 AND 100000
                AND EXTRACT(MONTH FROM AGE(date_birth))
                    BETWEEN 0 AND 6
             3. Выполнить запрос
             4. Собрать ответ с деталями владельца
             └──► Response: {
                    limit: 20,
                    offset: 0,
                    count: 245,        // всего найдено
                    queryDetails: {...},
                    result: [ AdItemStruct[] ]
                  }

   ✓ adCatalogList.value = response.result
   ✓ adCatalogListDetails.value = { limit, offset, count }
   ✓ UI обновляется с новыми объявлениями

5. ОТОБРАЗИТЬ РЕЗУЛЬТАТЫ
   ├─ CardAdItem компоненты:
   │  ├─ Фото (с crop-позицией)
   │  ├─ Название
   │  ├─ Порода, пол, возраст
   │  ├─ Цена или "Вязка"
   │  ├─ ❤️ (favorite button)
   │  ├─ Регион
   │  └─ Кол-во фото
   │
   └─ Paginate or "LOAD MORE" button

6. ПРОСМОТР КОНКРЕТНОГО ОБЪЯВЛЕНИЯ
   ├─ CardAdItem.vue (клик):
   │  └─ router.push(`/catalog/${item.id}`)
   │
   ├─ /catalog/[id].vue onMounted:
   │  └─ await adStore.getViewAd(route.params.id)
   │
   └──► AD STORE: getViewAd(id)
        └──► adService.getAdList({ id: id })
             └──► GET /api/ad?id=123
                  └──► Response: AdItemStruct (полный)

   ✓ adView.value = response
   ✓ Отобразить:
      ├─ Большая галерея фото (Swiper)
      ├─ Полная информация
      ├─ Контакты владельца (скрыты по умолчанию)
      ├─ Комментарии/отзывы
      ├─ Данные о владельце/питомнике
      ├─ ❤️ Добавить в избранное
      ├─ 📧 Написать сообщение
      └─ ⚠️ Пожаловаться

7. ДОБАВИТЬ В ИЗБРАННОЕ
   ├─ Клик на ❤️
   ├─ personalStore.addPersonalFavorite(adId)
   │  └─ POST /api/personal/favorite
   │
   ├─ personalStore.updateFavorites()
   │  └─ GET /api/personal/favorite
   │
   └─ FavoritesList обновлен
      └─ Доступно на /personal/favorites
```

### Типы данных для фильтрации

```typescript
// Что отправляем на сервер
interface AdQueryFilterStruct {
  breeds?: string;              // "5,10,15"
  id?: string;                  // "123"
  status?: string;              // "active"
  'max-price'?: string;         // "100000"
  'min-price'?: string;         // "10000"
  regions?: string;             // "1,2,3"
  type?: string;                // "sale" | "mating" | "good-hands" | "lost"
  gender?: string;              // "male" | "female" | "litter"
  ageCategory?: string;         // "puppy,young,adult,elderly"
  minAgeMonth?: number;         // 0
  maxAgeMonth?: number | 'infinite'; // 6
}

// Как хранится в store
interface AdFullFilterStruct {
  'max-price'?: number;
  'min-price'?: number;
  status?: IStatusAd;
  type?: ISelectComponent | null;
  gender?: ISelectComponent | null;
  breeds?: ISelectNumber[] | null;
  regions?: ISelectComponentWithChildren[] | null;
  maxFullPrice?: number;
  ageCategory?: IFilterAge | null;
}

// Одно объявление в результатах
interface AdItemStruct {
  id: number;
  name: string;
  type_ad: 'purchase' | 'good-hands' | 'mating' | 'lost';
  breed: { id, text };
  gender: 'female' | 'male' | 'any' | null;
  quantitative: 'one' | 'litter';
  approximate_age: string | null;
  date_birth: string;
  price: number | null;
  is_contractual_price: boolean;
  description: string;
  photos: IUploadImageInBase[];
  count_image: number;
  geo_main: { region: { id, text }, city: { id, text } };
  region_main: number;
  city_main: number;
  parents: { parents_mum?: number, parents_dad?: number };
  exportRegions: { isExport: boolean, regionsList: any[] };
  ownerDetails: UserItemPublicPreviewStruct;
  isFavorite: boolean;
  status: IStatusAd;
  created_at: string;
}
```

---

## 🏪 PINIA STORES - СПРАВОЧНИК

### Таблица всех Store методов

| Store | Метод | Параметры | Возвращает | Описание |
|-------|-------|-----------|-----------|----------|
| **authStore** | `sendEmailForLogin` | email: string | { message } | Отправить OTP на email |
| | `sendEmailForRegistration` | UserCreateItemStruct | { success } | Зарегистрировать пользователя |
| | `verifyOtp` | email, otp | { token } | Подтвердить код |
| | `verifyCodeLink` | tokenLink | { token } | Подтвердить через ссылку |
| | `updateSessionToken` | token | void | Сохранить токен локально |
| | `getUserFullData` | - | void | Загрузить данные пользователя |
| | `logout` | - | void | Выход из системы |
| **adStore** | `updateAdList` | - | void | Загрузить список объявлений |
| | `updateAdFilter` | AdQueryFilterStruct | void | Применить фильтры |
| | `getViewAd` | id: string | void | Загрузить одно объявление |
| | `clearViewAd` | - | void | Очистить просмотр |
| **breederStore** | `createBreeder` | BreederSiteSaveStruct | void | Создать питомник |
| | `editBreeder` | body, id | void | Обновить питомник |
| | `getViewBreeder` | type | void | Загрузить питомник |
| **personalAdStore** | `createPersonalAd` | AdCreateItemStruct | void | Создать объявление |
| | `updatePersonalAd` | body, id, status | void | Обновить объявление |
| | `deletePersonalAd` | status, adId | void | Удалить объявление |
| | `updatePersonalAdList` | - | void | Загрузить список объявлений |
| | `getPersonalAdCurrentDraft` | id | void | Загрузить черновик |
| | `getPersonalAdCurrentActive` | id | void | Загрузить активное объявление |
| **personalStore** | `addPersonalFavorite` | adId | void | Добавить в избранное |
| | `deletePersonalFavorite` | adId | void | Удалить из избранного |
| | `updateFavorites` | - | void | Загрузить избранное |
| | `changeUserData` | UserChangeItemStruct | void | Обновить профиль |
| | `changeEmailUser` | new_email | void | Изменить email |
| | `confirmChangeEmailUserWitchOtp` | otp | void | Подтвердить email |
| **adminStore** | `updateAdList` | - | void | Загрузить объявления на модерацию |
| | `changeAd` | body, id, status | void | Изменить статус объявления |
| **usersStore** | `updateUsersList` | - | void | Загрузить каталог заводчиков |
| | `getUserViewData` | id, isForBreeder | void | Загрузить профиль пользователя |
| **regionsStore** | `updateRegionsListFull` | - | void | Загрузить регионы со городами |
| | `updateRegionsList` | - | void | Загрузить только регионы |
| | `getCityList` | regionValue | void | Загрузить города региона |
| **uploadStore** | `uploadImage` | FormData | { url, positionBanner } | Загрузить фото в S3 |
| | `deleteFileStorage` | fileUrl | { success } | Удалить фото из S3 |
| **commonStore** | `addUserSuccessAlert` | message | void | Показать success уведомление |
| | `addUserErrorAlert` | message | void | Показать error уведомление |
| | `addUserInfoAlert` | message | void | Показать info уведомление |
| | `addZoomPhotosGallery` | photosList | void | Открыть zoom галерею |
| | `clearZoomPhotosGallery` | - | void | Закрыть zoom галерею |
| | `showResultModal` | info | void | Показать модаль |
| | `closeResultModal` | - | void | Закрыть модаль |
| **filterStore** | (computed) | - | ref | Предопределенные значения фильтров |

### Использование в компонентах

```typescript
<script setup lang="ts">
// Импортировать store
const authStore = useAuthStore()
const adStore = useAdStore()

// Computed для реактивности
const userFullData = computed(() => authStore.userFullData)
const adList = computed(() => adStore.adCatalogList)

// Вызов действия
onMounted(async () => {
  try {
    await adStore.updateAdList()
  } catch (error) {
    commonStore.addUserErrorAlert(error.message)
  }
})
</script>
```

---

## 🔌 API SERVICES

### Базовый сервис (BaseApiService)

```typescript
export default class BaseApiService {
  protected _baseURL: string = ''
  protected _token = ''

  get baseURL() { return this._baseURL }
  
  setAuthToken(token: string) { 
    this._token = token 
  }

  get headers() {
    return {
      'Content-Type': 'application/json',
      accept: 'application/json',
      ...(this._token && { 
        Authorization: `Bearer ${this._token}` 
      })
    }
  }
}
```

### Все сервисы

| Сервис | Endpoint | Методы |
|--------|----------|--------|
| **AuthService** | /api/auth | loginEmail, verifyOtp, verifyCodeLink, getSession, registrationEmail, checkEmailAvailability |
| **AdService** | /api/ad | getAdList |
| **PersonalAdService** | /api/personal/ad | getPersonalAdList, getPersonalAdItem, postAdItem, patchAdItem, deletePersonalAd |
| **AdminService** | /api/admin/ad | getAdList, patchAdItem |
| **BreederService** | /api/breeder | getBreederById, postBreeder, patchBreeder |
| **UploadService** | /api/upload | uploadObject, deleteObjectStorage |
| **PersonalService** | /api/personal | getPersonalFavorite, postPersonalFavorite, deletePersonalFavorite, patchUser, changeEmailUserApi, changeEmailUserVerifyOtp |
| **UsersService** | /api/users | getUsersList, getUserData |
| **RegionsService** | /api/regions | getRegionsList |
| **BreedsService** | /api/breeds | getBreedsList |
| **AdCommentService** | /api/ad/comment | getCommentHashLink, getAccessComment, addCommentToAd |

### Шаблон для нового сервиса

```typescript
import BaseApiService from "~/service/baseApi.service";

export default class MyService extends BaseApiService {
  private readonly RESOURCE = '/api/my-resource';

  constructor(config: string, token?: string) {
    super(config);
    if (token) this.setAuthToken(token);
  }

  async getMyData(query?: any) {
    const { data, error } = await useFetch(this.RESOURCE, {
      method: "get",
      query: query || {},
      baseURL: this.baseURL,
      headers: { ...this.headers },
    })
    if (error.value) throw { ...error.value };
    return data.value;
  }
}
```

---

## 📦 ТИПЫ ДАННЫХ

### User типы

```typescript
interface UserItemFullStruct {
  id: number;
  email: string;
  id_breeder?: number;
  personal_data: {
    first_name: string;
    last_name: string;
    contact_methods: {
      phone?: string;
      whatsapp?: string;
      telegram?: string;
      viber?: string;
    };
  };
  status_user: 'authorized' | 'unauthorized';
}

interface UserItemPublicStruct {
  id: number;
  personal_data: { ... };
  breeder?: BreederSiteItemStruct;
}

interface UserCreateItemStruct {
  email: string;
  first_name: string;
  last_name: string;
  contact_methods?: { ... };
}
```

### Breeder типы

```typescript
interface BreederSiteItemStruct {
  id: number;
  user_id: number;
  name: string;
  description: string;
  logo_url: string;
  banner_image_url: string;
  about_text: string;
  sections: {
    about: boolean;
    my_dogs: boolean;
    ads: boolean;
    contacts: boolean;
    comments: boolean;
  };
  contact_methods: {
    phone?: string;
    whatsapp?: string;
    telegram?: string;
    viber?: string;
  };
  status: 'active' | 'inactive';
}

interface BreederSiteSaveStruct {
  name: string;
  description: string;
  banner_images: ICommonUpload;
  photoPreview: ICommonUpload;
  contact_methods: { ... };
  sections: { ... };
  dogs: Array<...>;
}
```

### Common типы

```typescript
interface ICommonUpload {
  url: string;
  positionBanner?: {
    desktop: string;
    tablet: string;
    mobile: string;
  };
}

interface IUploadImageInBase {
  url: string;
  positionBanner: {
    desktop: string;
    tablet: string;
    mobile: string;
  };
}

interface ISelectComponent {
  text: string;
  value: string | number;
}

type IStatusAd = 'active' | 'draft' | 'moderation' | 'blocked';
type IStatusUser = 'unknown' | 'authorized' | 'unauthorized';
```

---

## 🔧 Конфигурация

### nuxt.config.ts

```typescript
export default defineNuxtConfig({
  compatibilityDate: '2025-06-02',
  devtools: { enabled: true },
  pages: true,
  ssr: true,
  srcDir: 'src/',
  
  css: [
    '@/assets/style/global/index.scss',
    '@/assets/style/global/map.scss',
  ],

  modules: [
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    'nuxt-swiper',
    'dayjs-nuxt'
  ],

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.PROXY,
      websiteUrl: process.env.WEBSITE_URL,
      websiteENV: process.env.WEBSITE_ENV
    }
  }
})
```

### Переменные окружения

```env
# API
PROXY=http://localhost:3001
WEBSITE_URL=http://localhost:3000
WEBSITE_ENV=development

# PostgreSQL
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
POSTGRES_DATABASE=dogss
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
```

---

## 🚀 Запуск проекта

```bash
# Установка зависимостей
npm install

# Development сервер
npm run dev

# Production build
npm run build

# Preview
npm run preview

# Миграции БД
npm run migrate
npm run migrate:undo
```

---

## 🎯 Текущий статус

✅ **Реализовано:**
- Система авторизации (Email + OTP)
- Каталог объявлений с фильтрами
- Создание/редактирование объявлений
- Конструктор сайта заводчика
- Профили пользователей
- Личный кабинет
- Админ-панель (модерация)
- Загрузка фото в S3

⏳ **В разработке:**
- Система комментариев
- Рейтинг заводчиков

📋 **TODO:**
- [ ] Бонусная программа
- [ ] Stories
- [ ] Родословная
- [ ] Аналитика
- [ ] Подписки/платежи
- [ ] SEO оптимизация

---

## 📝 Примечания

**Аутентификация:**
- Email + OTP (One-Time Password)
- TTL кода: 5 минут
- Токены хранятся в localStorage или cookie
- JWT токены с долгожданием (7 дней)

**Загрузка файлов:**
- Провайдер: AWS S3
- Форматы: jpg, png
- Макс размер: 5MB
- Позиционирование: desktop/tablet/mobile

**Валидация:**
- Frontend: базовая валидация в компонентах
- Backend: полная валидация перед сохранением
- Email: проверка на существование
- Телефон: проверка формата

**Ошибки:**
- commonStore.addUserErrorAlert() — показать пользователю
- onlyDev флаг — только для разработчика

---

## 📞 Контакты

**Разработчик:** Alena Sharkova  
**GitHub:** https://github.com/AlenaSharkova/dogss  
**Дата документации:** 2026-08-28

---

**Created with ❤️ for dog breeders**