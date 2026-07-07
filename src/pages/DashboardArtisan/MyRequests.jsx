import { ClipboardList } from 'lucide-react'
import RequestCard from '../../components/RequestCard/RequestCard.jsx'
import { demandes } from '../../data/mockData.js'

export default function ArtisanRequests() {
  return (
    <div>
      <div className="dashboard-header">
        <h1>Demandes d'intervention</h1>
        <p>Demandes publiées par des clients correspondant à votre métier et votre ville.</p>
      </div>

      {demandes.length > 0 ? (
        <div className="dashboard-list">
          {demandes.map((d) => (
            <RequestCard
              key={d.id}
              request={d}
              mode="artisan"
              onContact={() => window.open(`https://wa.me/?text=${encodeURIComponent('Bonjour, je vous contacte au sujet de votre demande "' + d.titre + '" sur Prestavice.')}`, '_blank')}
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
