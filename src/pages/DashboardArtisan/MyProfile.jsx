
import { useState, useEffect } from 'react'
import { Check } from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'
import { userService } from '../../services/userService.js'
import { artisanService } from '../../services/artisanService.js'
import { cityService } from '../../services/cityService.js'
import { serviceService } from '../../services/serviceService.js'

export default function ArtisanProfile() {
  const { user, refreshUser } = useAuth()
  const [form, setForm] = useState({
    firstname: '', lastname: '', email: '',
    telephone: '', ville: '', profession: '', bio: '',
  })
  const [villes, setVilles] = useState([])
  const [professions, setProfessions] = useState([])
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      setForm({
        firstname: user.firstname || '',
        lastname: user.lastname || '',
        email: user.email || '',
        telephone: user.phoneNumber || '',
        ville: user.city || '',
        profession: user.service || '',
        bio: user.bio || '',
      })
    }
    cityService.getAll().then(setVilles).catch(() => { })
    serviceService.getAll().then(setProfessions).catch(() => { })
  }, [user])

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
    setSaved(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await userService.update(user.id, {
        firstname: form.firstname,
        lastname: form.lastname,
        email: form.email,
      })
      await artisanService.update(user.artisanId, {
        phoneNumber: form.telephone,
        city: form.ville,
        service: form.profession,
        bio: form.bio,
      })
      await refreshUser()
      setSaved(true)
    } catch (err) {
      setError(err.response?.data?.responseMessage || 'Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="dashboard-header">
        <h1>Mon profil</h1>
        <p>Ces informations sont visibles publiquement sur votre profil artisan.</p>
      </div>

      <form className="card" style={{ padding: 28, maxWidth: 620 }} onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Prénom</label>
            <input className="form-input" value={form.firstname} onChange={update('firstname')} />
          </div>
          <div className="form-group">
            <label className="form-label">Nom</label>
            <input className="form-input" value={form.lastname} onChange={update('lastname')} />
          </div>
        </div>

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

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Téléphone</label>
            <input className="form-input" value={form.telephone} onChange={update('telephone')} />
          </div>
          <div className="form-group">
            <label className="form-label">E-mail</label>
            <input className="form-input" value={form.email} onChange={update('email')} />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Bio</label>
          <textarea className="form-textarea" value={form.bio} onChange={update('bio')} />
        </div>

        {error && <p className="auth-error">{error}</p>}

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Enregistrement...' : 'Enregistrer les modifications'}
        </button>
        {saved && <p className="form-help" style={{ color: 'var(--color-primary-dark)' }}>Profil mis à jour avec succès.</p>}
      </form>
    </div>
  )
}