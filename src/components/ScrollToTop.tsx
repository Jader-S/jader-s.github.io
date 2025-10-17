import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // 当路由改变时，滚动到页面顶部
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
