import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import api from "../../lib/api"

export default function AdminTopbar() {
  const [dark, setDark] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
  }, [dark])

  const handleLogout = async () => {
    try {
      await api.post("/admin/logout")
    } catch (err) {
      // on deconnecte localement meme si l appel echoue
    }
    localStorage.removeItem("admin_token")
    navigate("/admin/login")
  }

  return (
    <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-surface-container-lowest">
      <div className="flex items-center gap-6 text-xs text-on-surface-variant">
        <span className="text-primary-container font-display font-semibold">TABLEAU DE BORD</span>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setDark((d) => !d)}
          aria-label="Basculer le mode sombre"
          className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center hover:border-primary-container transition"
        >
          <span className="material-symbols-outlined text-[16px]">
            {dark ? "dark_mode" : "light_mode"}
          </span>
        </button>
        <button
          aria-label="Notifications"
          className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center hover:border-primary-container transition"
        >
          <span className="material-symbols-outlined text-[16px]">notifications</span>
        </button>
        <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container text-[11px] font-display font-semibold">
          AD
        </div>
        <button
          onClick={handleLogout}
          aria-label="Deconnexion"
          className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center hover:border-error hover:text-error transition"
        >
          <span className="material-symbols-outlined text-[16px]">logout</span>
        </button>
      </div>
    </header>
  )
}
