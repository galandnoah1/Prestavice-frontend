
import { MapPin, Calendar, MessageCircle, Pencil, Trash2, CheckCircle, Check } from 'lucide-react'
import './RequestCard.css'

export default function RequestCard({ request, mode = 'artisan', onEdit, onDelete, onContact, onComplete, onDashBoard = false }) {
  const formattedDate = request.createdAt
    ? new Date(request.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
    : ''

  return (
    <div className="request-card">
      <div className="request-card-header">
        <h3>{request.title}</h3>
        <span className={`badge ${request.isActive ? 'badge-success' : 'badge-muted'}`}>
          {request.isActive ? request.service : 'Terminée'}
        </span>
      </div>
      <p className="request-card-desc">{request.description}</p>
      <div className="request-card-meta">
        <span><MapPin size={14} /> {request.city}</span>
        <span><Calendar size={14} /> {formattedDate}</span>
      </div>
      <div className="request-card-actions">
        {mode === 'artisan' && (
          <button className="btn btn-primary btn-sm" onClick={onContact}>
            <MessageCircle size={15} /> Contacter
          </button>
        )}
        {mode === 'client' && (
          <>
            {request.isActive && !onDashBoard && (
              <button className="btn btn-success btn-sm" onClick={onComplete}>
                <Check size={15} /> Terminée
              </button>
            )}
            {!onDashBoard && (<button className="btn btn-outline btn-sm" onClick={onEdit}>
              <Pencil size={15} /> Modifier
            </button>)}
            {!onDashBoard && (<button className="btn btn-danger btn-sm" onClick={onDelete}>
              <Trash2 size={15} /> Supprimer
            </button>)}
          </>
        )}
      </div>
    </div>
  )
}