/* ── Telegram Bot уведомления о новых заявках ──────────
   Вызывается из PocketBase hook (pb_hooks/on_booking.pb.js)
   после создания записи в bookings.

   Здесь — вспомогательная утилита для прямого вызова
   из фронта (fallback, если PB hooks не настроены).
──────────────────────────────────────────────────────── */

const BOT_TOKEN = import.meta.env.VITE_TG_BOT_TOKEN
const CHAT_ID   = import.meta.env.VITE_TG_CHAT_ID

export async function notifyBooking(data: {
  name: string
  phone: string
  service?: string
  message?: string
}): Promise<void> {
  if (!BOT_TOKEN || !CHAT_ID) return

  const text = [
    `📋 *Новая заявка*`,
    `👤 Имя: ${data.name}`,
    `📞 Телефон: ${data.phone}`,
    data.service ? `🏥 Услуга: ${data.service}` : null,
    data.message ? `💬 Сообщение: ${data.message}` : null,
  ]
    .filter(Boolean)
    .join('\n')

  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text,
      parse_mode: 'Markdown',
    }),
  })
}
