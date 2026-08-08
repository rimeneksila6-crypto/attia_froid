import { Outlet, Navigate } from 'react-router-dom'
import AdminSidebar from '../components/admin/AdminSidebar.jsx'
import AdminTopbar from '../components/admin/AdminTopbar.jsx'

export default function AdminLayout() {
  // TODO: remplacer par une vraie vérification du token Sanctum
  const isAuthenticated = true // localStorage.getItem('admin_token')

  if (!isAuthenticated) return <Navigate to="/admin/login" replace />

  return (
    <div className="min-h-screen flex bg-surface text-on-surface">
      <AdminSidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <AdminTopbar />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
