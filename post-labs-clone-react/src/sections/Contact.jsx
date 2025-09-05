import React from 'react'
import FloatingGrid from '../components/FloatingGrid'

const Contact = () => {
  return (
    <section className="contact-section">
    <div className="grid-container border-bottom">
      <div id="w-node-c15d94b9-0fd6-8d46-7845-1b52e3b32fc3-9f7050be" className="grid-container-col">
        <h1 data-speed="0.25" data-animation="text" className="h2 mb-small">For Investors</h1>
        <div data-animation="text" className="contact-text">We’re raising capital to scale fast. If you’re an investor who
          believes in the future of independent Canadian media, we’d love to speak with you.</div><a data-animation="fadeup" href="mailto:invest@postlabs.com" className="cta-link">invest@postlabs.com</a>
      </div>
    </div>
    <div className="grid-container border-bottom">
      <div id="w-node-_175dec5a-7319-e46a-37ab-3a79ddfb6555-9f7050be" className="grid-container-col less-padding">
        <h1 data-speed="0.25" data-animation="text" className="h2 mb-small">For Builders</h1>
        <div data-animation="text" className="contact-text">We’re hiring. If you’re passionate about media, technology, and
          the future of Canada’s digital ecosystem, come build with us. We’re always looking for great people. Check out
          our <a href="https://paint-racer-443.notion.site/Open-Positions-1d64c709c91980cd910eeef05978c45e" target="_blank" className="inline-link">jobs page</a> for current opportunities.</div><a data-animation="fadeup" href="mailto:careers@postlabs.com" className="cta-link">careers@postlabs.com</a>
      </div>
    </div>
    <FloatingGrid />
    <div className="footer-gradient">
      <div className="gradient" />
      <div className="radial-gradient" />
    </div>
  </section>
  )
}

export default Contact
