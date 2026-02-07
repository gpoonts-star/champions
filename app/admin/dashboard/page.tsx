"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Trash2, LogOut, ArrowLeft, Star, AlertCircle, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

interface Rating {
    id: string
    name: string
    rating: number
    comment: string
    avatar_url: string
    created_at: string
    is_visible: boolean
}

export default function AdminDashboard() {
    const [ratings, setRatings] = useState<Rating[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isDeleting, setIsDeleting] = useState<string | null>(null)
    const [isUpdating, setIsUpdating] = useState<string | null>(null)
    const router = useRouter()

    useEffect(() => {
        const auth = localStorage.getItem("admin_auth")
        if (auth !== "true") {
            router.push("/admin/login")
            return
        }
        fetchRatings()
    }, [])

    async function fetchRatings() {
        const { data, error } = await supabase
            .from("ratings")
            .select("*")
            .order("created_at", { ascending: false })

        if (error) {
            console.error("Error fetching ratings:", error)
        } else {
            setRatings(data || [])
        }
        setIsLoading(false)
    }

    async function deleteRating(id: string) {
        if (!confirm("Voulez-vous vraiment supprimer cet avis ?")) return

        setIsDeleting(id)
        const { error } = await supabase.from("ratings").delete().eq("id", id)

        if (error) {
            alert("Erreur lors de la suppression")
            console.error("Error deleting rating:", error)
        } else {
            setRatings(ratings.filter((r) => r.id !== id))
        }
        setIsDeleting(null)
    }

    const visibleCount = ratings.filter(r => r.is_visible).length

    async function toggleVisibility(id: string, currentStatus: boolean) {
        if (!currentStatus && visibleCount >= 8) {
            alert("Vous ne pouvez pas afficher plus de 8 avis sur le site.")
            return
        }

        setIsUpdating(id)
        const { error } = await supabase
            .from("ratings")
            .update({ is_visible: !currentStatus })
            .eq("id", id)

        if (error) {
            alert("Erreur lors de la mise à jour (Avez-vous exécuté le SQL ?)")
            console.error(error)
        } else {
            setRatings(ratings.map(r => r.id === id ? { ...r, is_visible: !currentStatus } : r))
        }
        setIsUpdating(null)
    }

    const handleLogout = () => {
        localStorage.removeItem("admin_auth")
        router.push("/admin/login")
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-xl font-serif text-white/70">Chargement...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white/90">
            {/* Header */}
            <header className="bg-[#111] border-b border-white/10 py-4 px-4 md:px-12 flex justify-between items-center sticky top-0 z-20 shadow-xl">
                <div className="flex items-center gap-3 md:gap-6">
                    <Link href="/" className="text-white/50 hover:text-white transition-colors p-2">
                        <ArrowLeft size={20} />
                    </Link>
                    <h1 className="text-xl md:text-2xl font-serif truncate">Gestion des Avis</h1>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-white/50 hover:text-destructive transition-colors px-3 py-2 rounded-xl hover:bg-destructive/10 text-sm md:text-base font-medium"
                >
                    <LogOut size={18} /> <span className="hidden sm:inline">Déconnexion</span>
                </button>
            </header>

            <main className="max-w-5xl mx-auto py-8 md:py-12 px-4 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-serif mb-2">{ratings.length} Avis reçus</h2>
                        <p className="text-white/50">
                            <span className={`font-bold ${visibleCount >= 8 ? "text-yellow-500" : "text-primary"}`}>
                                {visibleCount}/8
                            </span> sélectionnés pour l'affichage public
                        </p>
                    </div>
                </div>

                {ratings.length === 0 ? (
                    <div className="bg-[#111] p-12 rounded-3xl border border-white/10 text-center shadow-inner">
                        <AlertCircle className="mx-auto text-white/20 mb-4" size={48} />
                        <p className="text-lg md:text-xl text-white/40 font-light italic">Aucun avis trouvé.</p>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {ratings.map((r) => (
                            <div key={r.id} className={`bg-[#161616] p-6 md:p-8 rounded-3xl border transition-all duration-300 shadow-xl ${r.is_visible ? "border-primary/50 shadow-primary/5" : "border-white/5"}`}>
                                <div className="flex flex-col md:flex-row gap-6 items-start">
                                    {/* Info Column */}
                                    <div className="flex items-center gap-4 w-full md:w-auto">
                                        <div className="flex-shrink-0">
                                            <div className="w-14 h-14 md:w-20 md:h-20 rounded-2xl overflow-hidden bg-white/5 border border-white/10 p-1">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={r.avatar_url}
                                                    alt={r.name}
                                                    className="w-full h-full object-cover rounded-xl"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="text-lg md:text-xl font-medium text-white">{r.name}</h3>
                                            <div className="flex gap-1 mt-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        size={16}
                                                        className={i < r.rating ? "fill-yellow-400 text-yellow-400" : "text-white/10"}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-xs text-white/30 block mt-2">
                                                {new Date(r.created_at).toLocaleString("fr-FR")}
                                            </span>
                                        </div>
                                        {/* Mobile Delete Button */}
                                        <button
                                            onClick={() => deleteRating(r.id)}
                                            className="md:hidden p-3 text-destructive/50 hover:text-destructive hover:bg-destructive/10 rounded-xl transition-colors"
                                        >
                                            <Trash2 size={24} />
                                        </button>
                                    </div>

                                    {/* Content Column */}
                                    <div className="flex-grow space-y-6 w-full md:pt-1">
                                        <p className="text-white/70 leading-relaxed text-base md:text-xl font-serif italic border-l-2 border-primary/20 pl-6 py-1">
                                            &quot;{r.comment}&quot;
                                        </p>

                                        <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-white/5">
                                            {/* Visibility Toggle */}
                                            <button
                                                onClick={() => toggleVisibility(r.id, r.is_visible || false)}
                                                disabled={isUpdating === r.id}
                                                className={`flex items-center gap-3 px-5 py-2.5 rounded-2xl transition-all font-medium border ${r.is_visible
                                                        ? "bg-primary/20 border-primary text-primary"
                                                        : "bg-white/5 border-white/5 text-white/40 hover:bg-white/10"
                                                    }`}
                                            >
                                                {r.is_visible ? <Eye size={18} /> : <EyeOff size={18} />}
                                                {isUpdating === r.id ? "Mise à jour..." : (r.is_visible ? "Visible sur le site" : "Masqué")}
                                            </button>

                                            {/* Desktop Actions */}
                                            <button
                                                onClick={() => deleteRating(r.id)}
                                                disabled={isDeleting === r.id}
                                                className="hidden md:flex items-center gap-2 text-destructive/60 hover:text-destructive hover:bg-destructive/10 px-5 py-2.5 rounded-2xl transition-all border border-transparent hover:border-destructive/30 font-medium"
                                            >
                                                <Trash2 size={18} />
                                                {isDeleting === r.id ? "..." : "Supprimer"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}
