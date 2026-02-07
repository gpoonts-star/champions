"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Mail, Phone, Facebook, Linkedin, Instagram } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
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
    <section ref={sectionRef} className="py-24 md:py-32 px-6 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto">
        <h2 className="contact-item text-4xl md:text-6xl font-serif mb-16 text-center">Contactez-Nous</h2>

        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <div className="contact-item text-center">
            <div className="w-16 h-16 bg-primary-foreground/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="text-primary-foreground" size={28} />
            </div>
            <h3 className="text-xl font-serif mb-3">Email</h3>
            <a
              href="mailto:contact@elazharichampions.com"
              className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              contact@elazharichampions.com
            </a>
          </div>

          <div className="contact-item text-center">
            <div className="w-16 h-16 bg-primary-foreground/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Phone className="text-primary-foreground" size={28} />
            </div>
            <h3 className="text-xl font-serif mb-3">Téléphone</h3>
            <a
              href="tel:0672641466"
              className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              0672641466
            </a>
            <br />
            <span className="text-primary-foreground/60 text-sm">Lun-Ven: 8h-18h</span>
          </div>

          <div className="contact-item text-center">
            <h3 className="text-xl font-serif mb-6">Suivez-Nous</h3>
            <div className="flex justify-center gap-6">
              <a
                href="https://www.facebook.com/profile.php?id=61582413145319"
                target="_blank"
                className="w-12 h-12 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              >
                <Facebook size={24} />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://www.instagram.com/gs.elazhari?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                className="w-12 h-12 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              >
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="contact-item bg-primary-foreground/10 p-12 rounded-lg">
          <h3 className="text-2xl md:text-3xl font-serif mb-6 text-center">Horaires d&apos;Ouverture</h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div>
              <h4 className="font-serif mb-3">Secrétariat Pédagogique</h4>
              <p className="text-primary-foreground/80 leading-relaxed">
                Lundi - Vendredi: 8h00 - 18h00
                <br />
                Samedi: 8h30 - 13h00
                <br />
                Dimanche: Fermé
              </p>
            </div>
            <div>
              <h4 className="font-serif mb-3">Service Inscriptions</h4>
              <p className="text-primary-foreground/80 leading-relaxed">
                Lundi - Vendredi: 8h00 - 18h00
                <br />
                Samedi: 8h30 - 13h00
                <br />
                Dimanche: Fermé
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
