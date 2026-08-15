import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import Chatbot from '../components/Chatbot.jsx'
import ScrollSnowTracker from '../components/ScrollSnowTracker.jsx'
import MouseSnowTrail from '../components/MouseSnowTrail.jsx'
export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Chatbot />
      <ScrollSnowTracker />
      <MouseSnowTrail />
    </div>
  )
}