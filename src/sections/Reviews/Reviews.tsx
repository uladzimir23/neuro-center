import { motion } from 'framer-motion'
import { Star, MessageSquare } from 'lucide-react'
import styles from './Reviews.module.scss'

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } }

const REVIEWS = [
  {
    author: 'Мария К.',
    initials: 'МК',
    rating: 5,
    text: 'Привели сына в 3 года с задержкой речи. За 6 месяцев работы с логопедом и нейропсихологом результат превзошёл все ожидания. Теперь говорит предложениями! Огромная благодарность всей команде.',
    service: 'Логопедия + Нейрокоррекция',
    date: 'Март 2025',
    color: 'primary',
  },
  {
    author: 'Дмитрий Р.',
    initials: 'ДР',
    rating: 5,
    text: 'Дочь занимается АВА-терапией уже год. Поведение стало более управляемым, научилась концентрироваться. Специалисты очень внимательны и профессиональны. Родителям тоже объяснили, что делать дома.',
    service: 'АВА-терапия',
    date: 'Февраль 2025',
    color: 'teal',
  },
  {
    author: 'Светлана М.',
    initials: 'СМ',
    rating: 5,
    text: 'Прошли диагностику у Татьяны. Впервые за долгое время получили конкретный план действий, а не общие советы. Всё чётко объяснили и расставили по полочкам. Начинаем коррекцию.',
    service: 'Нейропсихологическая диагностика',
    date: 'Январь 2025',
    color: 'green',
  },
  {
    author: 'Ольга Т.',
    initials: 'ОТ',
    rating: 5,
    text: 'Сын занимается сенсорной интеграцией. Раньше не мог носить некоторые вещи, устраивал истерики на улице. После 3 месяцев занятий стало намного лучше. Благодарю специалистов за терпение.',
    service: 'Сенсорная интеграция',
    date: 'Декабрь 2024',
    color: 'warm',
  },
]

const Stars = ({ count }: { count: number }) => (
  <div className={styles.stars}>
    {Array.from({ length: count }).map((_, i) => (
      <Star key={i} size={13} fill="currentColor" strokeWidth={0} />
    ))}
  </div>
)

const Reviews = () => (
  <section className={styles.section}>
    <motion.div
      className={styles.container}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      <motion.div className={styles.sectionLabel} variants={fadeUp}>
        <MessageSquare size={13} strokeWidth={2} /> Отзывы
      </motion.div>

      <motion.h2 className={styles.title} variants={fadeUp}>
        Что говорят <span className={styles.accent}>родители</span>
      </motion.h2>

      <motion.div className={styles.grid} variants={container}>
        {REVIEWS.map(({ author, initials, rating, text, service, date, color }) => (
          <motion.div key={author} className={styles.card} variants={fadeUp}>
            <div className={styles.cardHeader}>
              <div className={`${styles.avatar} ${styles[`avatar_${color}`]}`}>
                <span>{initials}</span>
              </div>
              <div>
                <div className={styles.author}>{author}</div>
                <div className={styles.service}>{service}</div>
              </div>
            </div>
            <Stars count={rating} />
            <p className={styles.text}>{text}</p>
            <div className={styles.date}>{date}</div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  </section>
)

export default Reviews
