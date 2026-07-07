import { Star } from 'lucide-react'
import './ReviewCard.css'

export default function ReviewCard({ review }) {
  return (
    <div className="review-card">
      <div className="review-card-header">
        <img src={review.photo} alt={review.nom} />
        <div>
          <h4>{review.nom}</h4>
          <span className="review-card-date">{review.date}</span>
        </div>
        <div className="review-card-stars">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={13} fill={i < review.note ? 'currentColor' : 'none'} />
          ))}
        </div>
      </div>
      <p className="review-card-comment">{review.commentaire}</p>
    </div>
  )
}
