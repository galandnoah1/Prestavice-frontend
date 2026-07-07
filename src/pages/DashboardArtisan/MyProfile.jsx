import { useState } from 'react'
import { Camera, Check } from 'lucide-react'
import { villes, professions, artisans } from '../../data/mockData.js'

export default function ArtisanProfile() {
  const base = artisans[0]
  const [form, setForm] = useState({
    nomProfessionnel: base.nomProfessionnel,
    profession: base.metier,
    ville: base.ville,
    telephone: base.telephone,
    email: base.email,
    bio: base.bio,
  })
  const [saved, setSaved] = useState(false)

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
    setSaved(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSaved(true)
  }

  return (
    <div>
      <div className="dashboard-header">
        <h1>Mon profil</h1>
        <p>Ces informations sont visibles publiquement sur votre profil artisan.</p>
      </div>

      <form className="card" style={{ padding: 28, maxWidth: 620 }} onSubmit={handleSubmit}>
        <div className="form-group flex items-center gap-16">
          <img src={base.photo} alt="" style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover' }} />
          <button type="button" className="btn btn-outline btn-sm">
            <Camera size={15} /> Changer la photo
          </button>
        </div>

        <div className="form-group">
          <label className="form-label">Nom professionnel</label>
          <input className="form-input" value={form.nomProfessionnel} onChange={update('nomProfessionnel')} />
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

        <button type="submit" className="btn btn-primary">
          <Check size={16} /> Enregistrer les modifications
        </button>
        {saved && <p className="form-help" style={{ color: 'var(--color-primary-dark)' }}>Profil mis à jour avec succès.</p>}
      </form>
    </div>
  )
}
