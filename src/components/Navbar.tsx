import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import styles from './Navbar.module.css'
import logo from '../assets/header/logo.png'
import moreIcon from '../assets/header/more.png'

type Props = { onToggleSidebar: () => void }

export default function Navbar({ onToggleSidebar }: Props) {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const handleAnchorClick = (anchor: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    if (pathname !== '/') {
      // 如果不在首页，先导航到首页，然后滚动
      navigate('/')
      setTimeout(() => {
        const element = document.getElementById(anchor)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    } else {
      // 如果已经在首页，直接滚动
      const element = document.getElementById(anchor)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.leftGroup}>
        <button aria-label="More" className={styles.more} onClick={onToggleSidebar}>
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
        <a href="/#about-content" onClick={handleAnchorClick('about-content')}>About Company</a>
        <NavLink to="/product" className={({ isActive }) => (isActive ? styles.active : undefined)}>
          Product
        </NavLink>
        <a href="/#contact" onClick={handleAnchorClick('contact')}>Contact information</a>
        </nav>
      </div>
    </header>
  )
}


