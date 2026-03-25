import { motion } from 'framer-motion'
import { MapPin, Phone, Clock, Mail, Navigation } from 'lucide-react'
import styles from './Contacts.module.scss'

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } }

const CONTACTS = [
  { icon: MapPin, label: 'Адрес', value: 'Москва, ул. Академика Анохина, 2к1', color: 'primary' },
  { icon: Phone,  label: 'Телефон', value: '+7 (495) 123-45-67', color: 'teal', href: 'tel:+74951234567' },
  { icon: Mail,   label: 'Email', value: 'info@neuro-center.ru', color: 'green', href: 'mailto:info@neuro-center.ru' },
  { icon: Clock,  label: 'Режим работы', value: 'Пн–Пт: 9:00–20:00\nСб: 10:00–18:00', color: 'warm' },
]

const Contacts = () => (
  <section className={styles.section}>
    <motion.div
      className={styles.container}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      <motion.div className={styles.sectionLabel} variants={fadeUp}>
        <MapPin size={13} strokeWidth={2} /> Контакты
      </motion.div>

      <motion.h2 className={styles.title} variants={fadeUp}>
        Как нас <span className={styles.accent}>найти</span>
      </motion.h2>

      <motion.div className={styles.grid} variants={container}>
        {CONTACTS.map(({ icon: Icon, label, value, color, href }) => (
          <motion.div key={label} className={styles.card} variants={fadeUp}>
            <div className={`${styles.iconWrap} ${styles[`icon_${color}`]}`}>
              <Icon size={20} strokeWidth={1.8} />
            </div>
            <div>
              <div className={styles.cardLabel}>{label}</div>
              {href ? (
                <a href={href} className={styles.cardValue}>{value}</a>
              ) : (
                <div className={styles.cardValue} style={{ whiteSpace: 'pre-line' }}>{value}</div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div className={styles.mapWrap} variants={fadeUp}>
        <div className={styles.mapPlaceholder}>
          <div className={styles.mapInner}>
            <Navigation size={32} className={styles.mapIcon} />
            <p className={styles.mapText}>ул. Академика Анохина, 2к1</p>
            <a
              href="https://yandex.ru/maps/?text=Москва+ул+Академика+Анохина+2к1"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mapBtn}
            >
              Открыть в картах
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  </section>
)

export default Contacts
