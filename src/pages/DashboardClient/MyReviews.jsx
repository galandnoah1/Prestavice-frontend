import { Star } from 'lucide-react'
import { avisArtisan, artisans } from '../../data/mockData.js'

export default function ClientReviews() {
  const mesAvis = avisArtisan.slice(0, 2)

  return (
    <div>
      <div className="dashboard-header">
        <h1>Mes avis</h1>
        <p>Les avis que vous avez laissés sur les artisans contactés.</p>
      </div>

      <div className="dashboard-list">
        {mesAvis.map((avis, i) => (
          <div className="card" style={{ padding: 20 }} key={avis.id}>
            <div className="flex items-center justify-between mt-8">
              <h3 style={{ fontSize: '0.95rem' }}>{artisans[i].nomProfessionnel} — {artisans[i].metier}</h3>
              <div className="flex gap-8" style={{ color: 'var(--color-warning)' }}>
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={14} fill={s < avis.note ? 'currentColor' : 'none'} />
                ))}
              </div>
            </div>
            <p className="text-muted mt-8" style={{ fontSize: '0.88rem' }}>{avis.commentaire}</p>
            <p className="text-muted mt-8" style={{ fontSize: '0.78rem' }}>{avis.date}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
