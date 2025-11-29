import { Link, NavLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import styles from './Navbar.module.css'
import logo from '../assets/header/logo.png'
import moreIcon from '../assets/header/more.png'
import { productGroups } from '../data/products'

type Props = { onToggleSidebar: () => void }

export default function Navbar({ onToggleSidebar }: Props) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [showProductMenu, setShowProductMenu] = useState(false)
  
  // Get current active group from URL, default to first group if on product page without param
  const groupParam = searchParams.get('group')
  const currentGroupId = groupParam 
    ? groupParam 
    : (pathname === '/product' ? (productGroups[0]?.id ?? '') : '')


  const handleGroupClick = (groupId: string) => {
    const group = productGroups.find(g => g.id === groupId)
    if (!group) return

    if (pathname === '/product') {
      // If already on the product page, fire group change event and update the URL
      window.dispatchEvent(new CustomEvent('productGroupChange', { detail: { groupId } }))
      // Update URL query parameter
      navigate(`/product?group=${groupId}`, { replace: true })
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      // If not on the product page, navigate there and set the group
      navigate(`/product?group=${groupId}`)
    }
    setShowProductMenu(false)
  }

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
          {showProductMenu && productGroups.length > 0 && (
            <div className={styles.dropdownMenu}>
              {productGroups.map((group) => (
                <button
                  key={group.id}
                  onClick={() => handleGroupClick(group.id)}
                  className={`${styles.dropdownItem} ${currentGroupId === group.id ? styles.activeDropdown : ''}`}
                >
                  {group.title}
                </button>
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


