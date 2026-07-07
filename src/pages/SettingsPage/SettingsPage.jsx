import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Camera, Check, Lock } from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'
import { villes, professions } from '../../data/mockData.js'
import './SettingsPage.css'

export default function SettingsPage() {
  const { user } = useAuth()
  const [form, setForm] = useState({
    username: user?.username || '',
    email: user?.email || '',
    telephone: '',
    bio: '',
    profession: professions[0],
    ville: villes[0],
    password: '',
    confirmPassword: '',
  })
  const [saved, setSaved] = useState(false)

  if (!user) return <Navigate to="/connexion" replace />

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
    setSaved(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSaved(true)
  }

  return (
    <div className="section settings-page">
      <div className="container container-narrow">
        <div className="section-header" style={{ textAlign: 'left', margin: 0, maxWidth: 'none' }}>
          <h2>Paramètres du compte</h2>
          <p>Gérez vos informations personnelles et votre sécurité.</p>
        </div>

        <form className="card settings-card" onSubmit={handleSubmit}>
          <h3>Informations générales</h3>

          <div className="form-group flex items-center gap-16">
            <img src={user.photo} alt="" className="settings-avatar" />
            <button type="button" className="btn btn-outline btn-sm"><Camera size={15} /> Changer la photo</button>
          </div>

          <div className="form-group">
            <label className="form-label">Nom d'utilisateur</label>
            <input className="form-input" value={form.username} onChange={update('username')} />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">E-mail</label>
              <input className="form-input" value={form.email} onChange={update('email')} />
            </div>
            <div className="form-group">
              <label className="form-label">Téléphone</label>
              <input className="form-input" value={form.telephone} onChange={update('telephone')} placeholder="+237 6XX XX XX XX" />
            </div>
          </div>

          {user.role === 'artisan' && (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Profession</label>
                  <select className="form-select" value={form.profession} onChange={update('profession')}>
                    {professions.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Ville</label>
                  <select className="form-select" value={form.ville} onChange={update('ville')}>
                    {villes.map((v) => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Bio</label>
                <textarea className="form-textarea" value={form.bio} onChange={update('bio')} />
              </div>
            </>
          )}

          <h3 className="mt-24">Sécurité</h3>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Nouveau mot de passe</label>
              <div className="input-icon-wrap">
                <Lock size={16} />
                <input type="password" className="form-input" value={form.password} onChange={update('password')} placeholder="••••••••" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Confirmer le mot de passe</label>
              <div className="input-icon-wrap">
                <Lock size={16} />
                <input type="password" className="form-input" value={form.confirmPassword} onChange={update('confirmPassword')} placeholder="••••••••" />
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            <Check size={16} /> Enregistrer les modifications
          </button>
          {saved && <p className="form-help" style={{ color: 'var(--color-primary-dark)' }}>Vos paramètres ont été mis à jour.</p>}
        </form>
      </div>
    </div>
  )
}
