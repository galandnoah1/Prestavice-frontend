// import { Eye, MessageSquare, Star, TrendingUp, ClipboardList } from 'lucide-react'
// import StatsCard from '../../components/StatsCard/StatsCard.jsx'
// import RequestCard from '../../components/RequestCard/RequestCard.jsx'
// import { statsArtisan, demandes } from '../../data/mockData.js'

// const icons = [Eye, MessageSquare, Star, TrendingUp, ClipboardList]

// export default function ArtisanOverview() {
//   return (
//     <div>
//       <div className="dashboard-header">
//         <h1>Tableau de bord</h1>
//         <p>Bienvenue, voici un aperçu de votre activité sur Prestavice.</p>
//       </div>

//       <div className="stats-grid">
//         {statsArtisan.map((s, i) => (
//           <StatsCard key={s.label} icon={icons[i]} label={s.label} value={s.value} />
//         ))}
//       </div>

//       <div className="dashboard-section">
//         <div className="dashboard-section-title">
//           <h2>Dernières demandes correspondant à votre profil</h2>
//         </div>
//         <div className="dashboard-list">
//           {demandes.slice(0, 2).map((d) => (
//             <RequestCard key={d.id} request={d} mode="artisan" />
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }
import { useEffect, useState } from 'react'
import { Star, ClipboardList, Eye } from 'lucide-react'
import StatsCard from '../../components/StatsCard/StatsCard.jsx'
import RequestCard from '../../components/RequestCard/RequestCard.jsx'
import { requestService } from '../../services/requestService.js'
import { avisService } from '../../services/avisService.js'
import { useAuth } from '../../context/AuthContext.jsx'

export default function ArtisanOverview() {
  const { user } = useAuth()
  const [demandes, setDemandes] = useState([])
  const [averageRating, setAverageRating] = useState(0)
  const [avisCount, setAvisCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user?.city || !user?.service || !user?.artisanId) {
      setLoading(false)
      return
    }
    Promise.all([
      requestService.getByCityAndService(user.city, user.service),
      avisService.getAverageRating(user.artisanId),
      avisService.getByArtisan(user.artisanId),
    ])
      .then(([demandesData, avgData, avisData]) => {
        setDemandes(demandesData)
        setAverageRating(avgData)
        setAvisCount(avisData.length)
      })
      .finally(() => setLoading(false))
  }, [user])

  if (loading) return <p>Chargement...</p>

  const stats = [
    { label: 'Vues du profil', value: '—', icon: Eye }, // à connecter plus tard
    { label: 'Demandes correspondantes', value: demandes.length, icon: ClipboardList },
    { label: 'Note moyenne', value: averageRating.toFixed(1), icon: Star },
    { label: 'Avis reçus', value: avisCount, icon: Star },
  ]

  return (
    <div>
      <div className="dashboard-header">
        <h1>Tableau de bord</h1>
        <p>Bienvenue, voici un aperçu de votre activité sur Prestavice.</p>
      </div>

      <div className="stats-grid">
        {stats.map((s) => (
          <StatsCard key={s.label} icon={s.icon} label={s.label} value={s.value} />
        ))}
      </div>

      <div className="dashboard-section">
        <div className="dashboard-section-title">
          <h2>Dernières demandes correspondant à votre profil</h2>
        </div>
        {demandes.length > 0 ? (
          <div className="dashboard-list">
            {demandes.slice(0, 2).map((d) => (
              <RequestCard key={d.id} request={d} mode="artisan" />
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
    </div>
  )
}