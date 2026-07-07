import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock } from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'
import '../RegisterPage/Auth.css'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('client')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    login({ email, role })
    navigate(role === 'artisan' ? '/dashboard-artisan' : '/dashboard-client')
  }

  return (
    <div>
      <h1 className="auth-title">Connexion</h1>
      <p className="auth-subtitle">Heureux de vous revoir sur Prestavice.</p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Adresse e-mail</label>
          <div className="input-icon-wrap">
            <Mail size={16} />
            <input type="email" className="form-input" placeholder="vous@exemple.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Mot de passe</label>
          <div className="input-icon-wrap">
            <Lock size={16} />
            <input type="password" className="form-input" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Se connecter en tant que</label>
          <div className="auth-role-toggle">
            <button type="button" className={role === 'client' ? 'active' : ''} onClick={() => setRole('client')}>Client</button>
            <button type="button" className={role === 'artisan' ? 'active' : ''} onClick={() => setRole('artisan')}>Artisan</button>
          </div>
        </div>

        <div className="auth-row">
          <Link to="#" className="auth-link">Mot de passe oublié ?</Link>
        </div>

        <button type="submit" className="btn btn-primary btn-block mt-16">Se connecter</button>
      </form>

      <p className="auth-footer-text">
        Pas encore de compte ? <Link to="/inscription" className="auth-link">Créer un compte</Link>
      </p>
    </div>
  )
}
