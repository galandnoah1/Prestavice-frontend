
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Star, MapPin } from 'lucide-react'
import { avisService } from '../../services/avisService.js'
import './ArtisanCard.css'

export default function ArtisanCard({ artisan, showBio = false }) {
  const [averageRating, setAverageRating] = useState(null)
  const [reviewCount, setReviewCount] = useState(0)

  useEffect(() => {
    avisService.getAverageRating(artisan.id).then(setAverageRating).catch(() => { })
    avisService.getByArtisan(artisan.id).then((data) => setReviewCount(data.length)).catch(() => { })
  }, [artisan.id])

  const fullName = `${artisan.firstname} ${artisan.lastname}`
  const initials = `${artisan.firstname?.[0] ?? ''}${artisan.lastname?.[0] ?? ''}`.toUpperCase()

  return (
    <div className="artisan-card">
      <div className="artisan-card-body">
        <span className="artisan-card-avatar artisan-card-avatar-initials">{initials}</span>
        <div className="artisan-card-info">
          <h3>{fullName}</h3>
          <p className="artisan-card-metier">{artisan.service}</p>
          <p className="artisan-card-ville"><MapPin size={13} /> {artisan.city}</p>
        </div>
      </div>

      {showBio && <p className="artisan-card-bio">{artisan.bio}</p>}

      <div className="artisan-card-footer">
        <span className="artisan-card-rating">
          <Star size={14} fill="currentColor" />
          {averageRating !== null ? averageRating.toFixed(1) : '—'}
          <span className="text-muted"> ({reviewCount} avis)</span>
        </span>
        <Link to={`/artisan/${artisan.id}`} className="btn btn-outline btn-sm">Voir le profil</Link>
      </div>
    </div>
  )
}