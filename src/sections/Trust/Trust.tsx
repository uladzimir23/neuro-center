import { motion } from 'framer-motion'
import { Users, Clock, TrendingUp, ThumbsUp } from 'lucide-react'
import styles from './Trust.module.scss'

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } }

const STATS = [
  { icon: Users,      value: '400+',  label: 'семей',          desc: 'которым помогли за 7 лет',        color: 'primary' },
  { icon: Clock,      value: '7 лет', label: 'опыта',           desc: 'работы с детьми от 1 до 12 лет', color: 'teal'    },
  { icon: TrendingUp, value: '95%',   label: 'динамика',        desc: 'детей показывают прогресс',       color: 'green'   },
  { icon: ThumbsUp,   value: '4.9',   label: 'рейтинг',         desc: 'средняя оценка по отзывам',      color: 'warm'    },
]

const Trust = () => (
  <section className={styles.section}>
    <motion.div
      className={styles.container}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      <motion.div className={styles.grid} variants={container}>
        {STATS.map(({ icon: Icon, value, label, desc, color }) => (
          <motion.div key={label} className={styles.card} variants={fadeUp}>
            <div className={`${styles.iconWrap} ${styles[`icon_${color}`]}`}>
              <Icon size={22} strokeWidth={1.8} />
            </div>
            <div className={`${styles.value} ${styles[`value_${color}`]}`}>{value}</div>
            <div className={styles.label}>{label}</div>
            <div className={styles.desc}>{desc}</div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  </section>
)

export default Trust
