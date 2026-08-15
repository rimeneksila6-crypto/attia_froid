import { useEffect, useState } from 'react'

export default function ScrollSnowTracker() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const pct = docHeight > 0 ? scrollTop / docHeight : 0
      setProgress(Math.min(1, Math.max(0, pct)))
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col items-center h-[50vh] pointer-events-none">
      <div className="relative w-px h-full bg-outline-variant/40 rounded-full overflow-hidden">
        <div
          className="absolute left-0 top-0 w-px bg-primary-container transition-[height] duration-150 ease-out"
          style={{ height: `${progress * 100}%` }}
        />
      </div>
      <span
        className="material-symbols-outlined absolute text-primary-container text-[20px] transition-[top] duration-150 ease-out drop-shadow-[0_0_6px_rgba(0,0,0,0.15)]"
        style={{ top: `${progress * 100}%`, transform: 'translateY(-50%)' }}
      >
        ac_unit
      </span>
    </div>
  )
}