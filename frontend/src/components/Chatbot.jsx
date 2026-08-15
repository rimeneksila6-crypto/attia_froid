import { useState, useRef, useEffect } from 'react'
import api from '../lib/api'

const GREETING = "Bonjour ! Posez-moi une question sur nos produits, horaires ou localisation."

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([{ role: 'assistant', text: GREETING }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, loading])

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return
    setMessages((m) => [...m, { role: 'user', text }])
    setInput('')
    setLoading(true)
    try {
      const res = await api.post('/chat', { message: text })
      setMessages((m) => [...m, { role: 'assistant', text: res.data.reply }])
    } catch (err) {
      setMessages((m) => [...m, { role: 'assistant', text: "Desole, je ne suis pas disponible pour le moment. Contactez-nous directement au 55 836 100." }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') send()
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="mb-3 w-80 h-96 rounded-lg glass shadow-frost flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b border-white/10 font-display font-semibold text-sm">
            Assistant Attia Froid
          </div>
          <div ref={scrollRef} className="flex-1 p-4 text-xs overflow-y-auto space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === 'user'
                    ? 'ml-auto max-w-[85%] bg-primary-container text-on-primary-container rounded-lg px-3 py-2'
                    : 'mr-auto max-w-[85%] bg-surface-container text-on-surface-variant rounded-lg px-3 py-2'
                }
              >
                {m.text}
              </div>
            ))}
            {loading && (
              <div className="mr-auto max-w-[85%] bg-surface-container text-on-surface-variant rounded-lg px-3 py-2">
                <span className="animate-pulse">...</span>
              </div>
            )}
          </div>
          <div className="p-3 border-t border-white/10 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              className="flex-1 bg-surface-container border border-outline-variant rounded px-3 py-2 text-xs focus:border-primary-container focus:outline-none disabled:opacity-50"
              placeholder="Votre question..."
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              className="bg-primary-container text-on-primary-container rounded px-3 py-2 disabled:opacity-40 hover:bg-primary transition"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
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