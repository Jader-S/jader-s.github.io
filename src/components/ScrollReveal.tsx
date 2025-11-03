import { useEffect, useRef } from 'react'

type Props = {
  className?: string
  animationClass?: string
  rootMargin?: string
  children: React.ReactNode
}

export default function ScrollReveal({ className, animationClass = 'fadeInUp', rootMargin = '0px 0px -15% 0px', children }: Props) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Avoid animating for users preferring reduced motion
      if (ref.current) ref.current.classList.add(animationClass)
      return
    }
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add(animationClass)
            observer.unobserve(el)
          }
        })
      },
      { root: null, rootMargin, threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [animationClass, rootMargin])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}


