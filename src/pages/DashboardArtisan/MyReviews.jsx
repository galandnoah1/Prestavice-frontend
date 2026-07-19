
import { useEffect, useState } from 'react'
import { Star } from 'lucide-react'
import ReviewCard from '../../components/ReviewCard/ReviewCard.jsx'
import { avisService } from '../../services/avisService.js'
import { useAuth } from '../../context/AuthContext.jsx'

export default function ArtisanReviews() {
  const { user } = useAuth()
  const [avis, setAvis] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user?.artisanId) {
      setLoading(false)
      return
    }
    avisService
      .getByArtisan(user.artisanId)
      .then(setAvis)
      .catch(() => setError('Impossible de charger vos avis'))
      .finally(() => setLoading(false))
  }, [user])

  if (loading) return <p>Chargement...</p>

  return (
    <div>
      <div className="dashboard-header">
        <h1>Avis reçus</h1>
        <p>Retrouvez tous les avis laissés par vos clients.</p>
      </div>

      {error && <p className="auth-error">{error}</p>}

      {avis.length > 0 ? (
        <div className="dashboard-list">
          {avis.map((a) => <ReviewCard key={a.id} review={a} />)}
        </div>
      ) : (
        <div className="empty-state">
          <Star size={36} />
          <h3>Aucun avis reçu</h3>
          <p>Les avis laissés par vos clients apparaîtront ici.</p>
        </div>
      )}
    </div>
  )
}