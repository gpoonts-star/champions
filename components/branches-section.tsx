"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MapPin, ArrowRight } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const branches = [
  {
    name: "Champions I",
    slug: "champions-1",
    description: "15 BL ALLAL ILLANE VILLE NOUVELLE - SAFI. Notre campus historique dédié à l&apos;excellence dès le plus jeune âge.",
    image: "/champions.png",
    students: "École Primaire",
  },
  {
    name: "Champions II",
    slug: "champions-2",
    description: "Mohammed V N °4 Qu:ABC ville nouvelle Safi. Un environnement moderne pour un apprentissage stimulant et innovant.",
    image: "/champions2.png",
    students: "École Maternelle",
  },
  {
    name: "Collège et Lycée",
    slug: "college-lycee",
    description: "Rue Mekka ville nouvelle Safi. Préparer nos élèves aux défis de demain à travers un parcours académique rigoureux.",
    image: "/champions.png",
    students: "Secondaire",
  },
]

export function BranchesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".branch-card",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".branches-grid",
            start: "top 70%",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-serif text-foreground mb-8 text-center">Nos Campus</h2>
        <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-16 leading-relaxed">
          Trois campus d&apos;excellence répartis dans la ville de Safi, chacun offrant des infrastructures
          modernes et un environnement propice à la réussite.
        </p>

        <div className="branches-grid space-y-12">
          {branches.map((branch, index) => (
            <div key={index} className="branch-card group">
              <Link href={`/branch/${branch.slug}`}>
                <div className="grid md:grid-cols-2 gap-8 items-center bg-card rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-500">
                  <div className={`${index % 2 === 1 ? "md:order-2" : ""}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={branch.image || "/placeholder.svg"}
                      alt={branch.name}
                      className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-8 md:p-12">
                    <div className="flex items-center gap-2 text-primary mb-4">
                      <MapPin size={20} />
                      <span className="text-sm font-mono">{branch.students}</span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-serif mb-4 group-hover:text-primary transition-colors">
                      {branch.name}
                    </h3>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-6">{branch.description}</p>
                    <div className="flex items-center gap-2 text-primary group-hover:gap-4 transition-all">
                      <span className="font-mono text-sm">Découvrir le campus</span>
                      <ArrowRight size={20} />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
