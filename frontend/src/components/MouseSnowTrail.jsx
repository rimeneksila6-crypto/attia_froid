import { useEffect, useRef, useState } from 'react'

let idCounter = 0

export default function MouseSnowTrail() {
  const [flakes, setFlakes] = useState([])
  const lastSpawn = useRef(0)

  useEffect(() => {
    const handleMove = (e) => {
      const now = Date.now()
      if (now - lastSpawn.current < 60) return
      lastSpawn.current = now

      const id = idCounter++
      const drift = (Math.random() - 0.5) * 40
      const size = 10 + Math.random() * 8
      const duration = 1000 + Math.random() * 500

      setFlakes((prev) => [
        ...prev,
        { id, x: e.clientX, y: e.clientY, drift, size, duration },
      ])

      setTimeout(() => {
        setFlakes((prev) => prev.filter((f) => f.id !== id))
      }, duration)
    }

    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <div className="fixed inset-0 z-[60] pointer-events-none overflow-hidden">
      {flakes.map((f) => (
        <span
          key={f.id}
          className="material-symbols-outlined absolute text-primary-container"
          style={{
            left: f.x,
            top: f.y,
            fontSize: f.size,
            opacity: 0.8,
            animation: `snow-fall ${f.duration}ms ease-out forwards`,
            '--drift': `${f.drift}px`,
          }}
        >
          ac_unit
        </span>
      ))}
    </div>
  )
}