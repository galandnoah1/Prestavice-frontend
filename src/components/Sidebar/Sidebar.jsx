
import { NavLink, useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'
import './Sidebar.css'

export default function Sidebar({ items }) {
  const { logout } = useAuth()
  const navigate = useNavigate()

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => 'sidebar-link' + (isActive ? ' sidebar-link-active' : '')}
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <button className="sidebar-link sidebar-logout" onClick={() => { logout(); navigate('/') }}>
        <LogOut size={18} />
        <span>Déconnexion</span>
      </button>
    </aside>
  )
}
