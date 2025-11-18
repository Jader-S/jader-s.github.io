import ContactForm from '../components/ContactForm'
import CompanyMap from '../components/Map'
import ScrollReveal from '../components/ScrollReveal'
import bottom from '../assets/content/base/bottom.png'
import styles from './Home.module.css'

export default function Contact() {
  return (
    <section className={styles.contact}>
      <div className={styles.contactBackground}>
        <img src={bottom} alt="footer" loading="lazy" decoding="async" />
      </div>
      <div className={styles.contactFormWrapper}>
        <div className={styles.contactGrid}>
          <ScrollReveal className={styles.formCol}>
            <ContactForm />
          </ScrollReveal>
          <ScrollReveal className={styles.mapCol}>
            <CompanyMap 
              lat={39.472109736058776} 
              lng={-0.35490676912416746} 
              addressHtml={`<strong>Valiant Global Foods</strong><br/>C/ SALVADOR GINER, S/N<br/>PORTAL 13, PLANTA 2, PUERTA 6<br/>46003 VALÈNCIA-(VALENCIA)`} 
              height={420} 
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}


