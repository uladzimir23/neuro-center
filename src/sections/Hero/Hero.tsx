import { motion } from 'framer-motion'
import { ArrowRight, Users, Star, Clock } from 'lucide-react'
import styles from './Hero.module.scss'

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }
const fadeUp     = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } } }
const fadeIn     = { hidden: { opacity: 0 },         visible: { opacity: 1,     transition: { duration: 0.5,  delay: 0.4, ease: 'easeOut' } } }

interface Props {
  onBook?: () => void
}

const STATS = [
  { icon: Users, value: '400+',  label: 'семей' },
  { icon: Clock, value: '7 лет', label: 'опыта' },
  { icon: Star,  value: '95%',   label: 'динамика' },
]

const Hero = ({ onBook }: Props) => (
  <section className={styles.section}>
    <motion.div
      className={styles.container}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {/* Badge */}
      <motion.div className={styles.badge} variants={fadeUp}>
        <span className={styles.badgeDot} />
        Принимаем детей от 1 до 12 лет
      </motion.div>

      {/* Heading */}
      <motion.h1 className={styles.heading} variants={fadeUp}>
        Центр нейроразвития{' '}
        <span className={styles.accent}>детей</span>
      </motion.h1>

      {/* Sub */}
      <motion.p className={styles.sub} variants={fadeUp}>
        Диагностика и коррекция речи, поведения и развития.
        Логопеды, нейропсихологи, АВА‑тераписты — доказательные методы.
      </motion.p>

      {/* CTA */}
      <motion.div className={styles.actions} variants={fadeUp}>
        <button className={styles.primaryBtn} onClick={onBook}>
          Записаться на диагностику
          <ArrowRight size={18} strokeWidth={2} />
        </button>
        <button className={styles.secondaryBtn}>
          Наши услуги
        </button>
      </motion.div>

      {/* Stats */}
      <motion.div className={styles.stats} variants={fadeIn}>
        {STATS.map(({ icon: Icon, value, label }) => (
          <div key={label} className={styles.stat}>
            <Icon size={16} className={styles.statIcon} />
            <span className={styles.statValue}>{value}</span>
            <span className={styles.statLabel}>{label}</span>
          </div>
        ))}
      </motion.div>
    </motion.div>
  </section>
)

export default Hero
