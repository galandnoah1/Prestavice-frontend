import { Outlet, Navigate } from 'react-router-dom'
import { LayoutDashboard, ClipboardList, Star, Settings } from 'lucide-react'
import Navbar from '../../components/Navbar/Navbar.jsx'
import Sidebar from '../../components/Sidebar/Sidebar.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import '../DashboardArtisan/Dashboard.css'

const items = [
  { to: '/dashboard-client', label: 'Tableau de bord', icon: LayoutDashboard, end: true },
  { to: '/dashboard-client/demandes', label: 'Mes demandes', icon: ClipboardList },
  { to: '/dashboard-client/avis', label: 'Mes avis', icon: Star },
  { to: '/parametres', label: 'Paramètres', icon: Settings },
]

export default function DashboardClientLayout() {
  const { user } = useAuth()

  if (!user) return <Navigate to="/connexion" replace />

  return (
    <>
      <Navbar />
      <div className="dashboard-layout">
        <Sidebar items={items} />
        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
    </>
  )
}
