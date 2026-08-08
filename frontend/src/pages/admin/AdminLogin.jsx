import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../../lib/api"

export default function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const { data } = await api.post("/admin/login", { email, password })
      localStorage.setItem("admin_token", data.token)
      navigate("/admin")
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.errors?.email?.[0] ||
        "Identifiants incorrects."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded bg-primary-container flex items-center justify-center font-display font-extrabold text-on-primary-container text-base mx-auto mb-3">
            AF
          </div>
          <p className="font-display font-extrabold tracking-wide text-sm">ATTIA FROID</p>
          <p className="text-[11px] text-on-surface-variant">
            Systemes de Refrigeration Industrielle
          </p>
        </div>

        <div className="rounded-lg border border-white/10 bg-surface-container-low p-8">
          <h1 className="font-display font-bold text-lg mb-1">Portail Admin</h1>
          <p className="text-xs text-on-surface-variant mb-6">
            Acces securise pour le personnel autorise.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] text-on-surface-variant mb-1">
                Identifiant / Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface-container border border-outline-variant rounded px-3 py-2.5 text-sm focus:border-primary-container focus:outline-none"
                placeholder="admin@attiafroid.com"
              />
            </div>
            <div>
              <label className="block text-[11px] text-on-surface-variant mb-1">
                Mot de passe
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface-container border border-outline-variant rounded px-3 py-2.5 text-sm focus:border-primary-container focus:outline-none"
                placeholder="********"
              />
            </div>

            {error && <p className="text-xs text-error">{error}</p>}

            <div className="flex items-center justify-between text-[11px] text-on-surface-variant">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-primary-container" />
                Rester connecte
              </label>
              <span className="text-primary-container cursor-pointer hover:underline">Oublie ?</span>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </form>
        </div>

        <p className="text-center text-[10px] text-on-surface-variant/60 mt-6">
          SUPPORT TECHNIQUE - CONFIDENTIALITE
        </p>
      </div>
    </div>
  )
}
