"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function BranchGallery({ slug }: { slug: string }) {
  const sectionRef = useRef<HTMLElement>(null)

  // Use slug as a unique ID for GSAP if needed, or just keep it for consistency
  console.log(`Loading gallery for: ${slug}`)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".gallery-item",
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".gallery-grid",
            start: "top 70%",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const images = [
    { query: "modern university classroom with students", alt: "Salle de classe", url: "/salle.png" },
    { query: "university library with students studying", alt: "Bibliothèque", url: "/library.webp" },
    { query: "modern computer lab university", alt: "Laboratoire informatique", url: "/computer-lab.jpg" },
    { query: "university cafeteria modern design", alt: "Cafétéria", url: "/cafeteria.jpg" },
    { query: "university coworking space", alt: "Espace coworking", url: "/coworking.jpg" },
    { query: "university auditorium", alt: "Auditorium", url: "/auditorium.jpg" },
  ]

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-6 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif mb-16 text-center">Galerie Photos</h2>

        <div className="gallery-grid grid md:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div key={index} className="gallery-item aspect-square overflow-hidden rounded-lg group cursor-pointer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
