import styles from './Home.module.css'

function MainSections() {
  const modules = import.meta.glob('../assets/content/base/main/*.png', { eager: true }) as Record<string, any>
  const items = Object.entries(modules)
    .map(([k, m]) => {
      const n = Number((k.split('/').pop() || '0').replace('.png', ''))
      return { order: n, src: (m as any).default as string }
    })
    .sort((a, b) => a.order - b.order)
  return (
    <div className={styles.sections}>
      {items.map((it, index) => (
        <img 
          key={it.src} 
          id={index === 1 ? 'about-content' : undefined}
          src={it.src} 
          alt="section" 
        />
      ))}
    </div>
  )
}

export default function About() {
  return (
    <div>
      <section className={styles.content}>
        <MainSections />
      </section>
    </div>
  )
}


