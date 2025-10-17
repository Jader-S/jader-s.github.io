import { useLocation } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import styles from './Sidebar.module.css'

type Props = { open: boolean; onClose: () => void }

type ProductItem = { id: string; title: string }

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function Sidebar({ open, onClose }: Props) {
  const { pathname } = useLocation()

  // Only navigate when user clicks; no auto-navigation on open.

  const productItems = useMemo<ProductItem[]>(() => {
    const modules = import.meta.glob('../assets/content/product/list/*.png', { eager: true }) as Record<string, any>
    const items = Object.keys(modules)
      .map((p) => p.split('/').pop() || '')
      .map((name) => {
        const [orderText, rest] = name.split('-', 2)
        const order = Number(orderText)
        const title = (rest || '').replace(/\..+$/, '')
        return { order: Number.isNaN(order) ? 0 : order, title, id: slugify(title) }
      })
      .sort((a, b) => a.order - b.order)
      .map(({ id, title }) => ({ id, title }))
    return items
  }, [pathname])
  
  // 监听 URL hash 变化（滚动时 Product 页面会自动更新 hash）
  const [active, setActive] = useState<string | null>(null)
  useEffect(() => {
    const handler = () => setActive(window.location.hash.replace('#', '') || null)
    handler()
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [])
  return (
    <aside className={`${styles.sidebar} ${open ? styles.open : ''}`} aria-hidden={!open}>
      <button className={styles.backdrop} aria-label="Close navigation" onClick={onClose} />
      <div className={styles.panel} role="navigation" aria-label="Sidebar">
        { productItems.length > 0 && (
          <div style={{ marginTop: 12, borderTop: '1px solid rgba(0,0,0,.06)', paddingTop: 12 }}>
            {productItems.map((it) => (
              <a
                key={it.id}
                href={pathname === '/product' ? `#${it.id}` : `/product#${it.id}`}
                className={`${styles.link} ${active === it.id ? styles.activeLink : ''}`}
              >
                {it.title}
              </a>
            ))}
          </div>
        )}
      </div>
    </aside>
  )
}


