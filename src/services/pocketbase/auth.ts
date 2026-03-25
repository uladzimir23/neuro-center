import { pb } from './client'

/* ── Telegram Login Widget ──────────────────────────────
   Telegram передаёт объект с полями: id, first_name,
   last_name, username, photo_url, auth_date, hash.
   Мы создаём или логиним пользователя через PocketBase
   custom auth endpoint (или users collection + external auth).
──────────────────────────────────────────────────────── */

export interface TelegramAuthData {
  id: number
  first_name: string
  last_name?: string
  username?: string
  photo_url?: string
  auth_date: number
  hash: string
}

export async function authWithTelegram(data: TelegramAuthData) {
  // Отправляем на наш бэкенд-хук PocketBase (hooks/telegram-auth.js)
  // который верифицирует hash и создаёт/обновляет пользователя
  const result = await pb.send('/api/telegram-auth', {
    method: 'POST',
    body: JSON.stringify(data),
  })

  pb.authStore.save(result.token, result.record)
  return result.record
}

export function logout() {
  pb.authStore.clear()
}
