import React, { useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

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
  const downArrowRef = useRef(null)

  const isDesktop = useCallback(() => typeof window !== 'undefined' && window.innerWidth > 768, [])

  // Cursor following logic with useGSAP
  useGSAP(() => {
    if (typeof gsap === 'undefined' || !glowRef.current) return

    const heroGlow = glowRef.current
    const aboutSection = document.querySelector('.about-section')
    const trackingSections = document.querySelectorAll('.hero, .card-section')

    if (!aboutSection || trackingSections.length === 0) return

    const handleMouseMove = (e) => {
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

    const returnToOriginal = () => {
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

    const startFollowing = () => {
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

    const shouldFollowCursor = () => {
      const anyTrackingSectionInView = Array.from(trackingSections).some(section => {
        const rect = section.getBoundingClientRect()
        return rect.top < window.innerHeight && rect.bottom > 0
      })

      const aboutRect = aboutSection.getBoundingClientRect()
      const aboutInView = aboutRect.top < window.innerHeight

      return anyTrackingSectionInView && !aboutInView && isDesktop()
    }

    const updateFollowingState = () => {
      const shouldFollow = shouldFollowCursor()

      if (shouldFollow && !cursorFollowRef.current) {
        startFollowing()
      } else if (!shouldFollow && cursorFollowRef.current) {
        returnToOriginal()
      }
    }

    // Set up event listeners
    document.addEventListener('mousemove', handleMouseMove)

    const onScroll = () => {
      clearTimeout(scrollTimeoutRef.current)
      updateFollowingState()
      scrollTimeoutRef.current = setTimeout(() => updateFollowingState(), 50)
    }

    window.addEventListener('scroll', onScroll)

    // Set up intersection observers
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

    const onDocMouseEnter = () => {
      if (cursorFollowRef.current) {
        if (fadeTweenRef.current) fadeTweenRef.current.kill()
        fadeTweenRef.current = gsap.to(heroGlow, { opacity: 1, scale: 1.05, duration: 0.4, ease: 'power2.out' })
      }
    }

    const onDocMouseLeave = () => {
      if (cursorFollowRef.current) {
        if (fadeTweenRef.current) fadeTweenRef.current.kill()
        fadeTweenRef.current = gsap.to(heroGlow, { opacity: 0.8, scale: 0.95, duration: 0.4, ease: 'power2.out' })
      }
    }

    document.addEventListener('mouseenter', onDocMouseEnter)
    document.addEventListener('mouseleave', onDocMouseLeave)

    const onResize = () => {
      clearTimeout(globalResizeTimeoutRef.current)
      globalResizeTimeoutRef.current = setTimeout(() => {
        if (!isDesktop() && cursorFollowRef.current) {
          gsap.set(heroGlow, { clearProps: 'all' })
          cursorFollowRef.current = false
        }
      }, 250)
    }

    window.addEventListener('resize', onResize)

    // Initial state
    updateFollowingState()

    // Cleanup function
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
  }, [isDesktop])

  // Down arrow animation with useGSAP
  useGSAP(() => {
    if (typeof gsap === 'undefined' || !downArrowRef.current) return

    // Force hardware acceleration and optimize for mobile
    gsap.set(downArrowRef.current, {
      opacity: 0,
      y: 20,
      force3D: true,
      willChange: "transform, opacity"
    })

    const tl = gsap.timeline()

    // Initial fade in with smoother easing
    tl.to(downArrowRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      force3D: true
    })
      // Floating animation with optimized settings
      .to(downArrowRef.current, {
        y: -15, // Reduced distance for subtleness
        duration: 1.5, // Slower for smoothness
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        force3D: true
      }, "+=0.2")

    // Clean up will-change after animation starts
    setTimeout(() => {
      if (downArrowRef.current) downArrowRef.current.style.willChange = 'auto'
    }, 1000)
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
              ref={downArrowRef}
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
