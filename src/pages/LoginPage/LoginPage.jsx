
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock } from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'
import '../RegisterPage/Auth.css'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const user = await login(email, password)
      const isArtisan = user.roles?.includes('ROLE_ARTISAN')
      navigate(isArtisan ? '/dashboard-artisan' : '/dashboard-client')
    } catch (err) {
      const error = err.response?.data?.errorList[0]
      setError(error == "Bad credentials" ? "Mot de passe incorrect" : err.response?.data?.errorList[0] || 'Email ou mot de passe incorrect')
    } finally {
      setLoading(false)
    }
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

        {error && <p className="auth-error" style={{ color: "red" }}>{error}</p>}

        <div className="auth-row">
          <Link to="#" className="auth-link">Mot de passe oublié ?</Link>
        </div>

        <button type="submit" className="btn btn-primary btn-block mt-16" disabled={loading}>
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>

      <p className="auth-footer-text">
        Pas encore de compte ? <Link to="/inscription" className="auth-link">Créer un compte</Link>
      </p>
    </div>
  )
}