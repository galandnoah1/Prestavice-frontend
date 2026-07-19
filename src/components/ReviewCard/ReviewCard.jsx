
import { Star } from 'lucide-react'
import './ReviewCard.css'

export default function ReviewCard({ review }) {
  const formattedDate = review.createdAt
    ? new Date(review.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
    : ''

  const initials = review.username
    ? review.username.split(' ').map((n) => n[0]).join('').toUpperCase()
    : ''

  return (
    <div className="review-card">
      <div className="review-card-header">
        <span className="review-card-avatar-initials">{initials}</span>
        <div>
          <h4>{review.username}</h4>
          <span className="review-card-date">{formattedDate}</span>
        </div>
        <div className="review-card-stars">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={13} fill={i < review.rating ? 'currentColor' : 'none'} />
          ))}
        </div>
      </div>
      <p className="review-card-comment">{review.comment}</p>
    </div>
  )
}