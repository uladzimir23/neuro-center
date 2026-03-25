import { motion } from 'framer-motion'
import { Brain, MessageSquare, Eye, Activity, Puzzle, HeartPulse, ArrowRight } from 'lucide-react'
import styles from './Services.module.scss'

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } }

interface Props {
  onBook?: () => void
}

const SERVICES = [
  {
    icon: Brain,
    title: 'Нейропсихологическая диагностика',
    desc: 'Комплексное обследование высших психических функций: внимание, память, мышление, речь.',
    duration: '90 мин',
    price: '8 000 ₽',
    color: 'primary',
    popular: true,
  },
  {
    icon: MessageSquare,
    title: 'Логопедия',
    desc: 'Коррекция звукопроизношения, развитие речи, работа с заиканием и ОНР.',
    duration: '45 мин',
    price: '3 500 ₽',
    color: 'teal',
    popular: false,
  },
  {
    icon: Activity,
    title: 'АВА-терапия',
    desc: 'Прикладной анализ поведения — эффективный метод при РАС и поведенческих нарушениях.',
    duration: '60 мин',
    price: '5 000 ₽',
    color: 'green',
    popular: false,
  },
  {
    icon: Puzzle,
    title: 'Нейрокоррекция',
    desc: 'Индивидуальные занятия по развитию когнитивных функций и коррекции задержек.',
    duration: '50 мин',
    price: '4 500 ₽',
    color: 'primary',
    popular: false,
  },
  {
    icon: Eye,
    title: 'Сенсорная интеграция',
    desc: 'Работа с нарушениями сенсорной обработки: тактильная, вестибулярная, проприоцептивная.',
    duration: '45 мин',
    price: '4 000 ₽',
    color: 'teal',
    popular: false,
  },
  {
    icon: HeartPulse,
    title: 'Консультация родителей',
    desc: 'Разбор запроса, рекомендации по развитию и коррекции в домашних условиях.',
    duration: '60 мин',
    price: '3 000 ₽',
    color: 'warm',
    popular: false,
  },
]

const Services = ({ onBook }: Props) => (
  <section className={styles.section}>
    <motion.div
      className={styles.container}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      <motion.div className={styles.sectionLabel} variants={fadeUp}>
        <Brain size={13} strokeWidth={2} /> Услуги
      </motion.div>

      <motion.h2 className={styles.title} variants={fadeUp}>
        Что мы <span className={styles.accent}>предлагаем</span>
      </motion.h2>

      <motion.p className={styles.sub} variants={fadeUp}>
        Все занятия проходят по индивидуальной программе. Стоимость — за одно занятие.
      </motion.p>

      <motion.div className={styles.grid} variants={container}>
        {SERVICES.map(({ icon: Icon, title, desc, duration, price, color, popular }) => (
          <motion.div key={title} className={`${styles.card} ${popular ? styles.cardPopular : ''}`} variants={fadeUp}>
            {popular && <div className={styles.popularBadge}>Популярно</div>}
            <div className={`${styles.iconWrap} ${styles[`icon_${color}`]}`}>
              <Icon size={22} strokeWidth={1.8} />
            </div>
            <h3 className={styles.cardTitle}>{title}</h3>
            <p className={styles.cardDesc}>{desc}</p>
            <div className={styles.cardFooter}>
              <div className={styles.meta}>
                <span className={styles.duration}>{duration}</span>
                <span className={styles.price}>{price}</span>
              </div>
              <button className={styles.bookBtn} onClick={onBook}>
                Записаться <ArrowRight size={14} strokeWidth={2} />
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  </section>
)

export default Services
