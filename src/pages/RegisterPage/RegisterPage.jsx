import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Briefcase, Mail, Phone, Lock, MapPin, Hammer, Check, HardHat } from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'
import { villes, professions } from '../../data/mockData.js'
import './Auth.css'

export default function RegisterPage() {
  const [role, setRole] = useState(null)
  const [form, setForm] = useState({
    username: '', nomProfessionnel: '', email: '', telephone: '',
    password: '', confirmPassword: '', ville: '', profession: '',
  })
  const { register } = useAuth()
  const navigate = useNavigate()

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    register({ ...form, role })
    navigate(role === 'artisan' ? '/dashboard-artisan' : '/dashboard-client')
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
        <div className="form-group">
          <label className="form-label">Nom d'utilisateur</label>
          <div className="input-icon-wrap">
            <User size={16} />
            <input className="form-input" placeholder="Votre pseudo" value={form.username} onChange={update('username')} required />
          </div>
        </div>

        {role === 'artisan' && (
          <div className="form-group">
            <label className="form-label">Nom professionnel</label>
            <div className="input-icon-wrap">
              <Briefcase size={16} />
              <input className="form-input" placeholder="Ex : Jean-Paul Etoundi Plomberie" value={form.nomProfessionnel} onChange={update('nomProfessionnel')} required />
            </div>
          </div>
        )}

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
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Ville</label>
              <div className="input-icon-wrap">

                <select className="form-select" value={form.ville} onChange={update('ville')} required>
                  <option value="">Sélectionner</option>
                  {villes.map((v) => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Profession</label>
              <div className="input-icon-wrap">

                <select className="form-select" value={form.profession} onChange={update('profession')} required>
                  <option value="">Sélectionner</option>
                  {professions.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>
          </div>
        )}

        <button type="submit" className="btn btn-primary btn-block mt-16">
          <Check size={16} /> Créer mon compte
        </button>
      </form>

      <p className="auth-footer-text">
        Déjà inscrit ? <Link to="/connexion" className="auth-link">Se connecter</Link>
      </p>
    </div>
  )
}
