"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Facebook, Linkedin, Instagram } from "lucide-react"
import { gsap } from "gsap"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        ".nav-item",
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power3.out" },
      )
    }
  }, [isOpen])

  return (
    <>
      {/* Fixed Navigation Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-8 left-8 z-50 w-12 h-12 flex items-center justify-center bg-primary text-primary-foreground rounded-full hover:scale-110 transition-transform duration-300"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay Navigation */}
      <div
        className={`fixed inset-0 bg-primary z-40 transition-transform duration-700 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <nav className="h-full flex flex-col justify-center items-start px-12 md:px-24 lg:px-32">
          <div className="space-y-8">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="nav-item block text-primary-foreground text-5xl md:text-7xl font-serif hover:opacity-70 transition-opacity"
            >
              Accueil
            </Link>
            <Link
              href="/branch/champions-1"
              onClick={() => setIsOpen(false)}
              className="nav-item block text-primary-foreground text-5xl md:text-7xl font-serif hover:opacity-70 transition-opacity"
            >
              Champions I
            </Link>
            <Link
              href="/branch/champions-2"
              onClick={() => setIsOpen(false)}
              className="nav-item block text-primary-foreground text-5xl md:text-7xl font-serif hover:opacity-70 transition-opacity"
            >
              Champions II
            </Link>
            <Link
              href="/branch/college-lycee"
              onClick={() => setIsOpen(false)}
              className="nav-item block text-primary-foreground text-5xl md:text-7xl font-serif hover:opacity-70 transition-opacity"
            >
              Collège et lycée
            </Link>
          </div>

          <div className="mt-16 space-y-4 text-primary-foreground/80">
            <p className="text-sm">contact@elazharichampions.com</p>
            <p className="text-sm">0672641466</p>
            <div className="flex gap-4 mt-6">
              <a
                target="_blank"
                href="https://www.facebook.com/profile.php?id=61582413145319"
                className="w-10 h-10 text-white bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 text-white bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://www.instagram.com/gs.elazhari?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                className="w-10 h-10 text-white bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}
