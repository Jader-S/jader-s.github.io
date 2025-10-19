import { useEffect, useState } from 'react'
import styles from './Carousel.module.css'
import leftBg from '../assets/content/base/carousel-btn-background-left.png'
import rightBg from '../assets/content/base/carousel-btn-background-right.png'
import iconActive from '../assets/content/base/carousel-btn-icon-active.png'
import iconDisabled from '../assets/content/base/carousel-btn-icon-disabled.png'

type Slide = { order: number; src: string }

function loadSlides(): Slide[] {
  const modules = import.meta.glob('../assets/content/base/carouselList/*.png', { eager: true }) as Record<string, any>
  const mapped: Slide[] = Object.entries(modules).map(([path, mod]) => {
    const filename = path.split('/').pop() || '0.png'
    const base = filename.replace('.png', '')
    const order = Number(base)
    return { order: Number.isNaN(order) ? 0 : order, src: (mod as any).default }
  })
  mapped.sort((a, b) => a.order - b.order)
  return mapped
}

export default function Carousel() {
  const [slides] = useState<Slide[]>(loadSlides())
  const [index, setIndex] = useState(0)

  // if (slides.length === 0) return null

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000)
    return () => clearInterval(id)
  }, [slides.length])

  const prev = () => setIndex((i) => Math.max(0, i - 1))
  const next = () => setIndex((i) => Math.min(slides.length - 1, i + 1))

  return (
    <div className={styles.carousel}>
      {slides.map((s, i) => (
        <img key={s.src} src={s.src} className={`${styles.slide} ${i === index ? styles.active : ''}`} alt="slide" />
      ))}

      <button className={`${styles.navBtn} ${styles.left}`} onClick={prev} aria-label="Previous" disabled={index === 0}>
        <img className={styles.btnBg} src={leftBg} alt="" aria-hidden="true" />
        <img className={`${styles.btnIcon} ${index !== 0 ? styles.reverse : ''}`} src={index === 0 ? iconDisabled : iconActive} alt="" aria-hidden="true" />
      </button>
      <button className={`${styles.navBtn} ${styles.right}`} onClick={next} aria-label="Next" disabled={index === slides.length - 1}>
        <img className={styles.btnBg} src={rightBg} alt="" aria-hidden="true" />
        <img className={`${styles.btnIcon} ${index === slides.length - 1 ? styles.reverse : ''}`} src={index === slides.length - 1 ? iconDisabled : iconActive} alt="" aria-hidden="true" />
      </button>

      {/* 圆点指示器 */}
      <div className={styles.dots}>
        {slides.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === index ? styles.dotActive : ''}`}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}


