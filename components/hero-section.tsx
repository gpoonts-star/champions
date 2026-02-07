"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLImageElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleTitleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        logoRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: "power3.out", delay: 0.1 },
      )

      gsap.fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.3 },
      )

      gsap.fromTo(
        subtitleTitleRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.5 },
      )

      gsap.fromTo(
        subtitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.7 },
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={heroRef} className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/champions.jpg" alt="Campus" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="mb-4 absolute top-10 left-1/2 -translate-x-1/2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={logoRef}
          src="/logo.png"
          alt="Groupe Scolaire El Azhari Logo"
          className=" w-14 h-14 md:w-20 md:h-20 lg:w-20 lg:h-20 object-contain drop-shadow-lg"
        />
      </div>
      {/* Content */}
      <div className="relative w-full h-full flex flex-col items-center justify-center px-6 text-center">
        {/* School Logo */}


        <h1
          ref={titleRef}
          className="text-4xl md:text-6xl lg:text-9xl font-serif text-white mb-6 leading-tight "
        >
          Groupe Scolaire El Azhari

        </h1>
        <h2 ref={subtitleTitleRef} className="text-3xl md:text-5xl lg:text-7xl font-serif text-white mb-6 max-w-5xl leading-tight text-balance">
          Les Champions
        </h2>
        <p ref={subtitleRef} className="text-lg md:text-2xl text-white/90 max-w-3xl leading-relaxed text-pretty">
          forgez votre avenir avec les Champions.
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </div>
  )
}
