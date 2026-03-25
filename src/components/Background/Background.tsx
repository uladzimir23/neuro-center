import { useTransform, useSpring, motion } from 'framer-motion'
import { useScrollProgress } from '../../shared/ScrollContext'
import styles from './Background.module.scss'

/* ── SVG декорации — нейро/медицинская тема ── */
const CircleSvg = ({ opacity = 0.06 }: { opacity?: number }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <circle cx="60" cy="60" r="55" stroke="currentColor" strokeWidth="1.5" opacity={opacity} />
    <circle cx="60" cy="60" r="38" stroke="currentColor" strokeWidth="1" opacity={opacity * 0.6} />
  </svg>
)

const CrossSvg = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const Background = () => {
  const scrollYProgress = useScrollProgress()

  const ySlow = useSpring(useTransform(scrollYProgress, (v) => v * -0.06), { stiffness: 28, damping: 22 })
  const yMed  = useSpring(useTransform(scrollYProgress, (v) => v * -0.14), { stiffness: 28, damping: 22 })
  const yFast = useSpring(useTransform(scrollYProgress, (v) => v * -0.24), { stiffness: 28, damping: 22 })

  return (
    <div className={styles.background} aria-hidden="true">

      {/* ── Ambient gradient blobs ── */}
      <div className={styles.blobTL} />
      <div className={styles.blobBR} />
      <div className={styles.blobCenter} />

      {/* ── Circles ── */}
      <motion.div className={`${styles.el} ${styles.circleTR}`} style={{ y: ySlow }}>
        <CircleSvg opacity={0.07} />
      </motion.div>
      <motion.div className={`${styles.el} ${styles.circleBL}`} style={{ y: yMed }}>
        <CircleSvg opacity={0.05} />
      </motion.div>

      {/* ── Crosses ── */}
      <motion.div className={`${styles.el} ${styles.cross1}`} style={{ y: yFast }}>
        <CrossSvg />
      </motion.div>
      <motion.div className={`${styles.el} ${styles.cross2}`} style={{ y: yMed }}>
        <CrossSvg />
      </motion.div>
      <motion.div className={`${styles.el} ${styles.cross3}`} style={{ y: ySlow }}>
        <CrossSvg />
      </motion.div>

    </div>
  )
}

export default Background
