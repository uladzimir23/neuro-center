import { Home, Info, Grid, Users, BookOpen } from 'lucide-react'
import type { NavScreen } from '../BottomNav/BottomNav'
import styles from './AppBar.module.scss'

const NAV_ICONS = [Home, Info, Grid, Users, BookOpen]

interface Props {
  title:      string
  screens:    NavScreen[]
  current:    number
  onNavigate: (i: number) => void
}

const AppBar = ({ title, screens, current, onNavigate }: Props) => (
  <header className={styles.bar}>
    {/* Логотип */}
    <div className={styles.logo}>
      <span className={styles.logoMark}>НЦ</span>
      <span className={styles.logoName}>НейроЦентр</span>
    </div>

    {/* Desktop nav (скрыт на mobile) */}
    <nav className={styles.desktopNav}>
      {screens.map((s, i) => {
        const Icon = NAV_ICONS[i]
        return (
          <button
            key={s.id}
            className={`${styles.navItem} ${current === i ? styles.navItemActive : ''}`}
            onClick={() => onNavigate(i)}
          >
            <Icon size={16} strokeWidth={current === i ? 2.2 : 1.6} />
            {s.label}
          </button>
        )
      })}
    </nav>

    {/* Mobile: текущий экран */}
    <span className={styles.mobileTitle}>{title}</span>

    {/* CTA */}
    <button className={styles.cta} onClick={() => onNavigate(4)}>
      Записаться
    </button>
  </header>
)

export default AppBar
