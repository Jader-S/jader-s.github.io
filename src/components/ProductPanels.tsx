import ScrollReveal from './ScrollReveal'
import ProductNav from './ProductNav'
import type { ProductGroup } from '../data/products'
import { resolveProductAsset } from '../utils/productAssets'
import styles from './ProductPanels.module.css'

type Props = {
  group: ProductGroup
  activeId?: string
  onItemClick?: (itemId: string) => void
  registerRef: (id: string, node: HTMLElement | null) => void
}

export default function ProductPanels({ group, activeId, onItemClick, registerRef }: Props) {
  // If activeId is provided, only show that item; otherwise show all
  const itemsToShow = activeId 
    ? group.items.filter(item => item.id === activeId)
    : group.items

  return (
    <section className={styles.group}>
      {group.heroImage && (
        <ScrollReveal className={styles.groupHeader}>
          <img
            src={resolveProductAsset(group.heroImage)}
            alt={group.title}
            className={styles.groupHero}
            loading="lazy"
            decoding="async"
          />
        </ScrollReveal>
      )}
      
      {group.slogan && (
        <div className={styles.slogan}>
          <p>{group.slogan}</p>
        </div>
      )}

      <div className={styles.navWrapper}>
        <ProductNav 
          group={group} 
          activeId={activeId}
          onItemClick={onItemClick}
        />
      </div>

      <div className={styles.cards}>
        {itemsToShow.map((item) => (
          <article
            key={item.id}
            id={item.id}
            ref={(node) => registerRef(item.id, node)}
            className={styles.card}
          >
            <ScrollReveal className={styles.cardInner}>
              <div className={styles.cardBody}>
                {item.image && (
                  <div className={styles.imageFloat}>
                    <img
                      src={resolveProductAsset(item.image)}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                )}
                {/* <p className={styles.cardEyebrow}>{group.title}</p> */}
                <h3>{item.title}</h3>
                <p className={styles.cardDescription}>{item.description}</p>

                {item.highlights && item.highlights.length > 0 && (
                  <ul className={styles.highlights}>
                    {item.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                )}

                {item.sections?.map((section) => {
                  const isTechSpecs = section.title === 'Technical Specifications'
                  
                  if (isTechSpecs) {
                    // Parse Technical Specifications: split by quality types and format as rows
                    const specsRows = section.body.map((line) => {
                      // Example: "400 GPL Quality — Brix: 45–53 | Acidity: 30–33 | Citric Acid (GPL): 390–415"
                      const match = line.match(/^(.+?)\s*—\s*(.+)$/)
                      if (match) {
                        const [, qualityLabel, specsText] = match
                        const specs = specsText.split('|').map(s => s.trim())
                        return { qualityLabel, specs }
                      }
                      return null
                    }).filter(Boolean) as Array<{ qualityLabel: string; specs: string[] }>

                    return (
                      <div key={section.title} className={styles.section}>
                        <h4 className={styles.techSpecsTitle}>{section.title}</h4>
                        <div className={styles.techSpecs}>
                          {specsRows.map((row, idx) => (
                            <div key={idx} className={styles.techSpecColumn}>
                              <div className={styles.techSpecLabel}>{row.qualityLabel}</div>
                              <div className={styles.techSpecValues}>
                                {row.specs.map((spec, specIdx) => (
                                  <span key={specIdx} className={styles.techSpecItem}>{spec}</span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  }

                  return (
                    <div key={section.title} className={styles.section}>
                      <h4 className={styles.sectionTitle}>{section.title}</h4>
                      {section.body.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  )
                })}
              </div>
            </ScrollReveal>
          </article>
        ))}
      </div>
    </section>
  )
}


