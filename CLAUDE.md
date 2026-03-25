# CLAUDE.md — НейроЦентр SPA

> **Читать ПЕРВЫМ перед любой задачей.**
> Единственный источник правды. Обновлять после каждого изменения.

---

## О проекте

Mobile-first SPA для центра нейроразвития детей «НейроЦентр».
Архитектура: **tab-shell** (как нативное приложение) с адаптивом под tablet/desktop.

| | |
|---|---|
| Клиент | Татьяна (центр нейроразвития, Москва) |
| Стек | React 18 + TypeScript + Vite + CSS Modules + Framer Motion |
| Backend | PocketBase (auth, reviews, bookings) |
| Auth | Telegram Login Widget |
| Уведомления | Telegram Bot API + SMTP |

---

## Технологии

```
React 18 + TypeScript + Vite
CSS Modules (НЕ inline, НЕ styled-components, НЕ Tailwind)
Framer Motion  — анимации, AnimatePresence, tab transitions
lucide-react   — иконки
pocketbase     — SDK клиент
```

---

## Структура файлов

```
src/
 ├── app/
 │   ├── App.tsx              ← tab-shell, 5 табов, навигация
 │   └── App.module.scss
 │
 ├── components/
 │   ├── AppBar/              ← mobile: glass pill | tablet+: top nav
 │   ├── BottomNav/           ← mobile only (скрыт на 768px+)
 │   └── Background/          ← parallax декорации
 │
 ├── sections/
 │   ├── Hero/                ← Главная: заголовок, CTA, stats ✅
 │   ├── About/               ← О центре: миссия, ценности, фото
 │   ├── Founder/             ← Основатель: фото, bio, цитата, методы
 │   ├── Trust/               ← Цифры доверия
 │   ├── Services/            ← Услуги: карточки с ценой
 │   ├── WhyUs/               ← Преимущества: 6 карточек
 │   ├── Specialists/         ← Команда: grid карточек
 │   ├── Reviews/             ← Отзывы (PocketBase, только auth users)
 │   ├── Booking/             ← Форма записи → PB + Telegram + Email
 │   ├── FAQ/                 ← FAQ accordion
 │   ├── Contacts/            ← Адрес, телефон, карта
 │   └── Footer/              ← Соцсети, ссылки, копирайт
 │
 ├── services/
 │   ├── pocketbase/
 │   │   ├── client.ts        ← pb instance, VITE_PB_URL
 │   │   ├── auth.ts          ← Telegram auth, logout
 │   │   ├── reviews.ts       ← fetchReviews, createReview
 │   │   └── bookings.ts      ← createBooking
 │   └── telegram/
 │       └── notify.ts        ← notifyBooking (Bot API)
 │
 └── shared/
     ├── styles/
     │   ├── variables.css    ← все CSS-токены
     │   └── global.css
     ├── types/index.ts       ← Specialist, Service, Review, Booking, PBUser
     └── ScrollContext.ts     ← MotionValue для parallax
```

---

## Таб-структура App.tsx

| Таб | index | Секции |
|---|---|---|
| Главная | 0 | Hero |
| О центре | 1 | About + Founder + Trust + WhyUs |
| Услуги | 2 | Services + FAQ |
| Команда | 3 | Specialists |
| Инфо | 4 | Reviews + Contacts + Footer |

Кнопка "Записаться" в AppBar → `navigate(4)`.

---

## Дизайн-система

### Шрифты

```
--font-heading: 'Unbounded'  ← h1-h3, логотип, цифры
--font-sans:    'Inter'      ← весь остальной текст
```

### Ключевые цвета

```css
--accent-primary:      #2D7DD2
--accent-primary-dark: #1A5FAF
--accent-primary-soft: rgba(45,125,210,0.12)
--accent-teal:         #1AAFA0
--accent-teal-soft:    rgba(26,175,160,0.12)
--accent-green:        #3DAA6E
--text-primary:        #0F2137
--text-secondary:      #4A6080
--text-muted:          #8FA3BF
--bg-color:            #F4F7FB
--bg-surface:          #FFFFFF
--divider:             rgba(15,33,55,0.08)
```

### App Shell высоты

```css
/* Mobile (<768px) */
--appbar-h:    calc(env(safe-area-inset-top,0px) + 56px)
--bottomnav-h: calc(env(safe-area-inset-bottom,0px) + 72px)

/* Tablet (768px+) */
--appbar-h:    64px
--bottomnav-h: 0px     ← BottomNav display:none

/* Desktop (1024px+) */
--appbar-h:    72px
```

### Content max-width

```
mobile:  480px, padding 20px
tablet:  680px, padding 32px
desktop: 860px, padding 48px
```

---

## Скилы

### СКИЛ: Шаблон секции

```tsx
import { motion } from 'framer-motion'
import styles from './MySection.module.scss'

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }
const fadeUp    = { hidden: { opacity:0, y:20 }, visible: { opacity:1, y:0, transition:{ duration:0.5, ease:'easeOut' } } }

const MySection = () => (
  <section className={styles.section}>
    <motion.div className={styles.container} variants={container}
      initial="hidden" whileInView="visible" viewport={{ once:true, margin:'-60px' }}>
      <motion.div className={styles.sectionLabel} variants={fadeUp}>
        {/* icon + текст */}
      </motion.div>
    </motion.div>
  </section>
)
export default MySection
```

```scss
.section {
  padding: var(--content-pad);
  @media (min-width: 768px) { padding: var(--spacing-xxl) var(--content-pad); }
}
.container {
  max-width: var(--content-max-w); margin: 0 auto;
  display: flex; flex-direction: column; gap: var(--spacing-lg);
  @media (min-width: 768px)  { max-width: 720px; }
  @media (min-width: 1024px) { max-width: 900px; }
}
```

### СКИЛ: Section label badge

```tsx
<motion.div className={styles.sectionLabel} variants={fadeUp}>
  <Icon size={13} strokeWidth={2} /> Название
</motion.div>
```

```scss
.sectionLabel {
  display: inline-flex; align-items: center; gap: 6px; align-self: flex-start;
  font-family: var(--font-sans); font-size: 0.62rem; font-weight: 700;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--accent-primary);
  padding: 4px 10px; border-radius: var(--radius-pill);
  background: var(--accent-primary-soft);
  border: 1px solid rgba(45,125,210,0.15);
}
```

### СКИЛ: Карточка

```scss
.card {
  background: var(--bg-surface); border-radius: var(--radius-card);
  border: 1px solid var(--border-subtle); box-shadow: var(--shadow-card);
  padding: var(--spacing-lg); transition: var(--transition-smooth);
  &:hover { box-shadow: var(--shadow-strong); transform: translateY(-2px); }
}
```

### СКИЛ: Кнопки

```scss
.primaryBtn {
  height: 52px; padding: 0 24px; border-radius: var(--radius-pill);
  background: var(--accent-primary); color: #fff;
  font-family: var(--font-sans); font-size: 0.9rem; font-weight: 600;
  border: none; cursor: pointer; min-height: 44px;
  box-shadow: var(--shadow-btn); transition: var(--transition-smooth);
  &:hover  { background: var(--accent-primary-dark); }
  &:active { transform: scale(0.97); }
}

.secondaryBtn {
  height: 52px; padding: 0 24px; border-radius: var(--radius-pill);
  background: transparent; color: var(--accent-primary);
  font-family: var(--font-sans); font-size: 0.9rem; font-weight: 600;
  border: 1.5px solid rgba(45,125,210,0.3); cursor: pointer; min-height: 44px;
  transition: var(--transition-smooth);
  &:hover { background: var(--accent-primary-soft); border-color: var(--accent-primary); }
}
```

### СКИЛ: Shimmer эффект на кнопке

```scss
@keyframes shimmer { 0% { left:-100%; } 100% { left:200%; } }

.btn {
  position: relative; overflow: hidden;
  &::after {
    content: ''; position: absolute; top:0; left:-100%; width:60%; height:100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
    animation: shimmer 3s infinite 0.5s; pointer-events: none;
  }
}
```

### СКИЛ: Framer Motion стандартные variants

```ts
const container = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }
const fadeUp  = { hidden: { opacity:0, y:20  }, visible: { opacity:1, y:0, transition:{ duration:0.5, ease:'easeOut' } } }
const fadeIn  = { hidden: { opacity:0 },        visible: { opacity:1,     transition:{ duration:0.4, ease:'easeOut' } } }
const scaleIn = { hidden: { opacity:0, scale:0.94 }, visible: { opacity:1, scale:1, transition:{ duration:0.45, type:'spring', stiffness:200 } } }
```

Hero → `animate`. Остальные → `whileInView` + `viewport={{ once:true, margin:'-60px' }}`.

### СКИЛ: Responsive breakpoints

```scss
// Mobile-first: базовые стили без @media
@media (min-width: 768px)  { /* tablet */ }
@media (min-width: 1024px) { /* desktop */ }
@media (min-width: 1280px) { /* wide */ }
```

### СКИЛ: PocketBase паттерны

```ts
import { pb } from '@/services/pocketbase/client'

// Список с expand relation
const res = await pb.collection('reviews').getList(1, 50, {
  sort: '-created', expand: 'author',
})

// Создать запись
await pb.collection('bookings').create({ name, phone, service, status: 'new' })

// Проверить auth
pb.authStore.isValid
pb.authStore.model?.id
pb.authStore.model?.name
pb.authStore.onChange((token, model) => { ... })
```

### СКИЛ: Telegram Login Widget

```tsx
useEffect(() => {
  const s = document.createElement('script')
  s.src = 'https://telegram.org/js/telegram-widget.js?22'
  s.setAttribute('data-telegram-login', import.meta.env.VITE_TG_BOT_USERNAME)
  s.setAttribute('data-size', 'large')
  s.setAttribute('data-radius', '20')
  s.setAttribute('data-onauth', 'onTelegramAuth(user)')
  s.setAttribute('data-request-access', 'write')
  s.async = true
  containerRef.current?.appendChild(s)
  ;(window as any).onTelegramAuth = async (user: TelegramAuthData) => {
    await authWithTelegram(user)   // из services/pocketbase/auth.ts
  }
}, [])
```

### СКИЛ: Safari iOS обязательные правила

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
```

```css
html { overscroll-behavior: none; }
body { overflow: hidden; overscroll-behavior: none; }
.app { height: 100dvh; }  /* dvh, не vh! */
```

---

## PocketBase коллекции

### users (встроенная)
| поле | тип |
|---|---|
| name | text |
| avatar | file |
| telegramId | text |

### reviews
| поле | тип | правила |
|---|---|---|
| text | text | create: @request.auth.id != "" |
| rating | number 1-5 | list/view: all |
| author | relation→users | |

### bookings
| поле | тип |
|---|---|
| name | text |
| phone | text |
| service | text |
| message | text |
| status | select: new/contacted/confirmed/done |

Rules: create — все. list/view — только admin.

---

## .env.local

```
VITE_PB_URL=http://127.0.0.1:8090
VITE_TG_BOT_TOKEN=       ← токен бота (уведомления о заявках)
VITE_TG_CHAT_ID=         ← chat id куда слать заявки
VITE_TG_BOT_USERNAME=    ← username бота (Login Widget)
```

---

## Правила работы

1. **CSS Modules везде** — `Component.module.scss` рядом с `.tsx`
2. **Mobile first** — базовые стили без медиазапроса → `@media (min-width: ...)`
3. **100dvh** — не `100vh`
4. **Touch targets** — `min-height: 44px` на всех кликабельных элементах
5. **TypeScript** — `interface` для пропсов, не `any`
6. **Ассеты** — принимать от пользователя, не генерировать заглушки
7. **Hero** → `animate`. Остальные секции → `whileInView`
8. **После правки** — обновить таблицу багов ниже

---

## Баги и TODO

| Приоритет | Где | Проблема |
|---|---|---|
| 🔴 HIGH | `.env.local` | Заполнить TG_BOT_TOKEN, TG_CHAT_ID, TG_BOT_USERNAME |
| 🔴 HIGH | `sections/` | About, Founder, Trust, Services, WhyUs, Specialists, Reviews, Booking, Contacts, Footer — заглушки |
| 🟡 MED | `services/pocketbase/auth.ts` | `/api/telegram-auth` нужен PB hook на сервере |
| 🟢 LOW | `sections/FAQ` | Свадебный контент — заменить |

---

## История изменений

| Дата | Что сделано |
|---|---|
| 2026-03-25 | Инициализация на базе wedding-starter. CLAUDE.md. CSS дизайн-система. App shell. Hero готов. |
