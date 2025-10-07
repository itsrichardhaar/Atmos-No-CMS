import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} aria-labelledby="site-footer">
      <div className={styles.inner}>
        {/* Top grid */}
        <div className={styles.top}>
          {/* Left: logo + contact + socials */}
          <div className={styles.leftCol}>
            <Link to="/" className={styles.logoLink} aria-label="Atmos LED home">
              {/* Put your white logo in /public/brand/atmos-led-logo.svg */}
              <img
                className={styles.logo}
                src="/assets/logos/Company Logo.png"
                alt="Atmos LED"
                width={160}
                height={44}
              />
            </Link>

            <div className={styles.contactBlock} aria-label="Contact">
              <div className={styles.contactTitle}>Contact:</div>
              <ul className={styles.contactList}>
                <li>
                  <a className={styles.contactItem} href="tel:8332866728">
                     <svg className="meta__icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M22 16.92v2a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.62-3.07 19.6 19.6 0 0 1-6-6A19.8 19.8 0 0 1 3.08 4.18 2 2 0 0 1 5.06 2h2a2 2 0 0 1 2 1.72c.12.86.33 1.69.62 2.49a2 2 0 0 1-.45 2.11L8.09 9.49a16.9 16.9 0 0 0 6.42 6.42l1.17-1.16a2 2 0 0 1 2.11-.45c.8.29 1.63.5 2.49.62A2 2 0 0 1 22 16.92Z"
                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                    <span>(833) 286-6728</span>
                  </a>
                </li>
                <li>
                  <a className={styles.contactItem} href="mailto:support@atmosled.com">
                    <svg className="meta__icon" viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="14" rx="2" ry="2"
                        fill="none" stroke="currentColor" strokeWidth="2"/>
                    <path d="M3 7l9 6 9-6" fill="none" stroke="currentColor" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                    <span>support@atmosled.com</span>
                  </a>
                </li>
              </ul>
            </div>

            <ul className={styles.socials} aria-label="Social media">
              <li><a className="social__link" href="https://www.linkedin.com/company/atmosled" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <svg className="social__icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8.98h5V24H0V8.98zM8.98 8.98h4.78v2.06h.07c.67-1.27 2.3-2.6 4.73-2.6 5.06 0 5.99 3.33 5.99 7.65V24h-5v-6.58c0-1.57-.03-3.6-2.19-3.6-2.2 0-2.54 1.72-2.54 3.48V24h-5V8.98z"/>
                </svg>
                </a></li>
              <li><a className="social__link" href="https://facebook.com/atmosled" target="_blank" rel="noreferrer" aria-label="Facebook">
                <svg className="social__icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M22 12a10 10 0 10-11.56 9.87v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.88h-2.34v6.99A10 10 0 0022 12z"/>
                </svg>
                </a></li>
              <li><a className="social__link" href="https://instagram.com/atmosled" target="_blank" rel="noreferrer" aria-label="Instagram">
                <svg className="social__icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H7zm5 3.5a5.5 5.5 0 110 11 5.5 5.5 0 010-11zm0 2a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm5.75-2.25a1 1 0 110 2 1 1 0 010-2z"/>
                </svg>
                </a></li>
              <li><a className="social__link" href="https://youtube.com/@atmosled" target="_blank" rel="noreferrer" aria-label="YouTube">
                <svg className="social__icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M23.5 7.2a3 3 0 00-2.1-2.1C19.6 4.5 12 4.5 12 4.5s-7.6 0-9.4.6A3 3 0 00.5 7.2C0 9 0 12 0 12s0 3 .5 4.8a3 3 0 002.1 2.1c1.8.6 9.4.6 9.4.6s7.6 0 9.4-.6a3 3 0 002.1-2.1C24 15 24 12 24 12s0-3-.5-4.8zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
                </svg>
                </a></li>
            </ul>
          </div>

          {/* Right: nav */}
          <nav className={styles.rightCol} aria-label="Footer">
            <ul className={styles.menu}>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/markets">Markets</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><a href="https://mapoutcreative.com/atmosled/">Calculator</a></li>
              <li><a href="https://dfuc15-ke.myshopify.com">Shop</a></li>
            </ul>
          </nav>
        </div>

        {/* Divider */}
        <hr className={styles.hr} />

        {/* Bottom bar */}
        <div className={styles.bottom}>
          <div className={styles.copy}>© {year} Atmos LED. All rights reserved.</div>
          <ul className={styles.legal}>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
            <li><Link to="/cookies">Cookies Settings</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
