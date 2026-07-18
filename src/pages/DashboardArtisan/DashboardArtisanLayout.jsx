import { Outlet, Navigate } from 'react-router-dom'
import { LayoutDashboard, UserCircle, Images, Star, ClipboardList, Settings } from 'lucide-react'
import Navbar from '../../components/Navbar/Navbar.jsx'
import Sidebar from '../../components/Sidebar/Sidebar.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import './Dashboard.css'

const items = [
  { to: '/dashboard-artisan', label: 'Tableau de bord', icon: LayoutDashboard, end: true },
  { to: '/dashboard-artisan/profil', label: 'Mon profil', icon: UserCircle },
  { to: '/dashboard-artisan/realisations', label: 'Mes réalisations', icon: Images },
  { to: '/dashboard-artisan/avis', label: 'Avis reçus', icon: Star },
  { to: '/dashboard-artisan/demandes', label: "Demandes", icon: ClipboardList },
  { to: '/parametres', label: 'Paramètres', icon: Settings },
]

export default function DashboardArtisanLayout() {
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
