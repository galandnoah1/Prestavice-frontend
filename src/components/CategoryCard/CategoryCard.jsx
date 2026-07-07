import { useNavigate } from 'react-router-dom'
import './CategoryCard.css'

export default function CategoryCard({ category }) {
  const navigate = useNavigate()
  const Icon = category.icon

  return (
    <button className="category-card" onClick={() => navigate(`/explorer?metier=${category.nom}`)}>
      <span className="category-card-icon"><Icon size={22} /></span>
      <span className="category-card-name">{category.nom}</span>
      <span className="category-card-count">{category.count} artisans</span>
    </button>
  )
}
