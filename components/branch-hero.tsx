"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface BranchHeroProps {
  name: string
  tagline: string
}

export function BranchHero({ name, tagline }: BranchHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".branch-title",
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.3 },
      )

      gsap.fromTo(
        ".branch-tagline",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.6 },
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={heroRef} className="relative h-[70vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/champions.jpg" alt={name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative h-full flex flex-col items-center justify-center px-6 text-center">
        <h1 className="branch-title text-5xl md:text-7xl font-serif text-white mb-4">{name}</h1>
        <p className="branch-tagline text-xl md:text-2xl text-white/90">{tagline}</p>
      </div>
    </div>
  )
}
