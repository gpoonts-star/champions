"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Lock, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AdminLoginPage() {
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const router = useRouter()

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        // Simple admin password check (as requested)
        if (password === "admin123") {
            localStorage.setItem("admin_auth", "true")
            router.push("/admin/dashboard")
        } else {
            setError("Mot de passe incorrect")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-card p-6 md:p-12 rounded-2xl shadow-xl border border-border">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Lock className="text-primary" size={28} />
                    </div>
                    <h1 className="text-2xl md:text-3xl font-serif">Accès Admin</h1>
                    <p className="text-muted-foreground mt-2 text-sm md:text-base">Veuillez entrer le mot de passe</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full bg-background border border-border focus:ring-2 focus:ring-primary rounded-xl px-4 py-4 outline-none transition-all text-center text-xl tracking-widest"
                            autoFocus
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-medium hover:opacity-90 active:scale-[0.98] transition-all text-lg shadow-lg shadow-primary/20"
                    >
                        Se connecter
                    </button>

                    {error && <p className="text-destructive text-center font-medium animate-bounce">{error}</p>}
                </form>

                <div className="mt-8 text-center">
                    <Link href="/" className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 text-sm">
                        <ArrowLeft size={16} /> Retour au site
                    </Link>
                </div>
            </div>
        </div>
    )
}
