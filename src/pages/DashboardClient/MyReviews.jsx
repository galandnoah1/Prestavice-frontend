// import { Star } from 'lucide-react'
// import { avisArtisan, artisans } from '../../data/mockData.js'

// export default function ClientReviews() {
//   const mesAvis = avisArtisan.slice(0, 2)

//   return (
//     <div>
//       <div className="dashboard-header">
//         <h1>Mes avis</h1>
//         <p>Les avis que vous avez laissés sur les artisans contactés.</p>
//       </div>

//       <div className="dashboard-list">
//         {mesAvis.map((avis, i) => (
//           <div className="card" style={{ padding: 20 }} key={avis.id}>
//             <div className="flex items-center justify-between mt-8">
//               <h3 style={{ fontSize: '0.95rem' }}>{artisans[i].nomProfessionnel} — {artisans[i].metier}</h3>
//               <div className="flex gap-8" style={{ color: 'var(--color-warning)' }}>
//                 {Array.from({ length: 5 }).map((_, s) => (
//                   <Star key={s} size={14} fill={s < avis.note ? 'currentColor' : 'none'} />
//                 ))}
//               </div>
//             </div>
//             <p className="text-muted mt-8" style={{ fontSize: '0.88rem' }}>{avis.commentaire}</p>
//             <p className="text-muted mt-8" style={{ fontSize: '0.78rem' }}>{avis.date}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }
import { useEffect, useState } from 'react'
import { Star } from 'lucide-react'
import { avisService } from '../../services/avisService.js'
import { useAuth } from '../../context/AuthContext.jsx'

export default function ClientReviews() {
  const { user } = useAuth()
  const [avis, setAvis] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) return
    avisService
      .getByUser(user.id)
      .then(setAvis)
      .catch(() => setError('Impossible de charger vos avis'))
      .finally(() => setLoading(false))
  }, [user])

  if (loading) return <p>Chargement...</p>

  return (
    <div>
      <div className="dashboard-header">
        <h1>Mes avis</h1>
        <p>Les avis que vous avez laissés sur les artisans contactés.</p>
      </div>

      {error && <p className="auth-error" style={{ color: "red" }}>{error}</p>}

      {avis.length > 0 ? (
        <div className="dashboard-list">
          {avis.map((a) => (
            <div className="card" style={{ padding: 20 }} key={a.id}>
              <div className="flex items-center justify-between mt-8">
                <h3 style={{ fontSize: '0.95rem' }}>
                  {a.artisanFirstname} {a.artisanLastname} — {a.artisanService}
                </h3>
                <div className="flex gap-8" style={{ color: 'var(--color-warning)' }}>
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} size={14} fill={s < a.rating ? 'currentColor' : 'none'} />
                  ))}
                </div>
              </div>
              <p className="text-muted mt-8" style={{ fontSize: '0.88rem' }}>{a.comment}</p>
              <p className="text-muted mt-8" style={{ fontSize: '0.78rem' }}>
                {new Date(a.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Star size={36} />
          <h3>Aucun avis laissé</h3>
          <p>Vos avis sur les artisans contactés apparaîtront ici.</p>
        </div>
      )}
    </div>
  )
}