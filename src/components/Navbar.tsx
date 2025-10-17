import { Link, NavLink, useLocation } from 'react-router-dom'
import styles from './Navbar.module.css'
import logo from '../assets/header/logo.png'
import moreIcon from '../assets/header/more.png'

type Props = { onToggleSidebar: () => void }

export default function Navbar({ onToggleSidebar }: Props) {
  const { pathname } = useLocation()
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
        <a href={pathname === '/' ? '#about' : '/#about'}>About Company</a>
        <NavLink to="/product" className={({ isActive }) => (isActive ? styles.active : undefined)}>
          Product
        </NavLink>
        <a href={pathname === '/' ? '#contact' : '/#contact'}>Contact information</a>
        </nav>
      </div>
    </header>
  )
}


