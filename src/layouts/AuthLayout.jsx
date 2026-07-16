import { Link, Outlet } from 'react-router-dom'
import { Hammer } from 'lucide-react'
import './AuthLayout.css'

export default function AuthLayout() {
  return (
    <div className="auth-layout">
      <div className="auth-layout-panel">
        <div className="auth-layout-content">
          <Link to="/" className="navbar-logo auth-layout-logo">
            <img src="/images/logo.png" alt="" width={170} />
          </Link>
          <Outlet />
        </div>
      </div>


      <div className="auth-layout-visual">
        <img src="/images/register.png" alt="" />
        <div className="auth-layout-quote">

        </div>
      </div>
    </div>
  )
}
