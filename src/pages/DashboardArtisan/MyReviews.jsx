import ReviewCard from '../../components/ReviewCard/ReviewCard.jsx'
import { avisArtisan } from '../../data/mockData.js'

export default function ArtisanReviews() {
  return (
    <div>
      <div className="dashboard-header">
        <h1>Avis reçus</h1>
        <p>Retrouvez tous les avis laissés par vos clients.</p>
      </div>

      <div className="dashboard-list">
        {avisArtisan.map((r) => <ReviewCard key={r.id} review={r} />)}
      </div>
    </div>
  )
}
