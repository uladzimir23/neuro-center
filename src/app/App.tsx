import { useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ScrollProgressContext, useScrollMotionValue } from '../shared/ScrollContext'

import Background  from '../components/Background/Background'
import AppBar      from '../components/AppBar/AppBar'
import BottomNav   from '../components/BottomNav/BottomNav'
import type { NavScreen } from '../components/BottomNav/BottomNav'

import Hero        from '../sections/Hero/Hero'
import About       from '../sections/About/About'
import Founder     from '../sections/Founder/Founder'
import Trust       from '../sections/Trust/Trust'
import WhyUs       from '../sections/WhyUs/WhyUs'
import Services    from '../sections/Services/Services'
import FAQ         from '../sections/FAQ/FAQ'
import Specialists from '../sections/Specialists/Specialists'
import Reviews     from '../sections/Reviews/Reviews'
import Booking     from '../sections/Booking/Booking'
import Contacts    from '../sections/Contacts/Contacts'
import Footer      from '../sections/Footer/Footer'

import styles from './App.module.scss'

/* ─────────────────────────────────
   Конфигурация навигации
───────────────────────────────── */
const SCREENS: NavScreen[] = [
  { id: 'home',     label: 'Главная'  },
  { id: 'about',    label: 'О центре' },
  { id: 'services', label: 'Услуги'   },
  { id: 'team',     label: 'Команда'  },
  { id: 'info',     label: 'Инфо'     },
]

const SCROLLABLE = [true, true, true, true, true]

/* ─────────────────────────────────
   Tab transition
───────────────────────────────── */
const variants = {
  enter:  (d: number) => ({ opacity: 0, y: d > 0 ? 14 : -14 }),
  center: { opacity: 1, y: 0 },
  exit:   (d: number) => ({ opacity: 0, y: d > 0 ? -8 : 8 }),
}
const spring = { type: 'tween' as const, duration: 0.26, ease: [0.4, 0, 0.2, 1] }

/* ─────────────────────────────────
   App
───────────────────────────────── */
function App() {
  const [active, setActive] = useState(0)
  const [dir,    setDir]    = useState(0)
  const prevRef = useRef(0)
  const scrollProgress = useScrollMotionValue()

  const navigate = (i: number) => {
    if (i === active) return
    setDir(i > prevRef.current ? 1 : -1)
    prevRef.current = i
    setActive(i)
    scrollProgress.set(0)
  }

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    scrollProgress.set(e.currentTarget.scrollTop)
  }

  return (
    <ScrollProgressContext.Provider value={scrollProgress}>
      <div className={styles.app}>
        <Background />

        <AppBar
          title={SCREENS[active].label}
          screens={SCREENS}
          current={active}
          onNavigate={navigate}
        />

        <main className={styles.main}>
          <AnimatePresence custom={dir} initial={false}>
            <motion.div
              key={active}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={spring}
              className={`${styles.screen} ${SCROLLABLE[active] ? styles.screenScroll : styles.screenFixed}`}
              onScroll={SCROLLABLE[active] ? handleScroll : undefined}
            >
              {active === 0 && <Hero onBook={() => navigate(4)} />}
              {active === 1 && (
                <div className={styles.tabStack}>
                  <About />
                  <Founder />
                  <Trust />
                  <WhyUs />
                </div>
              )}
              {active === 2 && (
                <div className={styles.tabStack}>
                  <Services onBook={() => navigate(4)} />
                  <FAQ />
                </div>
              )}
              {active === 3 && <Specialists />}
              {active === 4 && (
                <div className={styles.tabStack}>
                  <Booking />
                  <Reviews />
                  <Contacts />
                  <Footer />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* BottomNav — только mobile, на tablet+ скрыт через CSS */}
        <BottomNav screens={SCREENS} current={active} onChange={navigate} />
      </div>
    </ScrollProgressContext.Provider>
  )
}

export default App
