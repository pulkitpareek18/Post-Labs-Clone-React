import React from 'react'
import FloatingGrid from '../components/FloatingGrid'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const VideoCurtain = () => {
  useGSAP(() => {
    if (typeof gsap === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const videoSection = document.querySelector('.full-width-video-section');

    if (videoSection) {
      gsap.set(videoSection, {
        borderRadius: '40px',
        width: '50%',
        margin: '0 auto',
        overflow: 'hidden',
        transformOrigin: 'center center'
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: videoSection,
          start: "top 120%",
          end: "top 15%",
          scrub: 3,
          markers: false,
          toggleActions: "play none none reverse"
        }
      })
        .to(videoSection, {
          borderRadius: '0px',
          width: '100%',
          ease: "power2.inOut",
          duration: 3
        });
    }
  });

  return (
    <section className="full-width-row">
    <div className="full-width-video-section">
      <div data-poster-url="https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2%2F682e229ec192a9f049ae0b4a_post-labs-video-1-poster-00001.jpg" data-video-urls="https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2%2F682e229ec192a9f049ae0b4a_post-labs-video-1-transcode.mp4,https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2%2F682e229ec192a9f049ae0b4a_post-labs-video-1-transcode.webm" data-autoplay="true" data-loop="true" data-wf-ignore="true" className="full-width-video w-background-video w-background-video-atom"><video id="e3d7ea8b-455c-50f9-c0b5-3b5c44ad967f-video" autoPlay loop style={{ backgroundImage: "url(\"https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2%2F682e229ec192a9f049ae0b4a_post-labs-video-1-poster-00001.jpg\")" }} muted playsInline data-wf-ignore="true" data-object-fit="cover">
          <source src="https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2%2F682e229ec192a9f049ae0b4a_post-labs-video-1-transcode.mp4" data-wf-ignore="true" />
          <source src="https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2%2F682e229ec192a9f049ae0b4a_post-labs-video-1-transcode.webm" data-wf-ignore="true" />
        </video></div>
    </div>
   <FloatingGrid />
  </section>
  )
}

export default VideoCurtain
