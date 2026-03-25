import { motion } from 'framer-motion'
import { Users, Star } from 'lucide-react'
import styles from './Specialists.module.scss'

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } }

const TEAM = [
  {
    initials: 'ТМ',
    name: 'Татьяна Михайлова',
    role: 'Нейропсихолог, основатель',
    experience: 7,
    methods: ['Нейрокоррекция', 'АВА', 'Диагностика'],
    rating: 5.0,
    color: 'primary',
  },
  {
    initials: 'АС',
    name: 'Алина Соколова',
    role: 'Логопед-дефектолог',
    experience: 5,
    methods: ['Логопедия', 'ОНР', 'Заикание'],
    rating: 4.9,
    color: 'teal',
  },
  {
    initials: 'ДВ',
    name: 'Дмитрий Волков',
    role: 'АВА-терапист',
    experience: 4,
    methods: ['АВА-терапия', 'РАС', 'Поведение'],
    rating: 4.9,
    color: 'green',
  },
  {
    initials: 'НК',
    name: 'Надежда Крылова',
    role: 'Нейропсихолог',
    experience: 6,
    methods: ['Сенсорная интеграция', 'Коррекция'],
    rating: 5.0,
    color: 'warm',
  },
  {
    initials: 'МП',
    name: 'Мария Петрова',
    role: 'Логопед',
    experience: 3,
    methods: ['Речевое развитие', 'Звукопроизношение'],
    rating: 4.8,
    color: 'primary',
  },
]

const Specialists = () => (
  <section className={styles.section}>
    <motion.div
      className={styles.container}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      <motion.div className={styles.sectionLabel} variants={fadeUp}>
        <Users size={13} strokeWidth={2} /> Команда
      </motion.div>

      <motion.h2 className={styles.title} variants={fadeUp}>
        Наши <span className={styles.accent}>специалисты</span>
      </motion.h2>

      <motion.p className={styles.sub} variants={fadeUp}>
        Каждый специалист имеет профильное образование, постоянно повышает квалификацию
        и работает под супервизией.
      </motion.p>

      <motion.div className={styles.grid} variants={container}>
        {TEAM.map(({ initials, name, role, experience, methods, rating, color }) => (
          <motion.div key={name} className={styles.card} variants={fadeUp}>
            <div className={`${styles.avatar} ${styles[`avatar_${color}`]}`}>
              <span className={styles.initials}>{initials}</span>
            </div>
            <div className={styles.info}>
              <h3 className={styles.name}>{name}</h3>
              <p className={styles.role}>{role}</p>
              <div className={styles.stats}>
                <div className={styles.stat}>
                  <span className={styles.statValue}>{experience} лет</span>
                  <span className={styles.statLabel}>опыт</span>
                </div>
                <div className={styles.divider} />
                <div className={styles.stat}>
                  <div className={styles.ratingRow}>
                    <Star size={12} className={styles.star} />
                    <span className={styles.statValue}>{rating.toFixed(1)}</span>
                  </div>
                  <span className={styles.statLabel}>рейтинг</span>
                </div>
              </div>
              <div className={styles.methods}>
                {methods.map(m => (
                  <span key={m} className={styles.methodTag}>{m}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  </section>
)

export default Specialists
