"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface BranchMapProps {
  name: string
  address: string
  coordinates: string
}

export function BranchMap({ name, address, coordinates }: BranchMapProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".map-container",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
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
        <h2 className="text-4xl md:text-5xl font-serif mb-8 text-center">Comment Nous Trouver</h2>
        <p className="text-lg text-muted-foreground text-center mb-12">{address}</p>

        <div className="map-container rounded-lg overflow-hidden shadow-2xl">
          <iframe
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d${coordinates.split(",")[1]}!3d${coordinates.split(",")[0]}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM!5e0!3m2!1sen!2sfr!4v1234567890123!5m2!1sen!2sfr`}
            width="100%"
            height="500"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Carte ${name}`}
          />
        </div>

        <div className="mt-12 bg-card p-8 rounded-lg">
          <h3 className="text-2xl font-serif mb-6 text-center">Informations d&apos;Accès</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <h4 className="font-serif mb-3">Visite Guidée</h4>
              <p className="text-muted-foreground leading-relaxed">
                Venez nous rendre visite et découvrez nos installations à Safi. Notre équipe vous accueille pour une visite guidée de l&apos;établissement sur rendez-vous.
              </p>
            </div>
            <div className="text-center">
              <h4 className="font-serif mb-3">Inscriptions</h4>
              <p className="text-muted-foreground leading-relaxed">
                Inscrivez votre enfant dans une école d&apos;excellence. Les inscriptions sont de nouveau ouvertes pour la prochaine rentrée scolaire.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
