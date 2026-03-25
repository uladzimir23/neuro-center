import { motion } from 'framer-motion'
import { Heart, Shield, Microscope, Users } from 'lucide-react'
import styles from './About.module.scss'

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } }

const VALUES = [
  {
    icon: Microscope,
    title: 'Доказательный подход',
    text: 'Работаем по методам с подтверждённой эффективностью: АВА, нейропсихологическая коррекция, логопедия.',
    color: 'primary',
  },
  {
    icon: Heart,
    title: 'Забота о каждом',
    text: 'Индивидуальная программа для каждого ребёнка с учётом темпа, особенностей и запроса семьи.',
    color: 'teal',
  },
  {
    icon: Shield,
    title: 'Безопасная среда',
    text: 'Доверительная атмосфера, где ребёнок чувствует себя комфортно и открыт к прогрессу.',
    color: 'green',
  },
  {
    icon: Users,
    title: 'Работаем с семьёй',
    text: 'Родители — активные участники процесса. Обучаем и поддерживаем на всех этапах.',
    color: 'warm',
  },
]

const About = () => (
  <section className={styles.section}>
    <motion.div
      className={styles.container}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      <motion.div className={styles.sectionLabel} variants={fadeUp}>
        <Heart size={13} strokeWidth={2} /> О нас
      </motion.div>

      <motion.h2 className={styles.title} variants={fadeUp}>
        Помогаем детям{' '}
        <span className={styles.accent}>раскрыть потенциал</span>
      </motion.h2>

      <motion.p className={styles.lead} variants={fadeUp}>
        НейроЦентр — команда специалистов по развитию детей от 1 до 12 лет.
        Диагностика, коррекция и сопровождение на каждом этапе.
        За 7 лет мы помогли более 400 семьям в Москве.
      </motion.p>

      <motion.div className={styles.values} variants={container}>
        {VALUES.map(({ icon: Icon, title, text, color }) => (
          <motion.div key={title} className={`${styles.card} ${styles[`card_${color}`]}`} variants={fadeUp}>
            <div className={`${styles.iconWrap} ${styles[`icon_${color}`]}`}>
              <Icon size={20} strokeWidth={1.8} />
            </div>
            <div>
              <h3 className={styles.cardTitle}>{title}</h3>
              <p className={styles.cardText}>{text}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  </section>
)

export default About
