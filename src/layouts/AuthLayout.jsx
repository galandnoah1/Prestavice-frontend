import { Link, Outlet } from 'react-router-dom'
import { Hammer } from 'lucide-react'
import './AuthLayout.css'

export default function AuthLayout() {
  return (
    <div className="auth-layout">
      <div className="auth-layout-panel">
        <div className="auth-layout-content">
          <Link to="/" className="navbar-logo auth-layout-logo">
            Prestavice
          </Link>
          <Outlet />
        </div>
      </div>
      <div className="auth-layout-visual">
        <img src="https://placehold.co/900x1200" alt="" />
        <div className="auth-layout-quote">
          <p>"La plateforme qui rapproche les clients des meilleurs artisans du Cameroun."</p>
        </div>
      </div>
    </div>
  )
}
