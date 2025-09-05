import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

import heroGlow from '../assets/hero-glow.svg'

import FloatingGrid from "../components/FloatingGrid"
import Header from '../components/Header'
import Cards from '../components/Cards'

export default function HeroSection() {
  const glowRef = useRef(null)
  const cursorFollowRef = useRef(false)
  const currentTweenRef = useRef(null)
  const fadeTweenRef = useRef(null)
  const scrollTimeoutRef = useRef(null)
  const globalResizeTimeoutRef = useRef(null)
  const observersRef = useRef([])

  const isDesktop = () => typeof window !== 'undefined' && window.innerWidth > 768

  useEffect(() => {
    if (typeof gsap === 'undefined') return

    const heroGlow = glowRef.current
    const aboutSection = document.querySelector('.about-section')
    const trackingSections = document.querySelectorAll('.hero, .card-section')

    if (!heroGlow || !aboutSection || trackingSections.length === 0) return

    function handleMouseMove(e) {
      if (!cursorFollowRef.current || !isDesktop()) return

      if (currentTweenRef.current) currentTweenRef.current.kill()
      if (fadeTweenRef.current) fadeTweenRef.current.kill()

      gsap.set(heroGlow, { opacity: 1 })

      currentTweenRef.current = gsap.to(heroGlow, {
        position: 'fixed',
        left: `${e.clientX}px`,
        top: `${e.clientY}px`,
        right: 'auto',
        transform: 'translate(-50%, -50%)',
        duration: 0.6,
        ease: 'power2.out'
      })
    }

    function returnToOriginal() {
      cursorFollowRef.current = false

      if (currentTweenRef.current) currentTweenRef.current.kill()
      if (fadeTweenRef.current) fadeTweenRef.current.kill()

      const exitTimeline = gsap.timeline()

      exitTimeline.to(heroGlow, {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        ease: 'power2.out'
      })

      exitTimeline.to(heroGlow, {
        position: 'absolute',
        top: '-200px',
        right: '-200px',
        left: 'auto',
        transform: 'none',
        scale: 1,
        duration: 0.1,
        ease: 'power3.inOut'
      }, '-=0.2')

      currentTweenRef.current = exitTimeline
    }

    function startFollowing() {
      if (!cursorFollowRef.current && isDesktop()) {
        cursorFollowRef.current = true

        if (fadeTweenRef.current) fadeTweenRef.current.kill()
        fadeTweenRef.current = gsap.to(heroGlow, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'power2.out'
        })
      }
    }

    function shouldFollowCursor() {
      const anyTrackingSectionInView = Array.from(trackingSections).some(section => {
        const rect = section.getBoundingClientRect()
        return rect.top < window.innerHeight && rect.bottom > 0
      })

      const aboutRect = aboutSection.getBoundingClientRect()
      const aboutInView = aboutRect.top < window.innerHeight

      return anyTrackingSectionInView && !aboutInView && isDesktop()
    }

    function updateFollowingState() {
      const shouldFollow = shouldFollowCursor()

      if (shouldFollow && !cursorFollowRef.current) {
        startFollowing()
      } else if (!shouldFollow && cursorFollowRef.current) {
        returnToOriginal()
      }
    }

    document.addEventListener('mousemove', handleMouseMove)

    function onScroll() {
      clearTimeout(scrollTimeoutRef.current)
      updateFollowingState()
      scrollTimeoutRef.current = setTimeout(() => updateFollowingState(), 50)
    }

    window.addEventListener('scroll', onScroll)

    Array.from(trackingSections).forEach(section => {
      const sectionObserver = new IntersectionObserver(() => {
        updateFollowingState()
      }, { threshold: [0, 0.1, 1] })

      sectionObserver.observe(section)
      observersRef.current.push(sectionObserver)
    })

    const aboutObserver = new IntersectionObserver(() => updateFollowingState(), { threshold: [0, 0.1] })
    aboutObserver.observe(aboutSection)
    observersRef.current.push(aboutObserver)

    function onDocMouseEnter() {
      if (cursorFollowRef.current) {
        if (fadeTweenRef.current) fadeTweenRef.current.kill()
        fadeTweenRef.current = gsap.to(heroGlow, { opacity: 1, scale: 1.05, duration: 0.4, ease: 'power2.out' })
      }
    }

    function onDocMouseLeave() {
      if (cursorFollowRef.current) {
        if (fadeTweenRef.current) fadeTweenRef.current.kill()
        fadeTweenRef.current = gsap.to(heroGlow, { opacity: 0.8, scale: 0.95, duration: 0.4, ease: 'power2.out' })
      }
    }

    document.addEventListener('mouseenter', onDocMouseEnter)
    document.addEventListener('mouseleave', onDocMouseLeave)

    updateFollowingState()

    function onResize() {
      clearTimeout(globalResizeTimeoutRef.current)
      globalResizeTimeoutRef.current = setTimeout(() => {
        if (!isDesktop() && cursorFollowRef.current) {
          gsap.set(heroGlow, { clearProps: 'all' })
          cursorFollowRef.current = false
        }
      }, 250)
    }

    window.addEventListener('resize', onResize)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('mouseenter', onDocMouseEnter)
      document.removeEventListener('mouseleave', onDocMouseLeave)
      window.removeEventListener('resize', onResize)

      observersRef.current.forEach(o => o.disconnect())
      observersRef.current = []

      if (currentTweenRef.current) currentTweenRef.current.kill()
      if (fadeTweenRef.current) fadeTweenRef.current.kill()
      clearTimeout(scrollTimeoutRef.current)
      clearTimeout(globalResizeTimeoutRef.current)
    }
  }, [])

  return (
    <div className="gradient-wrapper relative overflow-hidden">
      <Header />
      <FloatingGrid />

      <div className="hero-glow-container">
        <div ref={glowRef} className="hero-glow" style={{
          backgroundImage: heroGlow
        }} />
      </div>

      <section className="hero">
        <div className="container bottom-0">
          <div className="hero-wrapper">
            <h1 data-speed="0.5" data-animation="text" className="h1 no-margin max-w">
              The Future of News Starts Here
            </h1>
            <img
              src="https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2/68238111591ea94a69065212_Vector.svg"
              loading="lazy"
              alt="Down arrow"
              className="down-arrow"
            />
          </div>
        </div>
      </section>

      <Cards />
    </div>
  )
}
