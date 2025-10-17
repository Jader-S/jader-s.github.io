import { useEffect, useRef, useState } from 'react'
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
  const itemRefs = useRef<Map<string, HTMLElement>>(new Map())

  useEffect(() => {
    const img = new Image()
    img.onload = () => setHeroHeight(img.naturalHeight)
    img.src = top
  }, [])

  // 使用 scroll 事件监听，找到当前在视口中心的元素
  useEffect(() => {
    
    const updateActiveSection = () => {
      if (itemRefs.current.size === 0) {
        return
      }
      
      const scrollPosition = window.scrollY + window.innerHeight / 2

      let activeId = ''
      let minDistance = Infinity

      // 找到距离视口中心最近的元素
      itemRefs.current.forEach((element, id) => {
        const rect = element.getBoundingClientRect()
        const elementCenter = rect.top + window.scrollY + rect.height / 2
        const distance = Math.abs(elementCenter - scrollPosition)

        if (distance < minDistance) {
          minDistance = distance
          activeId = id
        }
      })

      // 更新 hash
      if (activeId && window.location.hash !== `#${activeId}`) {
        window.history.replaceState(null, '', `#${activeId}`)
        // 手动触发 hashchange 事件
        window.dispatchEvent(new HashChangeEvent('hashchange'))
      }
    }

    // 防抖处理
    let timeoutId: number
    const handleScroll = () => {
      clearTimeout(timeoutId)
      timeoutId = window.setTimeout(updateActiveSection, 100)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('scroll', handleScroll, { passive: true })
    
    // 延迟初始调用，等待元素渲染完成
    const initTimer = setTimeout(() => {
      updateActiveSection()
    }, 1000)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('scroll', handleScroll)
      clearTimeout(timeoutId)
      clearTimeout(initTimer)
    }
  }, [])

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
                if (el) {
                  itemRefs.current.set(it.id, el)
                } else {
                  itemRefs.current.delete(it.id)
                }
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


