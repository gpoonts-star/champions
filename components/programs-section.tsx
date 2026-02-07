"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const programs = [
  {
    title: "Préscolaire",
    description:
      "École coranique ou école maternelle & jardin d'enfant. Un premier pas vers l'apprentissage dans un cadre bienveillant.",
    duration: "Cycle Maternelle",
  },
  {
    title: "Primaire",
    description:
      "Un enseignement fondamental solide pour acquérir les bases de la lecture, de l'écriture et du calcul.",
    duration: "6 ans d'études",
  },
  {
    title: "Secondaire Collégial",
    description:
      "Approfondissement des connaissances et préparation aux premières étapes de l'orientation scolaire.",
    duration: "3 ans d'études",
  },
  {
    title: "Secondaire Qualifiant",
    description:
      "Lycée Les Champions. Un parcours d'excellence pour préparer les élèves aux examens du baccalauréat et aux études supérieures.",
    duration: "3 ans d'études",
  },
]

export function ProgramsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".program-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".programs-grid",
            start: "top 70%",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-6 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-serif text-foreground mb-8 text-center">Nos Programmes</h2>
        <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-16 leading-relaxed">
          Découvrez notre large gamme de formations diplômantes et professionnalisantes, conçues pour répondre aux
          besoins du marché du travail et vous accompagner vers la réussite.
        </p>

        <div className="programs-grid grid md:grid-cols-2 gap-8">
          {programs.map((program, index) => (
            <div
              key={index}
              className="program-card bg-card p-8 rounded-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-sm text-primary font-mono mb-3">{program.duration}</div>
              <h3 className="text-2xl md:text-3xl font-serif mb-4">{program.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{program.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-card p-12 rounded-lg">
          <h3 className="text-2xl md:text-3xl font-serif mb-6 text-center">Modalités de Formation</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xl font-serif mb-3">Formation Initiale</h4>
              <p className="text-muted-foreground leading-relaxed">
                Cursus classique avec stages en entreprise. Idéal pour les étudiants souhaitant se consacrer pleinement
                à leurs études tout en acquérant une première expérience professionnelle.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-serif mb-3">Alternance</h4>
              <p className="text-muted-foreground leading-relaxed">
                Contrat d&apos;apprentissage ou de professionnalisation. Combinez théorie et pratique en entreprise, avec une
                rémunération et une expérience professionnelle significative.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-serif mb-3">Formation Continue</h4>
              <p className="text-muted-foreground leading-relaxed">
                Programmes adaptés aux professionnels en reconversion ou en évolution de carrière. Formations éligibles
                au CPF et aux dispositifs de financement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
