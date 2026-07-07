import { Link } from 'react-router-dom'
import { FileText, MessageSquare, Star, Plus } from 'lucide-react'
import StatsCard from '../../components/StatsCard/StatsCard.jsx'
import RequestCard from '../../components/RequestCard/RequestCard.jsx'
import { statsClient, demandes } from '../../data/mockData.js'

const icons = [FileText, MessageSquare, Star]

export default function ClientOverview() {
  return (
    <div>
      <div className="dashboard-header flex items-center justify-between">
        <div>
          <h1>Tableau de bord</h1>
          <p>Retrouvez un résumé de votre activité sur Prestavice.</p>
        </div>
        <Link to="/publier-demande" className="btn btn-primary btn-sm">
          <Plus size={15} /> Publier une demande
        </Link>
      </div>

      <div className="stats-grid">
        {statsClient.map((s, i) => (
          <StatsCard key={s.label} icon={icons[i]} label={s.label} value={s.value} />
        ))}
      </div>

      <div className="dashboard-section">
        <div className="dashboard-section-title">
          <h2>Mes dernières demandes</h2>
        </div>
        <div className="dashboard-list">
          {demandes.slice(0, 2).map((d) => (
            <RequestCard key={d.id} request={d} mode="client" />
          ))}
        </div>
      </div>
    </div>
  )
}
