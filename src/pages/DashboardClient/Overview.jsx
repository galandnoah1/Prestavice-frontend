
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FileText, CheckCircle, Star, Plus, ClipboardList } from 'lucide-react'
import StatsCard from '../../components/StatsCard/StatsCard.jsx'
import RequestCard from '../../components/RequestCard/RequestCard.jsx'
import { requestService } from '../../services/requestService.js'
import { avisService } from '../../services/avisService.js'
import { useAuth } from '../../context/AuthContext.jsx'

export default function ClientOverview() {
  const { user } = useAuth()
  const [demandes, setDemandes] = useState([])
  const [avisCount, setAvisCount] = useState(0)
  const [loading, setLoading] = useState(true)



  useEffect(() => {
    if (!user) return
    Promise.all([
      requestService.getByUser(user.id),
      avisService.getByUser(user.id),
    ])
      .then(([demandesData, avisData]) => {
        setDemandes(demandesData)
        setAvisCount(avisData.length)
      })
      .finally(() => setLoading(false))
  }, [user])

  if (loading) return <p>Chargement...</p>

  const stats = [
    { label: 'Demandes publiées', value: demandes.length, icon: FileText },
    { label: 'Demandes actives', value: demandes.filter((d) => d.isActive).length, icon: CheckCircle },
    { label: 'Avis laissés', value: avisCount, icon: Star },
  ]

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
        {stats.map((s) => (
          <StatsCard key={s.label} icon={s.icon} label={s.label} value={s.value} />
        ))}
      </div>

      <div className="dashboard-section">
        <div className="dashboard-section-title">
          <h2>Mes dernières demandes</h2>
        </div>
        {demandes.length > 0 ? (
          <div className="dashboard-list">
            {demandes.slice(0, 2).map((d) => (
              <RequestCard key={d.id}
                request={d}
                mode="client"
                onDashBoard={true} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <ClipboardList size={36} />
            <h3>Aucune demande publiée</h3>
            <p>Publiez votre première demande pour la voir apparaître ici.</p>
          </div>
        )}
      </div>
    </div>
  )
}