import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'
import styles from './FAQ.module.scss'

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } }

const FAQS = [
  {
    q: 'С какого возраста вы принимаете детей?',
    a: 'Мы работаем с детьми от 1 года до 12 лет. Чем раньше начать коррекцию — тем лучше результат. Не откладывайте обращение.',
  },
  {
    q: 'Как проходит первый визит?',
    a: 'Первый визит — это диагностика. Специалист проводит обследование ребёнка, беседует с родителями и изучает историю развития. По итогам составляется индивидуальная программа занятий.',
  },
  {
    q: 'Как часто нужно приходить?',
    a: 'Оптимальная частота зависит от запроса и программы — как правило, 2–3 раза в неделю. Специалист даст рекомендации после диагностики.',
  },
  {
    q: 'Нужно ли заключение врача?',
    a: 'Нет, медицинское направление не требуется. Вы можете обратиться к нам напрямую. При необходимости мы сами порекомендуем профильного врача.',
  },
  {
    q: 'Как долго длится курс коррекции?',
    a: 'Сроки индивидуальны и зависят от запроса, возраста ребёнка и регулярности занятий. В среднем заметные изменения появляются через 2–3 месяца работы.',
  },
  {
    q: 'Есть ли онлайн-формат?',
    a: 'Консультации родителей и некоторые логопедические занятия доступны онлайн. Нейрокоррекция, АВА и сенсорная интеграция проводятся только очно.',
  },
  {
    q: 'Как оплатить занятия?',
    a: 'Принимаем оплату наличными и картой на месте, а также переводом. Возможна оплата курсом занятий со скидкой.',
  },
]

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className={styles.section}>
      <motion.div
        className={styles.container}
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        <motion.div className={styles.sectionLabel} variants={fadeUp}>
          <HelpCircle size={13} strokeWidth={2} /> Вопросы и ответы
        </motion.div>

        <motion.h2 className={styles.title} variants={fadeUp}>
          Часто задаваемые <span className={styles.accent}>вопросы</span>
        </motion.h2>

        <motion.div className={styles.list} variants={container}>
          {FAQS.map((item, i) => (
            <motion.div key={i} className={styles.item} variants={fadeUp}>
              <button
                className={`${styles.question} ${open === i ? styles.questionOpen : ''}`}
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span>{item.q}</span>
                <motion.span
                  className={styles.chevron}
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <ChevronDown size={18} strokeWidth={2} />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: 'easeInOut' }}
                    className={styles.answerWrap}
                  >
                    <p className={styles.answer}>{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

export default FAQ
