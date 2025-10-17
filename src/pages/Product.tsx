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
  console.log('🔴🔴🔴 Product 组件渲染了！！！')
  alert('Product 组件已渲染！') // 强制弹窗测试
  
  const items = useProductItems()
  console.log('🔵🔵🔵 useProductItems 返回:', items.length, '个产品')
  
  const [heroHeight, setHeroHeight] = useState<number | undefined>()
  const heroRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Map<string, HTMLElement>>(new Map())

  useEffect(() => {
    console.log('🟢🟢🟢 heroHeight effect 执行')
    const img = new Image()
    img.onload = () => setHeroHeight(img.naturalHeight)
    img.src = top
  }, [])

  // 使用 scroll 事件监听，找到当前在视口中心的元素
  useEffect(() => {
    console.log('🎯🎯🎯 Effect 运行了!!! items.length:', items.length, 'itemRefs.size:', itemRefs.current.size)
    
    // 简单测试：直接监听滚动
    const testScroll = () => {
      console.log('🎉🎉🎉 测试：滚动事件成功触发！scrollY:', window.scrollY)
    }
    
    console.log("➕➕➕ 添加测试滚动监听器")
    window.addEventListener('scroll', testScroll)
    
    const updateActiveSection = () => {
      console.log("🚀 updateActiveSection 被调用")
      
      if (itemRefs.current.size === 0) {
        console.log("⚠️ itemRefs 为空，跳过更新")
        return
      }
      
      const scrollPosition = window.scrollY + window.innerHeight / 2
      console.log("📊 scrollPosition:", scrollPosition, "window.scrollY:", window.scrollY)

      let activeId = ''
      let minDistance = Infinity

      // 找到距离视口中心最近的元素
      itemRefs.current.forEach((element, id) => {
        const rect = element.getBoundingClientRect()
        const elementCenter = rect.top + window.scrollY + rect.height / 2
        const distance = Math.abs(elementCenter - scrollPosition)
        
        console.log(`  ${id}: distance=${distance.toFixed(0)}px`)

        if (distance < minDistance) {
          minDistance = distance
          activeId = id
        }
      })

      console.log("✅ 选中的 ID:", activeId)

      // 更新 hash
      if (activeId && window.location.hash !== `#${activeId}`) {
        console.log("🔄 更新 hash:", activeId)
        window.history.replaceState(null, '', `#${activeId}`)
        // 手动触发 hashchange 事件
        window.dispatchEvent(new HashChangeEvent('hashchange'))
      }
    }

    // 防抖处理
    let timeoutId: number
    const handleScroll = () => {
      console.log("🖱️ 滚动事件触发!")
      clearTimeout(timeoutId)
      timeoutId = window.setTimeout(updateActiveSection, 100)
    }

    console.log("➕ 添加滚动监听器")
    window.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('scroll', handleScroll, { passive: true })
    
    // 延迟初始调用，等待元素渲染完成
    console.log("⏰ 设置延迟调用")
    const initTimer = setTimeout(() => {
      console.log("⏰ 延迟调用执行, itemRefs.size:", itemRefs.current.size)
      updateActiveSection()
    }, 1000)

    return () => {
      console.log("🧹 清理监听器")
      window.removeEventListener('scroll', testScroll)
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
      111
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


