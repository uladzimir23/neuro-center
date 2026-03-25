/* ─────────────────────────────────
   Domain types
───────────────────────────────── */

export interface Specialist {
  id: string
  name: string
  role: string
  experience: number   // лет
  photo?: string
  bio?: string
  methods?: string[]
}

export interface Service {
  id: string
  title: string
  description: string
  duration: string     // "60 мин"
  price: string        // "5 000 ₽"
  icon?: string
  color?: string       // CSS color var для карточки
}

export interface Review {
  id: string
  text: string
  rating: number       // 1–5
  author: string
  authorId: string     // PocketBase user id
  avatar?: string
  date: string
  verified: boolean
}

export interface Booking {
  id?: string
  name: string
  phone: string
  service?: string
  message?: string
  status?: 'new' | 'contacted' | 'confirmed' | 'done'
}

export interface TrustStat {
  value: string
  label: string
  description?: string
}

/* ─────────────────────────────────
   PocketBase Auth
───────────────────────────────── */

export interface PBUser {
  id: string
  email?: string
  name?: string
  avatarUrl?: string
  telegramId?: string
}
