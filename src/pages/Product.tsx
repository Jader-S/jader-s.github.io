import { useEffect, useRef, useState } from 'react'
import bottom from '../assets/content/product/base/bottom.png'
import { useSearchParams, useNavigate } from 'react-router-dom'
import styles from './Product.module.css'
import ProductPanels from '../components/ProductPanels'
import { productGroups } from '../data/products'

export default function Product() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const groupParam = searchParams.get('group')
  // Use URL parameter as single source of truth
  const activeGroupId = groupParam && productGroups.some(g => g.id === groupParam) 
    ? groupParam 
    : (productGroups[0]?.id ?? 'nfc')
  const [activeId, setActiveId] = useState<string>('')
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map())
  const activeIdRef = useRef<string>('')

  const activeGroup = productGroups.find(g => g.id === activeGroupId) || productGroups[0]

  // Listen for group change events from Navbar (for scrolling)
  useEffect(() => {
    const handleGroupChange = () => {
      // Scroll to top when group changes
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    window.addEventListener('productGroupChange', handleGroupChange as EventListener)
    return () => window.removeEventListener('productGroupChange', handleGroupChange as EventListener)
  }, [])

  // Initialize activeId when group changes
  useEffect(() => {
    if (activeGroup?.items[0]?.id) {
      const firstId = activeGroup.items[0].id
      setActiveId(firstId)
      activeIdRef.current = firstId
    }
  }, [activeGroupId, activeGroup])

  // Keep ref in sync with state
  useEffect(() => {
    activeIdRef.current = activeId
  }, [activeId])

  // No longer need scroll tracking since we're switching panels directly

  useEffect(() => {
    if (!activeId) return
    if (window.location.hash.replace('#', '') !== activeId) {
      window.history.replaceState(null, '', `#${activeId}`)
    }
  }, [activeId])

  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (hash) {
      // Check if hash matches a product ID
      const matchingGroup = productGroups.find(g => 
        g.items.some(item => item.id === hash)
      )
      const NAVBAR_OFFSET = 120 // Navbar height
      
      if (matchingGroup && matchingGroup.id !== activeGroupId) {
        // Update URL to match the group
        navigate(`/product?group=${matchingGroup.id}`, { replace: true })
        setActiveId(hash)
        setTimeout(() => {
          const target = document.getElementById(hash)
          if (target) {
            const targetPosition = target.getBoundingClientRect().top + window.scrollY
            const offsetPosition = targetPosition - NAVBAR_OFFSET
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            })
          }
        }, 100)
      } else if (matchingGroup) {
        setActiveId(hash)
        setTimeout(() => {
          const target = document.getElementById(hash)
          if (target) {
            const targetPosition = target.getBoundingClientRect().top + window.scrollY
            const offsetPosition = targetPosition - NAVBAR_OFFSET
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            })
          }
        }, 100)
      }
    }
  }, [activeGroupId, navigate])

  const registerRef = (id: string, node: HTMLElement | null) => {
    if (node) {
      sectionRefs.current.set(id, node)
    } else {
      sectionRefs.current.delete(id)
    }
  }

  const handleNavItemClick = (itemId: string) => {
    setActiveId(itemId)
    activeIdRef.current = itemId
    // Update URL hash
    window.history.replaceState(null, '', `#${itemId}`)
  }

  return (
    <div className={styles.page}>
      {/* <div className={styles.hero}>
        <img src={top} alt="Product hero" loading="eager" decoding="async" />
      </div> */}

      <div className={styles.content}>
        <main className={styles.main}>
          {activeGroup && (
            <ProductPanels 
              group={activeGroup} 
              activeId={activeId}
              onItemClick={handleNavItemClick}
              registerRef={registerRef} 
            />
          )}
          <img src={bottom} alt="footer" className={styles.bottom} loading="lazy" decoding="async" />
        </main>
      </div>
    </div>
  )
}



