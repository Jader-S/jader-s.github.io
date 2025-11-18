import type { ProductGroup } from '../data/products'
import styles from './ProductNav.module.css'

type Props = {
  group: ProductGroup
  activeId?: string
  onItemClick?: (itemId: string) => void
}

export default function ProductNav({ group, activeId, onItemClick }: Props) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, itemId: string) => {
    e.preventDefault()
    if (onItemClick) {
      onItemClick(itemId)
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <span className={styles.label}>{group.title}</span>
      </div>
      <nav className={styles.nav} aria-label={`${group.title} navigation`}>
        {group.items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => handleClick(e, item.id)}
            className={`${styles.link} ${activeId === item.id ? styles.active : ''}`}
          >
            {item.title}
          </a>
        ))}
      </nav>
    </div>
  )
}




