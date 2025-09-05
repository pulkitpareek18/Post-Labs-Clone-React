import React from 'react'
import FloatingGrid from '../components/FloatingGrid'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

const About = () => {
  useGSAP(() => {
    if (typeof gsap === 'undefined' || typeof SplitText === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger, SplitText);

    const textElements = document.querySelectorAll('.reveal-text');

    textElements.forEach(textElement => {
      // Split by characters
      let splitText = new SplitText(textElement, {
        type: "chars",
        charsClass: "split-char"
      });

      let chars = splitText.chars;

      // Apply CSS to maintain formatting
      chars.forEach(char => {
        char.style.display = 'inline';
        char.style.position = 'relative';
        char.style.whiteSpace = 'pre';
      });

      // Set initial opacity
      gsap.set(chars, {
        opacity: 0.15,
        ease: "none"
      });

      textElement.style.visibility = "visible";

      // Create animation
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: textElement,
          start: "top 100%",
          end: "bottom 50%",
          scrub: true,
          markers: false
        }
      });

      // Animate in chunks of 4 characters
      const charsPerChunk = 4;

      for (let i = 0; i < chars.length; i += charsPerChunk) {
        const chunk = chars.slice(i, i + charsPerChunk);
        tl.to(chunk, {
          opacity: 1,
          duration: 0.3,
          stagger: 0.02,
          ease: "power1.out"
        }, i * 0.02);
      }
    });
  });

  return (
    <section className="about-section">
    <div className="container tall">
      <p className="reveal-text">Post Labs is rethinking how digital media works for Canadians. Our mission is simple: make
        journalism profitable, sustainable, and trusted – built for Canadians, by Canadians.</p>
    </div>
    <FloatingGrid />
  </section>
  )
}

export default About
