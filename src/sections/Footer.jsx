import React from 'react'

const Footer = () => {
  return (
    <footer className="footer">
    <div className="marquee">
      <div className="marquee-inner">
        <div className="marquee-text">Ready to Build the Future of Canadian Media? <a href="/contact-us" className="marquee-contact">Contact Us</a></div>
        <div className="marquee-arrow w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 57 57" fill="none">
            <path d="M5.09082 0.823242L50.0605 45.7861L49.667 2.61621L49.665 2.36133L49.9199 2.36426L55.5625 2.42969L55.8076 2.43262L55.8096 2.67773L56.25 55.998L56.252 56.252L55.998 56.25C49.1732 56.1848 39.2577 56.1118 29.3418 56.0303L29.0938 56.0273V56.0107C19.2533 55.93 9.4295 55.8577 2.66113 55.793L2.41699 55.791L2.41309 55.5479L2.32422 49.9463L2.31934 49.6895L2.57617 49.6924C8.9767 49.7576 16.4211 49.815 24.0859 49.8721L34.5908 49.9512L44.9131 50.043L45.791 50.0527L0.823242 5.08984L0.646484 4.91309L0.823242 4.73633L4.7373 0.823242L4.91406 0.646484L5.09082 0.823242Z" fill="white" stroke="white" strokeWidth={0.5} />
          </svg></div>
        <div className="marquee-text">Ready to Build the Future of Canadian Media? <a href="/contact-us" className="marquee-contact">Contact Us</a></div>
        <div className="marquee-arrow w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="57" height="57" viewBox="0 0 57 57" fill="none">
            <path d="M5.09082 0.823242L50.0605 45.7861L49.667 2.61621L49.665 2.36133L49.9199 2.36426L55.5625 2.42969L55.8076 2.43262L55.8096 2.67773L56.25 55.998L56.252 56.252L55.998 56.25C49.1732 56.1848 39.2577 56.1118 29.3418 56.0303L29.0938 56.0273V56.0107C19.2533 55.93 9.4295 55.8577 2.66113 55.793L2.41699 55.791L2.41309 55.5479L2.32422 49.9463L2.31934 49.6895L2.57617 49.6924C8.9767 49.7576 16.4211 49.815 24.0859 49.8721L34.5908 49.9512L44.9131 50.043L45.791 50.0527L0.823242 5.08984L0.646484 4.91309L0.823242 4.73633L4.7373 0.823242L4.91406 0.646484L5.09082 0.823242Z" fill="white" stroke="white" strokeWidth={0.5} />
          </svg></div>
      </div>
      <div className="w-embed">

      </div>
    </div>
    <div className="grid-container">
      <div id="w-node-_30be188b-f202-5da5-44e9-5cf93dccb0f1-3dccb0e2" className="grid-container-col footer"><a href="/" aria-current="page" className="logo-link w-inline-block w--current"><img src="https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2/682786273e6c31f3343c6700_postlabs-logo-white.svg" loading="lazy" alt="Post Labs logo white" className="footer-logo" /></a></div>
      <div id="w-node-_30be188b-f202-5da5-44e9-5cf93dccb0f3-3dccb0e2" className="grid-container-col less-padding footer">
        <ul role="list" className="footer-links w-list-unstyled">
          <li className="footer-link-item"><a href="/#top" className="footer-link">About</a></li>
          <li className="footer-link-item"><a href="/contact-us" className="footer-link">Contact</a></li>
          <li className="footer-link-item"><a href="/privacy-policy" className="footer-link">Privacy Policy</a></li>
          <li className="footer-link-item"><a fs-cc="open-preferences" href="#" className="footer-link">Cookie Policy</a></li>
        </ul>
        <h1 className="footer-heading">Sign Up for Our Newsletter</h1>
        <div className="footer-form-block w-form">
          <div className="footer-form">
            <input className="input-field w-input" maxLength={256} name="Email" data-name="Email" placeholder="Email Address" type="email" id="Email-Newsletter" /><input type="button" data-wait="Please wait..." className="form-btn w-button" value={true} /></div>
          <div className="form-message w-form-done" style={{ display: "none" }}>
            <div>Thank you! Your submission has been received!</div>
          </div>
          <div className="form-message w-form-fail" style={{ display: "none" }}>
            <div>Oops! Something went wrong while submitting the form.</div>
          </div>
        </div>
      </div>
    </div>
    <div className="copyright">
      <div className="copyright-text">© 2025 Post Labs, Frontend Assessment Project built in Vite + React ( JS + SWC ).</div>
      <div className="copyright-text">Designed by <a href="https://github.com/pulkitpareek18" target="_blank" className="copyright-link">Pulkit Pareek</a>.</div>
    </div>
  </footer>
  )
}

export default Footer
