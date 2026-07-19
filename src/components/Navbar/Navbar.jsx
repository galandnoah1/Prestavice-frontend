import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, ChevronDown, LayoutDashboard, LogOut } from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { to: '/', label: 'Accueil' },
    { to: '/explorer', label: 'Explorer' },
    { to: '/comment-ca-marche', label: 'Comment ça marche' },
    { to: '/publier-demande', label: 'Publier une demande' },
  ]

  const handleLogout = () => {
    logout()
    setMenuOpen(false)
    navigate('/')
  }

  const isArtisan = user?.roles?.includes('ROLE_ARTISAN')
  const fullName = user ? `${user.firstname} ${user.lastname}` : ''
  const initials = user ? `${user.firstname?.[0] ?? ''}${user.lastname?.[0] ?? ''}`.toUpperCase() : ''

  return (
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-inner">
        <Link to="/" className="navbar-logo">
          <img src="/images/logo.png" alt="" width={170} />
        </Link>

        <nav className={`navbar-links ${open ? 'navbar-links-open' : ''}`}>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => 'navbar-link' + (isActive ? ' navbar-link-active' : '')}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
          <div className="navbar-mobile-actions">
            {!user && (
              <>
                <Link to="/connexion" className="btn btn-outline btn-sm btn-block" onClick={() => setOpen(false)}>Connexion</Link>
                <Link to="/inscription" className="btn btn-primary btn-sm btn-block" onClick={() => setOpen(false)}>Inscription</Link>
              </>
            )}
          </div>
        </nav>

        <div className="navbar-actions">
          {!user ? (
            <span className="navbar-actions-anon">
              <Link to="/connexion" className="btn btn-ghost btn-sm">Connexion</Link>
              <Link to="/inscription" className="btn btn-primary btn-sm">Inscription</Link>
            </span>
          ) : (
            <div className="navbar-user">
              <button className="navbar-user-trigger" onClick={() => setMenuOpen((v) => !v)}>
                <span className="navbar-user-avatar navbar-user-avatar-initials">{initials}</span>
                <span>{fullName}</span>
                <ChevronDown size={16} />
              </button>
              {menuOpen && (
                <div className="navbar-user-menu">
                  <Link to={isArtisan ? '/dashboard-artisan' : '/dashboard-client'} onClick={() => setMenuOpen(false)}>
                    <LayoutDashboard size={16} /> Tableau de bord
                  </Link>
                  <button onClick={handleLogout}>
                    <LogOut size={16} /> Déconnexion
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <button className="navbar-burger" onClick={() => setOpen((v) => !v)} aria-label="Menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  )
}