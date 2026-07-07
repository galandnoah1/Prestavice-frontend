import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Send, CheckCircle2 } from 'lucide-react'
import { villes, professions } from '../../data/mockData.js'
import { useAuth } from '../../context/AuthContext.jsx'
import './PublishRequestPage.css'

export default function PublishRequestPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    profession: '', ville: '', titre: '', description: '', budget: '', date: '',
  })
  const [sent, setSent] = useState(false)

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  if (sent) {
    return (
      <div className="section publish-page">
        <div className="container container-narrow text-center">
          <CheckCircle2 size={48} color="var(--color-primary)" />
          <h2 className="mt-16">Votre demande a été publiée</h2>
          <p className="text-muted mt-8">Les artisans correspondant à votre besoin pourront désormais vous contacter.</p>
          <button className="btn btn-primary mt-24" onClick={() => navigate(user ? '/dashboard-client' : '/')}>
            {user ? 'Voir mes demandes' : "Retour à l'accueil"}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="section publish-page">
      <div className="container container-narrow">
        <div className="section-header" style={{ textAlign: 'left', maxWidth: 'none', margin: '0 0 32px' }}>
          <span className="section-eyebrow">Publier une demande</span>
          <h2>Décrivez votre besoin</h2>
          <p>Les artisans correspondant à votre métier et votre ville pourront vous contacter directement.</p>
        </div>

        <form className="card publish-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Métier recherché</label>
              <select className="form-select" value={form.profession} onChange={update('profession')} required>
                <option value="">Sélectionner un métier</option>
                {professions.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Ville</label>
              <select className="form-select" value={form.ville} onChange={update('ville')} required>
                <option value="">Sélectionner une ville</option>
                {villes.map((v) => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Titre de la demande</label>
            <input className="form-input" placeholder="Ex : Réparation fuite d'eau cuisine" value={form.titre} onChange={update('titre')} required />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea className="form-textarea" placeholder="Décrivez précisément votre besoin..." value={form.description} onChange={update('description')} required />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Budget (optionnel)</label>
              <input className="form-input" placeholder="Ex : 20 000 FCFA" value={form.budget} onChange={update('budget')} />
            </div>
            <div className="form-group">
              <label className="form-label">Date souhaitée</label>
              <input type="date" className="form-input" value={form.date} onChange={update('date')} required />
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            <Send size={16} /> Publier ma demande
          </button>
        </form>
      </div>
    </div>
  )
}
