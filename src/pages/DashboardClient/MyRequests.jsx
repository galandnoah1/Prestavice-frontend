import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Plus, ClipboardList } from 'lucide-react'
import RequestCard from '../../components/RequestCard/RequestCard.jsx'
import { demandes as initialDemandes } from '../../data/mockData.js'

export default function ClientRequests() {
  const [demandes, setDemandes] = useState(initialDemandes)
  const navigate = useNavigate()

  const handleDelete = (id) => {
    setDemandes((list) => list.filter((d) => d.id !== id))
  }

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

      {demandes.length > 0 ? (
        <div className="dashboard-list">
          {demandes.map((d) => (
            <RequestCard
              key={d.id}
              request={d}
              mode="client"
              onEdit={() => navigate('/publier-demande')}
              onDelete={() => handleDelete(d.id)}
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
