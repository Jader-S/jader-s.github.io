import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import styles from './Navbar.module.css'
import logo from '../assets/header/logo.png'
import moreIcon from '../assets/header/more.png'

type Props = { onToggleSidebar: () => void }

export default function Navbar({ onToggleSidebar }: Props) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState<string>('')

  // 监听页面滚动，检测当前可见的部分
  useEffect(() => {
    if (pathname !== '/') {
      setActiveSection('')
      return
    }

    const handleScroll = () => {
      const sections = ['about-content', 'contact']
      const scrollPosition = window.scrollY + window.innerHeight / 2

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          const elementTop = rect.top + window.scrollY
          const elementBottom = elementTop + rect.height

          if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
            setActiveSection(sectionId)
            return
          }
        }
      }

      // 如果在顶部区域，不高亮任何部分
      if (window.scrollY < 200) {
        setActiveSection('')
      }
    }

    handleScroll() // 初始检测
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

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
        <NavLink to="/" className={({ isActive }) => (isActive && !activeSection ? styles.active : undefined)}>
          Valiant
        </NavLink>
        <a 
          href="/#about-content" 
          onClick={handleAnchorClick('about-content')}
          className={activeSection === 'about-content' ? styles.active : undefined}
        >
          About Company
        </a>
        <NavLink to="/product" className={({ isActive }) => (isActive ? styles.active : undefined)}>
          Product
        </NavLink>
        <a 
          href="/#contact" 
          onClick={handleAnchorClick('contact')}
          className={activeSection === 'contact' ? styles.active : undefined}
        >
          Contact Us
        </a>
        </nav>
      </div>
    </header>
  )
}


