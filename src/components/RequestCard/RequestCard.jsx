import { MapPin, Calendar, Wallet, MessageCircle, Pencil, Trash2 } from 'lucide-react'
import './RequestCard.css'

export default function RequestCard({ request, mode = 'artisan', onEdit, onDelete, onContact }) {
  return (
    <div className="request-card">
      <div className="request-card-header">
        <h3>{request.titre}</h3>
        <span className="badge badge-success">{request.metier}</span>
      </div>
      <p className="request-card-desc">{request.description}</p>
      <div className="request-card-meta">
        <span><MapPin size={14} /> {request.ville}</span>
        <span><Calendar size={14} /> {request.date}</span>
        {request.budget && <span><Wallet size={14} /> {request.budget}</span>}
      </div>
      <div className="request-card-actions">
        {mode === 'artisan' && (
          <button className="btn btn-primary btn-sm" onClick={onContact}>
            <MessageCircle size={15} /> Contacter
          </button>
        )}
        {mode === 'client' && (
          <>
            <button className="btn btn-outline btn-sm" onClick={onEdit}>
              <Pencil size={15} /> Modifier
            </button>
            <button className="btn btn-danger btn-sm" onClick={onDelete}>
              <Trash2 size={15} /> Supprimer
            </button>
          </>
        )}
      </div>
    </div>
  )
}
