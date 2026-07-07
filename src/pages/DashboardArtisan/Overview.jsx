import { Eye, MessageSquare, Star, TrendingUp, ClipboardList } from 'lucide-react'
import StatsCard from '../../components/StatsCard/StatsCard.jsx'
import RequestCard from '../../components/RequestCard/RequestCard.jsx'
import { statsArtisan, demandes } from '../../data/mockData.js'

const icons = [Eye, MessageSquare, Star, TrendingUp, ClipboardList]

export default function ArtisanOverview() {
  return (
    <div>
      <div className="dashboard-header">
        <h1>Tableau de bord</h1>
        <p>Bienvenue, voici un aperçu de votre activité sur Prestavice.</p>
      </div>

      <div className="stats-grid">
        {statsArtisan.map((s, i) => (
          <StatsCard key={s.label} icon={icons[i]} label={s.label} value={s.value} />
        ))}
      </div>

      <div className="dashboard-section">
        <div className="dashboard-section-title">
          <h2>Dernières demandes correspondant à votre profil</h2>
        </div>
        <div className="dashboard-list">
          {demandes.slice(0, 2).map((d) => (
            <RequestCard key={d.id} request={d} mode="artisan" />
          ))}
        </div>
      </div>
    </div>
  )
}
