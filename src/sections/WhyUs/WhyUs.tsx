import { motion } from 'framer-motion'
import { CheckCircle, Zap, BookOpen, UserCheck, BarChart2, Home } from 'lucide-react'
import styles from './WhyUs.module.scss'

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } }

const REASONS = [
  {
    icon: CheckCircle,
    title: 'Только доказательные методы',
    text: 'Никакого шарлатанства — работаем по научно подтверждённым протоколам АВА, нейропсихологической коррекции.',
    color: 'green',
  },
  {
    icon: UserCheck,
    title: 'Дипломированные специалисты',
    text: 'Каждый специалист имеет профильное образование и регулярно проходит супервизию.',
    color: 'primary',
  },
  {
    icon: Zap,
    title: 'Быстрый старт',
    text: 'Первичная диагностика в течение недели. Не ждём месяцами — начинаем работу сразу.',
    color: 'warm',
  },
  {
    icon: BarChart2,
    title: 'Отчёт о прогрессе',
    text: 'Каждые 4 недели — письменный отчёт о динамике и корректировка программы при необходимости.',
    color: 'teal',
  },
  {
    icon: BookOpen,
    title: 'Обучение родителей',
    text: 'Объясняем, что и как делать дома. Результат закрепляется в повседневной жизни.',
    color: 'primary',
  },
  {
    icon: Home,
    title: 'Комфортная среда',
    text: 'Светлый центр в Москве с игровыми зонами, кабинетами для сенсорной работы и уютным ожиданием.',
    color: 'green',
  },
]

const WhyUs = () => (
  <section className={styles.section}>
    <motion.div
      className={styles.container}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      <motion.div className={styles.sectionLabel} variants={fadeUp}>
        <CheckCircle size={13} strokeWidth={2} /> Почему мы
      </motion.div>

      <motion.h2 className={styles.title} variants={fadeUp}>
        6 причин выбрать{' '}
        <span className={styles.accent}>НейроЦентр</span>
      </motion.h2>

      <motion.div className={styles.grid} variants={container}>
        {REASONS.map(({ icon: Icon, title, text, color }) => (
          <motion.div key={title} className={styles.card} variants={fadeUp}>
            <div className={`${styles.iconWrap} ${styles[`icon_${color}`]}`}>
              <Icon size={20} strokeWidth={1.8} />
            </div>
            <h3 className={styles.cardTitle}>{title}</h3>
            <p className={styles.cardText}>{text}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  </section>
)

export default WhyUs
