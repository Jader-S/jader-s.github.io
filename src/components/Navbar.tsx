import { Link, NavLink, useLocation } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import styles from './Navbar.module.css'
import logo from '../assets/header/logo.png'
import moreIcon from '../assets/header/more.png'

type Props = { onToggleSidebar: () => void }

type ProductItem = { id: string; title: string }

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function Navbar({ onToggleSidebar }: Props) {
  const { pathname } = useLocation()
  const [showProductMenu, setShowProductMenu] = useState(false)

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
  }, [])

  // 监听 URL hash 变化（滚动时 Product 页面会自动更新 hash）
  const [active, setActive] = useState<string | null>(null)
  useEffect(() => {
    const handler = () => setActive(window.location.hash.replace('#', '') || null)
    handler()
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [])

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.leftGroup}>
        <button aria-label="More" className={styles.more} onClick={onToggleSidebar} aria-expanded={false} aria-controls="site-sidebar">
          <img src={moreIcon} alt="More" />
        </button>
        <Link to="/" className={styles.logoWrap} aria-label="Valiant">
          <img src={logo} alt="Valiant logo" className={styles.logo} />
        </Link>
        </div>
        <nav className={styles.nav} aria-label="Main">
        <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : undefined)}>
          Valiant
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => (isActive ? styles.active : undefined)}>
          About Company
        </NavLink>
        <div 
          className={styles.productDropdown}
          onMouseEnter={() => setShowProductMenu(true)}
          onMouseLeave={() => setShowProductMenu(false)}
        >
          <NavLink to="/product" className={({ isActive }) => (isActive ? styles.active : undefined)}>
            Product
          </NavLink>
          {showProductMenu && productItems.length > 0 && (
            <div className={styles.dropdownMenu}>
              {productItems.map((it) => (
                <a
                  key={it.id}
                  href={pathname === '/product' ? `#${it.id}` : `/product#${it.id}`}
                  className={`${styles.dropdownItem} ${active === it.id ? styles.activeDropdown : ''}`}
                >
                  {it.title}
                </a>
              ))}
            </div>
          )}
        </div>
        <NavLink to="/contact" className={({ isActive }) => (isActive ? styles.active : undefined)}>
          Contact Us
        </NavLink>
        </nav>
      </div>
    </header>
  )
}


