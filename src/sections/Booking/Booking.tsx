import { useState } from 'react'
import { motion } from 'framer-motion'
import { CalendarPlus, Send, CheckCircle2 } from 'lucide-react'
import styles from './Booking.module.scss'

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } }

const SERVICES = [
  'Нейропсихологическая диагностика',
  'Логопедия',
  'АВА-терапия',
  'Нейрокоррекция',
  'Сенсорная интеграция',
  'Консультация родителей',
]

interface FormState {
  name: string
  phone: string
  service: string
  message: string
}

const Booking = () => {
  const [form, setForm] = useState<FormState>({ name: '', phone: '', service: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Partial<FormState>>({})

  const validate = () => {
    const e: Partial<FormState> = {}
    if (!form.name.trim()) e.name = 'Введите имя'
    if (!form.phone.trim()) e.phone = 'Введите телефон'
    else if (!/^[\d\s\+\-\(\)]{7,}$/.test(form.phone)) e.phone = 'Проверьте номер'
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    // Заглушка — позже подключить PocketBase / Telegram
    await new Promise(r => setTimeout(r, 800))
    setLoading(false)
    setSent(true)
  }

  const handleChange = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm(f => ({ ...f, [field]: e.target.value }))
    if (errors[field]) setErrors(er => ({ ...er, [field]: undefined }))
  }

  if (sent) {
    return (
      <section className={styles.section}>
        <motion.div
          className={styles.successWrap}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <CheckCircle2 size={52} className={styles.successIcon} />
          <h3 className={styles.successTitle}>Заявка отправлена!</h3>
          <p className={styles.successText}>
            Мы свяжемся с вами в течение нескольких часов для подтверждения записи.
          </p>
          <button className={styles.resetBtn} onClick={() => { setSent(false); setForm({ name: '', phone: '', service: '', message: '' }) }}>
            Отправить ещё одну заявку
          </button>
        </motion.div>
      </section>
    )
  }

  return (
    <section className={styles.section}>
      <motion.div
        className={styles.container}
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        <motion.div className={styles.sectionLabel} variants={fadeUp}>
          <CalendarPlus size={13} strokeWidth={2} /> Запись
        </motion.div>

        <motion.h2 className={styles.title} variants={fadeUp}>
          Записаться{' '}
          <span className={styles.accent}>на приём</span>
        </motion.h2>

        <motion.p className={styles.sub} variants={fadeUp}>
          Оставьте заявку — мы свяжемся в течение нескольких часов
          и подберём удобное время.
        </motion.p>

        <motion.form className={styles.form} onSubmit={handleSubmit} variants={fadeUp} noValidate>
          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="bk-name">Ваше имя *</label>
              <input
                id="bk-name"
                className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                type="text"
                placeholder="Как к вам обращаться?"
                value={form.name}
                onChange={handleChange('name')}
                autoComplete="name"
              />
              {errors.name && <span className={styles.error}>{errors.name}</span>}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="bk-phone">Телефон *</label>
              <input
                id="bk-phone"
                className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                type="tel"
                placeholder="+7 (___) ___-__-__"
                value={form.phone}
                onChange={handleChange('phone')}
                autoComplete="tel"
              />
              {errors.phone && <span className={styles.error}>{errors.phone}</span>}
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="bk-service">Услуга</label>
            <select
              id="bk-service"
              className={styles.select}
              value={form.service}
              onChange={handleChange('service')}
            >
              <option value="">Выберите услугу (необязательно)</option>
              {SERVICES.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="bk-message">Комментарий</label>
            <textarea
              id="bk-message"
              className={styles.textarea}
              placeholder="Опишите кратко запрос или пожелания"
              rows={3}
              value={form.message}
              onChange={handleChange('message')}
            />
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? (
              <span className={styles.spinner} />
            ) : (
              <>
                <Send size={16} strokeWidth={2} />
                Отправить заявку
              </>
            )}
          </button>
        </motion.form>
      </motion.div>
    </section>
  )
}

export default Booking
