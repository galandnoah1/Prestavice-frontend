
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Send, CheckCircle2, LogIn } from 'lucide-react'
import { cityService } from '../../services/cityService.js'
import { serviceService } from '../../services/serviceService.js'
import { requestService } from '../../services/requestService.js'
import { useAuth } from '../../context/AuthContext.jsx'
import './PublishRequestPage.css'

export default function PublishRequestPage() {
  const { user, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [villes, setVilles] = useState([])
  const [professions, setProfessions] = useState([])
  const [form, setForm] = useState({
    service: '', city: '', title: '', description: '', address: '', toCall: '',
  })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    cityService.getAll().then(setVilles).catch(() => { })
    serviceService.getAll().then(setProfessions).catch(() => { })
  }, [])

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await requestService.create({ ...form, userId: user.id })
      setSent(true)
    } catch (err) {
      setError(err.response?.data?.responseMessage || 'Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  // Pendant la vérification du token au chargement de l'app
  if (authLoading) return null

  // Utilisateur non connecté
  if (!user) {
    return (
      <div className="section publish-page">
        <div className="container container-narrow text-center">
          <h2 className="mt-16">Connectez-vous pour publier une demande</h2>
          <p className="text-muted mt-8">
            Vous devez avoir un compte Prestavice pour publier une demande et être contacté par des prestataires.
          </p>
          <div className="flex gap-8 justify-center mt-24" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Link to="/connexion" className="btn btn-primary">Se connecter</Link>
            <Link to="/inscription" className="btn btn-outline">Créer un compte</Link>
          </div>
        </div>
      </div>
    )
  }

  if (sent) {
    return (
      <div className="section publish-page">
        <div className="container container-narrow text-center">
          <CheckCircle2 size={48} color="var(--color-primary)" />
          <h2 className="mt-16">Votre demande a été publiée</h2>
          <p className="text-muted mt-8">Les prestataires correspondant à votre besoin pourront désormais vous contacter.</p>
          <button className="btn btn-primary mt-24" onClick={() => navigate('/dashboard-client')}>
            Voir mes demandes
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="section publish-page">
      <div className="container container-narrow">
        <div className="section-header" style={{ textAlign: 'center', maxWidth: 'none', margin: '0 0 32px' }}>
          <span className="section-eyebrow">Publier une demande</span>
          <h2>Décrivez votre besoin</h2>
          <p>Les artisans correspondant à votre métier et votre ville pourront vous contacter directement.</p>
        </div>

        <form className="card publish-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Métier recherché</label>
              <select className="form-select" value={form.service} onChange={update('service')} required>
                <option value="">Sélectionner un métier</option>
                {professions.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Ville</label>
              <select className="form-select" value={form.city} onChange={update('city')} required>
                <option value="">Sélectionner une ville</option>
                {villes.map((v) => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Titre de la demande</label>
            <input className="form-input" placeholder="Reparation d'une cuisiniere à gaz" value={form.title} onChange={update('title')} required />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea className="form-textarea" placeholder="Décrivez précisément votre besoin..." value={form.description} onChange={update('description')} required />
          </div>

          <div className="form-group">
            <label className="form-label">Adresse précise</label>
            <input className="form-input" placeholder="Papass PK 14 Derriere l'ecole publique" value={form.address} onChange={update('address')} required />
          </div>

          <div className="form-group">
            <label className="form-label">Numéro à appeler</label>
            <input className="form-input" placeholder="673585337" value={form.toCall} onChange={update('toCall')} required />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? 'Publication...' : 'Publier ma demande'}
          </button>
        </form>
      </div>
    </div>
  )
}