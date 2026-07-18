
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Plus, ClipboardList } from 'lucide-react'
import RequestCard from '../../components/RequestCard/RequestCard.jsx'
import { requestService } from '../../services/requestService.js'
import { useAuth } from '../../context/AuthContext.jsx'

export default function ClientRequests() {
  const { user } = useAuth()
  const [demandes, setDemandes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) return
    requestService
      .getByUser(user.id)
      .then(setDemandes)
      .catch(() => setError('Impossible de charger vos demandes'))
      .finally(() => setLoading(false))
  }, [user])

  const handleDelete = async (id) => {
    try {
      await requestService.delete(id)
      setDemandes((list) => list.filter((d) => d.id !== id))
    } catch {
      setError('Impossible de supprimer cette demande')
    }
  }

  const handleComplete = async (id) => {
    try {
      const updated = await requestService.markAsCompleted(id)
      setDemandes((list) => list.map((d) => (d.id === id ? updated : d)))
    } catch {
      setError('Impossible de marquer cette demande comme terminée')
    }
  }

  if (loading) return <p>Chargement...</p>

  return (
    <div>
      <div className="dashboard-header flex items-center justify-between">
        <div>
          <h1>Mes demandes</h1>
          <p>Gérez les demandes d'intervention que vous avez publiées.</p>
        </div>
        <Link to="/publier-demande" className="btn btn-primary btn-sm">
          <Plus size={15} /> Nouvelle demande
        </Link>
      </div>

      {error && <p className="auth-error" style={{ fontSize: "15px", color: "red", padding: "10px" }}>{error}</p>}

      {demandes.length > 0 ? (
        <div className="dashboard-list">
          {demandes.map((d) => (
            <RequestCard
              key={d.id}
              request={d}
              mode="client"
              onEdit={() => navigate('/publier-demande')}
              onDelete={() => handleDelete(d.id)}
              onComplete={() => handleComplete(d.id)}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <ClipboardList size={36} />
          <h3>Aucune demande publiée</h3>
          <p>Publiez votre première demande pour recevoir des propositions d'artisans.</p>
        </div>
      )}
    </div>
  )
}
