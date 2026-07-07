import './StatsCard.css'

export default function StatsCard({ icon: Icon, label, value }) {
  return (
    <div className="stats-card">
      {Icon && <span className="stats-card-icon"><Icon size={20} /></span>}
      <div>
        <p className="stats-card-value">{value}</p>
        <p className="stats-card-label">{label}</p>
      </div>
    </div>
  )
}
