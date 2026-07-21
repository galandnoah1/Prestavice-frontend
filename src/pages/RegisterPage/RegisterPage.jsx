import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Briefcase, Mail, Phone, Lock, FileText, Check, HardHat } from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'
import { authService } from '../../services/authService.js'
import { artisanService } from '../../services/artisanService.js'
import { cityService } from '../../services/cityService.js'
import { serviceService } from '../../services/serviceService.js'
import './Auth.css'

export default function RegisterPage() {
  const [role, setRole] = useState(null)
  const [form, setForm] = useState({
    firstname: '', lastname: '', email: '', telephone: '',
    password: '', confirmPassword: '', ville: '', profession: '', bio: '',
  })
  const [villes, setVilles] = useState([])
  const [professions, setProfessions] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (role === 'artisan') {
      cityService.getAll().then(setVilles).catch(() => { })
      serviceService.getAll().then(setProfessions).catch(() => { })
    }
  }, [role])

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (form.password !== form.confirmPassword) {
      setError('Les mots de passe ne correspondent pas')
      return
    }

    setLoading(true)
    try {
      if (role === 'client') {
        await authService.register({
          firstname: form.firstname,
          lastname: form.lastname,
          email: form.email,
          password: form.password,
          role: 'ROLE_USER',
        })
      } else {
        const position = await getCurrentPosition()

        await artisanService.register({
          user: {
            firstname: form.firstname,
            lastname: form.lastname,
            email: form.email,
            password: form.password,
            role: 'ROLE_ARTISAN',
          },
          phoneNumber: form.telephone,
          city: form.ville,
          service: form.profession,
          bio: form.bio,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      }

      await login(form.email, form.password)
      navigate(role === 'artisan' ? '/dashboard-artisan' : '/dashboard-client')
    } catch (err) {
      if (err.code === 1) {
        setError('La géolocalisation est obligatoire pour créer un profil artisan. Veuillez autoriser l\'accès à votre position.')
      } else if (err.code === 2 || err.code === 3) {
        setError('Impossible de récupérer votre position. Vérifiez votre connexion et réessayez.')
      } else {
        setError(err.response?.data?.responseMessage || 'Une erreur est survenue')
      }
    } finally {
      setLoading(false)
    }
  }

  function getCurrentPosition() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject({ code: 0, message: 'Géolocalisation non supportée par ce navigateur' })
        return
      }
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
      })
    })
  }

  if (!role) {
    return (
      <div>
        <h1 className="auth-title">Créer un compte</h1>
        <p className="auth-subtitle">Comment souhaitez-vous utiliser Prestavice ?</p>

        <div className="auth-role-cards">
          <button className="auth-role-card" onClick={() => setRole('client')}>
            <span className="auth-role-card-icon"><User size={22} /></span>
            <h3>Je suis client</h3>
            <p>Je cherche un professionnel pour un projet ou une réparation.</p>
          </button>
          <button className="auth-role-card" onClick={() => setRole('artisan')}>
            <span className="auth-role-card-icon"><HardHat size={22} /></span>
            <h3>Je suis un professionnel</h3>
            <p>Je propose mes services et souhaite être visible.</p>
          </button>
        </div>

        <p className="auth-footer-text">
          Déjà inscrit ? <Link to="/connexion" className="auth-link">Se connecter</Link>
        </p>
      </div>
    )
  }

  return (
    <div>
      <button className="auth-back" onClick={() => setRole(null)}>Changer de profil</button>
      <h1 className="auth-title">Inscription {role === 'client' ? 'client' : 'pro'}</h1>
      <p className="auth-subtitle">
        {role === 'client' ? 'Créez votre compte pour publier des demandes et contacter des professionnels.' : 'Créez votre profil pro et soyez visible auprès des clients.'}
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Prénom</label>
            <div className="input-icon-wrap">
              <User size={16} />
              <input className="form-input" placeholder="Votre prénom" value={form.firstname} onChange={update('firstname')} required />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Nom</label>
            <div className="input-icon-wrap">
              <User size={16} />
              <input className="form-input" placeholder="Votre nom" value={form.lastname} onChange={update('lastname')} required />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Adresse e-mail</label>
          <div className="input-icon-wrap">
            <Mail size={16} />
            <input type="email" className="form-input" placeholder="vous@exemple.com" value={form.email} onChange={update('email')} required />
          </div>
        </div>

        {role === 'artisan' && (
          <div className="form-group">
            <label className="form-label">Téléphone</label>
            <div className="input-icon-wrap">
              <Phone size={16} />
              <input className="form-input" placeholder="+237 6XX XX XX XX" value={form.telephone} onChange={update('telephone')} required />
            </div>
          </div>
        )}

        <div className="form-group">
          <label className="form-label">Mot de passe</label>
          <div className="input-icon-wrap">
            <Lock size={16} />
            <input type="password" className="form-input" placeholder="••••••••" value={form.password} onChange={update('password')} required />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Confirmation du mot de passe</label>
          <div className="input-icon-wrap">
            <Lock size={16} />
            <input type="password" className="form-input" placeholder="••••••••" value={form.confirmPassword} onChange={update('confirmPassword')} required />
          </div>
        </div>

        {role === 'artisan' && (
          <>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Ville</label>
                <select className="form-select" value={form.ville} onChange={update('ville')} required>
                  <option value="">Sélectionner</option>
                  {villes.map((v) => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Profession</label>
                <select className="form-select" value={form.profession} onChange={update('profession')} required>
                  <option value="">Sélectionner</option>
                  {professions.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Bio</label>
              <div className="input-icon-wrap">
                <textarea className="form-textarea" placeholder="Présentez votre activité, votre expérience" value={form.bio} onChange={update('bio')} required />
              </div>
            </div>
          </>
        )}

        {error && <p className="auth-error">{error}</p>}

        <button type="submit" className="btn btn-primary btn-block mt-16" disabled={loading}>
          {loading ? 'Création...' : 'Créer mon compte'}
        </button>
      </form>

      <p className="auth-footer-text">
        Déjà inscrit ? <Link to="/connexion" className="auth-link">Se connecter</Link>
      </p>
    </div>
  )
}