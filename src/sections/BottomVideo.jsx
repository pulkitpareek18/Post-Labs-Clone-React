import React, { useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '../utils/gsapConfig'

const BottomVideo = () => {
  const sectionRef = useRef(null);

  const isMobile = () => {
    return window.innerWidth < 768;
  };

  useGSAP(() => {
    if (typeof gsap === 'undefined') return;

    let videoScrollTrigger;

    function initVideoSection() {
      // Clean up existing
      if (videoScrollTrigger) {
        videoScrollTrigger.kill();
        videoScrollTrigger = null;
      }

      const videoScale = document.querySelector('.scale');
      const videoCreators = document.querySelector('.creators');
      const videoCanada = document.querySelector('.canada');
      const moveableText = document.querySelector('.moveable-text');
      const section = document.querySelector('.video-section');
      const scaleText = document.querySelector('.scale-text');
      const creatorsText = document.querySelector('.creators-text');
      const canadaText = document.querySelector('.canada-text');

      if (!section || !moveableText) return;

      // Set y-values based on device type
      const firstMoveY = isMobile() ? -48 : -88;
      const secondMoveY = isMobile() ? -96 : -176;

      // Set initial states
      gsap.set(videoScale, { opacity: 1 });
      gsap.set([videoCreators, videoCanada], { opacity: 0 });

      if (scaleText) scaleText.classList.remove('inactive');
      if (creatorsText) creatorsText.classList.add('inactive');
      if (canadaText) canadaText.classList.add('inactive');

      let currentActive = 0;

      // Make video section sticky
      section.style.position = 'sticky';
      section.style.top = '0';
      section.style.zIndex = '10';

      // Create scroll animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 0.5,
          markers: false
        }
      });

      // First transition - Scale to Creators
      scrollTl.to(moveableText, {
        y: firstMoveY,
        duration: 0.33,
        onUpdate: function () {
          const progress = this.progress();

          if (progress > 0.9 && currentActive === 0) {
            currentActive = 1;

            if (scaleText) scaleText.classList.add('inactive');
            if (creatorsText) creatorsText.classList.remove('inactive');

            if (videoScale) videoScale.classList.add('inactive');
            if (videoCreators) videoCreators.classList.remove('inactive');
          }
          else if (progress < 0.1 && currentActive === 1) {
            currentActive = 0;

            if (scaleText) scaleText.classList.remove('inactive');
            if (creatorsText) creatorsText.classList.add('inactive');

            if (videoScale) videoScale.classList.remove('inactive');
            if (videoCreators) videoCreators.classList.add('inactive');
          }
        }
      }, 0);

      scrollTl.to(videoScale, { opacity: 0, duration: 0.33 }, 0);
      scrollTl.to(videoCreators, { opacity: 1, duration: 0.33 }, 0);

      // Second transition - Creators to Canada
      scrollTl.to(moveableText, {
        y: secondMoveY,
        duration: 0.33,
        onUpdate: function () {
          const progress = this.progress();

          if (progress > 0.9 && currentActive === 1) {
            currentActive = 2;

            if (creatorsText) creatorsText.classList.add('inactive');
            if (canadaText) canadaText.classList.remove('inactive');

            if (videoCreators) videoCreators.classList.add('inactive');
            if (videoCanada) videoCanada.classList.remove('inactive');
          }
          else if (progress < 0.1 && currentActive === 2) {
            currentActive = 1;

            if (creatorsText) creatorsText.classList.remove('inactive');
            if (canadaText) canadaText.classList.add('inactive');

            if (videoCreators) videoCreators.classList.remove('inactive');
            if (videoCanada) videoCanada.classList.add('inactive');
          }
        }
      }, 0.33);

      scrollTl.to(videoCreators, { opacity: 0, duration: 0.33 }, 0.33);
      scrollTl.to(videoCanada, { opacity: 1, duration: 0.33 }, 0.33);

      // Third section placeholder
      scrollTl.to({}, { duration: 0.34 }, 0.66);

      videoScrollTrigger = scrollTl;
    }

    // Initialize
    initVideoSection();
  });

  useEffect(() => {
    let globalResizeTimeout;

    const handleResize = () => {
      clearTimeout(globalResizeTimeout);
      globalResizeTimeout = setTimeout(() => {
        // Re-run the animation on resize
        ScrollTrigger.refresh();
      }, 250);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(globalResizeTimeout);
    };
  }, []);

  return (
    <section ref={sectionRef} className="video-section">
    <div className="video-wrapper">
      <div className="video-container">
        <div data-poster-url="https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2%2F6827802fb93caba00853824a_video2-poster-00001.jpg" data-video-urls="https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2%2F6827802fb93caba00853824a_video2-transcode.mp4,https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2%2F6827802fb93caba00853824a_video2-transcode.webm" data-autoplay="true" data-loop="true" data-wf-ignore="true" className="video-bg scale w-background-video w-background-video-atom"><video id="26c516e1-79ea-86ca-6f45-df325e5750e1-video" autoPlay loop style={{ backgroundImage: "url(\"https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2%2F6827802fb93caba00853824a_video2-poster-00001.jpg\")" }} muted playsInline data-wf-ignore="true" data-object-fit="cover">
            <source src="https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2%2F6827802fb93caba00853824a_video2-transcode.mp4" data-wf-ignore="true" />
            <source src="https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2%2F6827802fb93caba00853824a_video2-transcode.webm" data-wf-ignore="true" />
          </video></div>
        <div data-poster-url="https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2%2F682dd7a24d93a7df690274d9_post-labs-video-3-poster-00001.jpg" data-video-urls="https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2%2F682dd7a24d93a7df690274d9_post-labs-video-3-transcode.mp4,https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2%2F682dd7a24d93a7df690274d9_post-labs-video-3-transcode.webm" data-autoplay="true" data-loop="true" data-wf-ignore="true" className="video-bg creators w-background-video w-background-video-atom"><video id="70ca679d-3b38-8abf-f3f9-9b93f0e95ed7-video" autoPlay loop style={{ backgroundImage: "url(\"https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2%2F682dd7a24d93a7df690274d9_post-labs-video-3-poster-00001.jpg\")" }} muted playsInline data-wf-ignore="true" data-object-fit="cover">
            <source src="https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2%2F682dd7a24d93a7df690274d9_post-labs-video-3-transcode.mp4" data-wf-ignore="true" />
            <source src="https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2%2F682dd7a24d93a7df690274d9_post-labs-video-3-transcode.webm" data-wf-ignore="true" />
          </video></div>
        <div data-poster-url="https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2%2F683a0051a4448581c2d2e587_post-labs-video-mobile-4-poster-00001.jpg" data-video-urls="https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2%2F683a0051a4448581c2d2e587_post-labs-video-mobile-4-transcode.mp4,https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2%2F683a0051a4448581c2d2e587_post-labs-video-mobile-4-transcode.webm" data-autoplay="true" data-loop="true" data-wf-ignore="true" className="video-bg canada w-background-video w-background-video-atom"><video id="3ab2331f-5f9f-2e24-4ec8-c65ef8d717f6-video" autoPlay loop style={{ backgroundImage: "url(\"https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2%2F683a0051a4448581c2d2e587_post-labs-video-mobile-4-poster-00001.jpg\")" }} muted playsInline data-wf-ignore="true" data-object-fit="cover">
            <source src="https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2%2F683a0051a4448581c2d2e587_post-labs-video-mobile-4-transcode.mp4" data-wf-ignore="true" />
            <source src="https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2%2F683a0051a4448581c2d2e587_post-labs-video-mobile-4-transcode.webm" data-wf-ignore="true" />
          </video></div>
      </div>
      <div className="text-container">
        <div className="h3 text-white built-for-text">Built for</div>
        <div className="moveable-text">
          <div className="h3 text-white scale-text">Scale</div>
          <div className="h3 text-white inactive creators-text">Creators</div>
          <div className="h3 text-white inactive canada-text">Canada</div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default BottomVideo
