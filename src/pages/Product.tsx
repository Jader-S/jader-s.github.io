import { useEffect, useMemo, useRef, useState } from 'react'
import top from '../assets/content/product/base/top.png'
import bottom from '../assets/content/product/base/bottom.png'
import styles from './Product.module.css'

type Item = { order: number; title: string; src: string; id: string }

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function useProductItems(): Item[] {
  const modules = import.meta.glob('../assets/content/product/list/*.png', { eager: true }) as Record<string, any>
  const items: Item[] = Object.entries(modules).map(([path, mod]) => {
    const filename = path.split('/').pop() || ''
    const [orderText, titleWithExt] = filename.split('-', 2)
    const title = (titleWithExt || '').replace(/\.png$/i, '')
    const order = Number(orderText)
    const id = slugify(title)
    return { order: Number.isNaN(order) ? 0 : order, title, src: (mod as any).default, id }
  })
  items.sort((a, b) => a.order - b.order)
  return items
}

export default function Product() {
  const items = useProductItems()
  const [heroHeight, setHeroHeight] = useState<number | undefined>()
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const img = new Image()
    img.onload = () => setHeroHeight(img.naturalHeight)
    img.src = top
  }, [])

  const observer = useRef<IntersectionObserver | null>(null)
  const [, setActive] = useState<string | null>(null)
  const setRefs = useMemo(() => new Map<string, HTMLElement>(), [])

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive((e.target as HTMLElement).id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 1] }
    )
    setRefs.forEach((el) => observer.current!.observe(el))
    return () => observer.current?.disconnect()
  }, [setRefs])

  return (
    <div className={styles.wrapper}>
      <div ref={heroRef} className={styles.hero} style={{ height: heroHeight ? `${heroHeight}px` : undefined }}>
        <img src={top} alt="Product hero" />
      </div>
      <div className={styles.container}>
        {/* <aside className={styles.sideNav} aria-label="Product sections">
          {items.map((it) => (
            <a key={it.id} href={`#${it.id}`} className={active === it.id ? styles.active : undefined}>
              {it.title}
            </a>
          ))}
        </aside> */}
        <section className={styles.content}>
          {items.map((it) => (
            <article
              key={it.id}
              id={it.id}
              ref={(el) => {
                if (el) setRefs.set(it.id, el)
              }}
              className={styles.block}
            >
              <img src={it.src} alt={it.title} />
            </article>
          ))}
          <img src={bottom} alt="footer" className={styles.bottom} />
        </section>
      </div>
    </div>
  )
}


