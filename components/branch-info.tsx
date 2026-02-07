"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MapPin, Phone, Mail, Users, BookOpen } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

interface BranchInfoProps {
  branch: {
    name: string
    description: string
    address: string
    phone: string
    email: string
    students: string
    programs: string
    facilities: string[]
    details: string
    partnerships: string
  }
}

export function BranchInfo({ branch }: BranchInfoProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".info-item",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
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
        {/* Contact Info */}
        <div className="info-item grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-card p-8 rounded-lg">
            <MapPin className="text-primary mb-4" size={32} />
            <h3 className="text-xl font-serif mb-3">Adresse</h3>
            <p className="text-muted-foreground leading-relaxed">{branch.address}</p>
          </div>

          <div className="bg-card p-8 rounded-lg">
            <Phone className="text-primary mb-4" size={32} />
            <h3 className="text-xl font-serif mb-3">Téléphone</h3>
            <a href={`tel:${branch.phone}`} className="text-muted-foreground hover:text-primary transition-colors">
              {branch.phone}
            </a>
          </div>

          <div className="bg-card p-8 rounded-lg">
            <Mail className="text-primary mb-4" size={32} />
            <h3 className="text-xl font-serif mb-3">Email</h3>
            <a href={`mailto:${branch.email}`} className="text-muted-foreground hover:text-primary transition-colors">
              {branch.email}
            </a>
          </div>
        </div>

        {/* Description */}
        <div className="info-item mb-20">
          <h2 className="text-4xl md:text-5xl font-serif mb-8">Présentation</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">{branch.description}</p>
          <p className="text-lg text-muted-foreground leading-relaxed">{branch.details}</p>
        </div>

        {/* Stats */}
        <div className="info-item grid md:grid-cols-2 gap-8 mb-20">
          <div className="bg-secondary p-12 rounded-lg text-center">
            <Users className="text-primary mx-auto mb-4" size={48} />
            <div className="text-5xl font-serif text-primary mb-2">{branch.students}</div>
            <p className="text-muted-foreground">Cycle d&apos;enseignement</p>
          </div>

          <div className="bg-secondary p-12 rounded-lg text-center">
            <BookOpen className="text-primary mx-auto mb-4" size={48} />
            <div className="text-5xl font-serif text-primary mb-2">{branch.programs}</div>
            <p className="text-muted-foreground">Durée du cycle</p>
          </div>
        </div>

        {/* Facilities */}
        <div className="info-item mb-20">
          <h2 className="text-4xl md:text-5xl font-serif mb-8">Nos Équipements</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {branch.facilities.map((facility, index) => (
              <div key={index} className="flex items-start gap-4 bg-card p-6 rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <p className="text-lg text-muted-foreground">{facility}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Partnerships */}
        <div className="info-item bg-primary text-primary-foreground p-12 rounded-lg">
          <h2 className="text-3xl md:text-4xl font-serif mb-6">Partenariats Entreprises</h2>
          <p className="text-lg leading-relaxed text-primary-foreground/90">{branch.partnerships}</p>
        </div>
      </div>
    </section>
  )
}
