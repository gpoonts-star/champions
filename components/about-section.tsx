"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-title",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: ".about-title",
            start: "top 80%",
          },
        },
      )

      gsap.fromTo(
        ".about-content",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".about-content",
            start: "top 80%",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="about-title text-4xl md:text-6xl font-serif text-foreground mb-16 text-center">Notre Vision</h2>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="about-content">
            <h3 className="text-2xl md:text-3xl font-serif mb-6">Nos Objectifs</h3>
            <p className="text-lg leading-relaxed text-muted-foreground mb-4">
              Depuis le 01 septembre 2011, le Groupe Scolaire El Azhari - Les Champions s&apos;engage à offrir une éducation de qualité à Safi. Notre mission est de favoriser l&apos;excellence académique tout en cultivant l&apos;épanouissement personnel de chaque élève.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Nous visons à préparer nos élèves aux défis du futur en leur offrant un environnement d&apos;apprentissage stimulant, couvrant tous les cycles de l&apos;enseignement marocain, du préscolaire au secondaire qualifiant.
            </p>
          </div>

          <div className="about-content">
            <h3 className="text-2xl md:text-3xl font-serif mb-6">Nos Valeurs et Savoir-vivre</h3>
            <p className="text-lg leading-relaxed text-muted-foreground mb-4">
              Le respect, l&apos;intégrité et la discipline sont au cœur de notre établissement. Nous encourageons nos élèves à développer un esprit de solidarité et de curiosité intellectuelle.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Notre approche pédagogique met l&apos;accent sur le développement des compétences et le respect des manières, assurant que chaque enfant grandit dans un cadre structuré et bienveillant.
            </p>
          </div>
        </div>

        <div className="about-content bg-secondary p-12 rounded-lg">
          <h3 className="text-2xl md:text-3xl font-serif mb-6 text-center">Notre Engagement Qualité</h3>
          <p className="text-lg leading-relaxed text-muted-foreground text-center max-w-4xl mx-auto mb-8">
            Le Groupe Scolaire El Azhari - Les Champions est un établissement reconnu par l&apos;État marocain. Nous nous engageons à respecter les standards les plus élevés du système éducatif national, tout en apportant une touche d&apos;innovation pédagogique pour la réussite de nos élèves à Safi.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="text-5xl font-serif text-primary mb-2">100%</div>
              <p className="text-muted-foreground">Taux de réussite au Baccalauréat</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-serif text-primary mb-2">15+</div>
              <p className="text-muted-foreground">Années d&apos;expérience</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-serif text-primary mb-2">3</div>
              <p className="text-muted-foreground">Campus d&apos;excellence à Safi</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
