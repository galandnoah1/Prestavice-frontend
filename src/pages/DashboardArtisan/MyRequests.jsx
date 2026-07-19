
import { useEffect, useState } from 'react'
import { ClipboardList } from 'lucide-react'
import RequestCard from '../../components/RequestCard/RequestCard.jsx'
import { requestService } from '../../services/requestService.js'
import { useAuth } from '../../context/AuthContext.jsx'

export default function ArtisanRequests() {
  const { user } = useAuth()
  const [demandes, setDemandes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user?.city || !user?.service) {
      setLoading(false)
      return
    }
    requestService
      .getByCityAndService(user.city, user.service)
      .then(setDemandes)
      .catch(() => setError('Impossible de charger les demandes'))
      .finally(() => setLoading(false))
  }, [user])

  if (loading) return <p>Chargement...</p>

  return (
    <div>
      <div className="dashboard-header">
        <h1>Demandes d'intervention</h1>
        <p>Demandes publiées par des clients correspondant à votre métier et votre ville.</p>
      </div>

      {error && <p className="auth-error">{error}</p>}

      {demandes.length > 0 ? (
        <div className="dashboard-list">
          {demandes.map((d) => (
            <RequestCard
              key={d.id}
              request={d}
              mode="artisan"
              onContact={() =>
                window.open(
                  `https://wa.me/?text=${encodeURIComponent(
                    `Bonjour, je vous contacte au sujet de votre demande "${d.title}" sur Prestavice.`
                  )}`,
                  '_blank'
                )
              }
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <ClipboardList size={36} />
          <h3>Aucune demande pour le moment</h3>
          <p>Les nouvelles demandes correspondant à votre profil apparaîtront ici.</p>
        </div>
      )}
    </div>
  )
}