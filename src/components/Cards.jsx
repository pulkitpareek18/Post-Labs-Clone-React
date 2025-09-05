import React, { useRef, useEffect, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '../utils/gsapConfig'

const Cards = () => {
  const sectionRef = useRef(null)
  const leftCardRef = useRef(null)
  const middleCardRef = useRef(null)
  const rightCardRef = useRef(null)
  const [cardScrollTrigger, setCardScrollTrigger] = useState(null)

  // Utility function to check if device is desktop
  const isDesktop = () => window.innerWidth > 768

  const { contextSafe } = useGSAP(() => {
    // Initial setup and animation functions will be defined here
  }, { scope: sectionRef })

  // Animation functions
  const stackCards = contextSafe(() => {
    return gsap.timeline({
      defaults: {
        duration: 1.5,
        ease: "elastic.out(0.1, 0.15)"
      }
    })
      .to(leftCardRef.current, {
        transform: `translateX(100%) rotate(-3deg)`,
        zIndex: 1
      }, 0)
      .to(rightCardRef.current, {
        transform: `translateX(-100%) rotate(3deg)`,
        zIndex: 2
      }, 0)
      .set(middleCardRef.current, {
        zIndex: 3
      }, 0)
  })

  const fanOutCards = contextSafe(() => {
    return gsap.timeline({
      defaults: {
        duration: 5,
        ease: "elastic.out(0.1, 0.15)"
      }
    })
      .to(leftCardRef.current, {
        transform: 'none',
        zIndex: 1
      }, 0)
      .to(rightCardRef.current, {
        transform: 'none',
        zIndex: 1
      }, 0)
      .set(middleCardRef.current, {
        zIndex: 1
      }, 0)
  })

  const initCardStacking = contextSafe(() => {
    // Clean up existing ScrollTrigger
    if (cardScrollTrigger) {
      cardScrollTrigger.kill()
      setCardScrollTrigger(null)
    }

    // Only run on desktop
    if (!isDesktop()) {
      // Reset cards on mobile
      gsap.set([leftCardRef.current, middleCardRef.current, rightCardRef.current], {
        clearProps: "transform,zIndex"
      })
      return
    }

    const section = sectionRef.current
    if (!section || !leftCardRef.current || !middleCardRef.current || !rightCardRef.current) return

    // Initialize cards in stacked state
    gsap.set(leftCardRef.current, {
      transform: `translateX(100%) rotate(-3deg)`,
      zIndex: 1
    })
    gsap.set(rightCardRef.current, {
      transform: `translateX(-100%) rotate(3deg)`,
      zIndex: 2
    })
    gsap.set(middleCardRef.current, {
      zIndex: 3
    })

    // Create ScrollTrigger
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 70%",
      end: "top 0%",
      onEnter: () => fanOutCards(),
      onLeaveBack: () => stackCards(),
      markers: false
    })

    setCardScrollTrigger(trigger)
  })

  // Initialize on mount and handle resize
  useEffect(() => {
    let resizeTimeout
    
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => initCardStacking(), 250)
    }

    // Initialize card stacking
    initCardStacking()

    // Add resize listener
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimeout)
    }
  }, []) // Empty dependency array to run only on mount

  // Cleanup ScrollTrigger on unmount
  useEffect(() => {
    return () => {
      if (cardScrollTrigger) {
        cardScrollTrigger.kill()
      }
    }
  }, [cardScrollTrigger])

  return (
    <section className="card-section" ref={sectionRef}>
      <div className="container">
        <div className="card-row">
          <div 
            ref={leftCardRef}
            className="card"
          >
            <img 
              src="https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2/68239a34145625a862ba3d54_icon-1.svg" 
              loading="lazy" 
              alt="" 
              className="card-icon" 
            />
            <div className="card-text">Empowering Creators.</div>
          </div>
          <div 
            ref={middleCardRef}
            className="card"
          >
            <img 
              src="https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2/68239b7ac5ddc2008b2da9b7_icon-2.svg" 
              loading="lazy" 
              alt="" 
              className="card-icon" 
            />
            <div className="card-text">Transforming Publishing.</div>
          </div>
          <div 
            ref={rightCardRef}
            className="card"
          >
            <img 
              src="https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2/68239b7ab5708009ef8f649e_icon-3.svg" 
              loading="lazy" 
              alt="" 
              className="card-icon" 
            />
            <div className="card-text smaller">Reclaiming Canadian Media.</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Cards
