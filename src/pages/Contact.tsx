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
            <CompanyMap lat={50.1109} lng={8.6821} addressHtml={'<strong>Valiant Global Foods</strong><br/>Frankfurt, Germany'} height={420} />
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}


