import { motion } from 'framer-motion'
import { Quote, Award, BookOpen, Sparkles } from 'lucide-react'
import styles from './Founder.module.scss'

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } }

const METHODS = ['АВА-терапия', 'Нейропсихологическая коррекция', 'Сенсорная интеграция', 'Логопедия', 'Арт-терапия']

const Founder = () => (
  <section className={styles.section}>
    <motion.div
      className={styles.container}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      <motion.div className={styles.sectionLabel} variants={fadeUp}>
        <Award size={13} strokeWidth={2} /> Основатель
      </motion.div>

      <motion.div className={styles.card} variants={fadeUp}>
        {/* Avatar placeholder */}
        <div className={styles.avatarWrap}>
          <div className={styles.avatar}>
            <span className={styles.avatarInitials}>ТМ</span>
          </div>
          <div className={styles.avatarBadge}>
            <Sparkles size={12} strokeWidth={2} />
            <span>7 лет опыта</span>
          </div>
        </div>

        <div className={styles.info}>
          <h2 className={styles.name}>Татьяна Михайлова</h2>
          <p className={styles.role}>Нейропсихолог, основатель НейроЦентра</p>

          <div className={styles.quoteWrap}>
            <Quote size={20} className={styles.quoteIcon} />
            <p className={styles.quote}>
              Каждый ребёнок способен на большее — нам важно создать для него
              правильные условия и поддержать семью на этом пути.
            </p>
          </div>

          <p className={styles.bio}>
            Татьяна получила образование нейропсихолога в МГУ, прошла стажировки
            по АВА-терапии в России и за рубежом. В 2017 году основала НейроЦентр
            с миссией сделать качественную помощь детям доступной для каждой семьи.
          </p>

          <div className={styles.credentials}>
            <div className={styles.credential}>
              <BookOpen size={14} strokeWidth={2} />
              <span>МГУ им. М.В. Ломоносова, факультет психологии</span>
            </div>
            <div className={styles.credential}>
              <Award size={14} strokeWidth={2} />
              <span>Сертифицированный АВА-специалист BCBA</span>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div className={styles.methodsBlock} variants={fadeUp}>
        <p className={styles.methodsTitle}>Методы работы</p>
        <div className={styles.methods}>
          {METHODS.map(m => (
            <span key={m} className={styles.methodTag}>{m}</span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  </section>
)

export default Founder
