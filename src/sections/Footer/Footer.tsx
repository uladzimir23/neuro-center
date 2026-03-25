import { motion } from 'framer-motion'
import { Brain, Instagram, Youtube, MessageCircle } from 'lucide-react'
import styles from './Footer.module.scss'

const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } }

const SOCIALS = [
  { icon: Instagram,     label: 'Instagram', href: '#' },
  { icon: Youtube,       label: 'YouTube',   href: '#' },
  { icon: MessageCircle, label: 'Telegram',  href: '#' },
]

const LINKS = [
  { label: 'О центре',    href: '#' },
  { label: 'Специалисты', href: '#' },
  { label: 'Услуги',      href: '#' },
  { label: 'Контакты',    href: '#' },
  { label: 'Политика конфиденциальности', href: '#' },
]

const Footer = () => (
  <footer className={styles.footer}>
    <motion.div
      className={styles.container}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
    >
      <motion.div className={styles.brand} variants={fadeUp}>
        <div className={styles.logo}>
          <Brain size={22} strokeWidth={1.8} className={styles.logoIcon} />
          <span className={styles.logoText}>НейроЦентр</span>
        </div>
        <p className={styles.tagline}>
          Помогаем детям раскрыть потенциал<br />через доказательную нейрокоррекцию
        </p>
      </motion.div>

      <motion.div className={styles.socials} variants={fadeUp}>
        {SOCIALS.map(({ icon: Icon, label, href }) => (
          <a key={label} href={href} className={styles.socialBtn} aria-label={label} target="_blank" rel="noopener noreferrer">
            <Icon size={18} strokeWidth={1.8} />
          </a>
        ))}
      </motion.div>

      <motion.nav className={styles.links} variants={fadeUp}>
        {LINKS.map(({ label, href }) => (
          <a key={label} href={href} className={styles.link}>{label}</a>
        ))}
      </motion.nav>

      <motion.div className={styles.bottom} variants={fadeUp}>
        <span>© {new Date().getFullYear()} НейроЦентр. Все права защищены.</span>
        <span>Москва, ул. Академика Анохина, 2к1</span>
      </motion.div>
    </motion.div>
  </footer>
)

export default Footer
