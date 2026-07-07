import { Link } from 'react-router-dom'
import { Star, MapPin, CircleCheck } from 'lucide-react'
import './ArtisanCard.css'

export default function ArtisanCard({ artisan, showBio = false }) {
  return (
    <div className="artisan-card">
      <div className="artisan-card-cover">
        <img src={artisan.cover} alt="" />
        {artisan.disponible && (
          <span className="artisan-card-available"><CircleCheck size={13} /> Disponible</span>
        )}
      </div>
      <div className="artisan-card-body">
        <img src={artisan.photo} alt={artisan.nomProfessionnel} className="artisan-card-avatar" />
        <div className="artisan-card-info">
          <h3>{artisan.nomProfessionnel}</h3>
          <p className="artisan-card-metier">{artisan.metier}</p>
          <p className="artisan-card-ville"><MapPin size={13} /> {artisan.ville}</p>
        </div>
      </div>

      {showBio && <p className="artisan-card-bio">{artisan.bio}</p>}

      <div className="artisan-card-footer">
        <span className="artisan-card-rating">
          <Star size={14} fill="currentColor" /> {artisan.note}
          <span className="text-muted"> ({artisan.avis} avis)</span>
        </span>
        <Link to={`/artisan/${artisan.id}`} className="btn btn-outline btn-sm">Voir le profil</Link>
      </div>
    </div>
  )
}
