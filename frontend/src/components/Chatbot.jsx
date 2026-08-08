import { useState } from 'react'

// TODO: brancher sur l'API IA (Ollama en local via le backend Laravel, ou Groq en fallback)
export default function Chatbot() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="mb-3 w-80 h-96 rounded-lg glass shadow-frost flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b border-white/10 font-display font-semibold text-sm">
            Assistant Attia Froid
          </div>
          <div className="flex-1 p-4 text-xs text-on-surface-variant overflow-y-auto">
            Bonjour ! Posez-moi une question sur nos produits, horaires ou
            localisation. (branchement IA à venir)
          </div>
          <div className="p-3 border-t border-white/10">
            <input
              className="w-full bg-surface-container border border-outline-variant rounded px-3 py-2 text-xs focus:border-primary-container focus:outline-none"
              placeholder="Votre question..."
            />
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Ouvrir le chat"
        className="w-14 h-14 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shadow-frost hover:bg-primary transition"
      >
        <span className="material-symbols-outlined">
          {open ? 'close' : 'chat'}
        </span>
      </button>
    </div>
  )
}
