"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Star, Send, User } from "lucide-react"
import { supabase } from "@/lib/supabase"

gsap.registerPlugin(ScrollTrigger)

interface Rating {
    id: string
    name: string
    rating: number
    comment: string
    avatar_url: string
    created_at: string
}

export function RatingSystem() {
    const [ratings, setRatings] = useState<Rating[]>([])
    const [name, setName] = useState("")
    const [rating, setRating] = useState(5)
    const [comment, setComment] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [message, setMessage] = useState("")

    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        fetchRatings()

        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".rating-item",
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    },
                },
            )
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    async function fetchRatings() {
        const { data, error } = await supabase
            .from("ratings")
            .select("*")
            .eq("is_visible", true)
            .order("created_at", { ascending: false })
            .limit(8)

        if (error) {
            console.error("Error fetching ratings:", error)
        } else {
            setRatings(data || [])
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!name || !comment) return

        setIsSubmitting(true)
        setMessage("")

        const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name + Date.now())}`

        const { error } = await supabase.from("ratings").insert([
            {
                name,
                rating,
                comment,
                avatar_url: avatarUrl,
            },
        ])

        if (error) {
            setMessage("Erreur lors de l'envoi de votre avis. Veuillez réessayer.")
            console.error("Error submitting rating:", error)
        } else {
            setMessage("Merci pour votre avis !")
            setName("")
            setComment("")
            setRating(5)
            fetchRatings()
        }
        setIsSubmitting(false)
    }

    return (
        <section ref={sectionRef} id="ratings" className="py-24 md:py-32 px-6 bg-secondary/30">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-serif mb-6">Avis de nos Parents et ÉLèveS</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Votre avis nous est précieux pour continuer à améliorer notre excellence pédagogique.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Form */}
                    <div className="bg-card p-8 md:p-12 rounded-2xl shadow-sm h-fit">
                        <h3 className="text-2xl font-serif mb-8">Laissez un Avis</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-2 uppercase tracking-wider text-muted-foreground">
                                    Nom Complet
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Votre nom"
                                    required
                                    className="w-full bg-background border-none ring-1 ring-border focus:ring-2 focus:ring-primary rounded-lg px-4 py-3 outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 uppercase tracking-wider text-muted-foreground">
                                    Note
                                </label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <button
                                            key={s}
                                            type="button"
                                            onClick={() => setRating(s)}
                                            className="p-1 transition-transform hover:scale-110"
                                        >
                                            <Star
                                                size={32}
                                                className={`${s <= rating ? "fill-yellow-400 text-yellow-400" : "text-border"
                                                    } transition-colors`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 uppercase tracking-wider text-muted-foreground">
                                    Votre Message
                                </label>
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Partagez votre expérience..."
                                    required
                                    rows={4}
                                    className="w-full bg-background border-none ring-1 ring-border focus:ring-2 focus:ring-primary rounded-lg px-4 py-3 outline-none transition-all resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    "Envoi en cours..."
                                ) : (
                                    <>
                                        Envoyer <Send size={18} />
                                    </>
                                )}
                            </button>

                            {message && (
                                <p className={`text-center font-medium ${message.includes("Erreur") ? "text-destructive" : "text-primary"}`}>
                                    {message}
                                </p>
                            )}
                        </form>
                    </div>

                    {/* List */}
                    <div className="space-y-8">
                        <h3 className="text-2xl font-serif mb-8">Derniers Avis</h3>
                        {ratings.length === 0 ? (
                            <div className="text-center py-12 bg-background/50 rounded-xl border border-dashed border-border">
                                <p className="text-muted-foreground">Aucun avis pour le moment. Soyez le premier à partager le vôtre !</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {ratings.map((r) => (
                                    <div key={r.id} className="rating-item bg-background p-6 rounded-xl border border-border shadow-sm flex gap-6">
                                        <div className="flex-shrink-0">
                                            <div className="w-14 h-14 rounded-full overflow-hidden bg-secondary">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src={r.avatar_url} alt={r.name} className="w-full h-full object-cover" />
                                            </div>
                                        </div>
                                        <div className="flex-grow">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-medium text-lg">{r.name}</h4>
                                                <div className="flex gap-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            size={14}
                                                            className={i < r.rating ? "fill-yellow-400 text-yellow-400" : "text-border"}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-muted-foreground leading-relaxed italic">&quot;{r.comment}&quot;</p>
                                            <span className="text-xs text-muted-foreground mt-4 block">
                                                {new Date(r.created_at).toLocaleDateString("fr-FR", {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric"
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
