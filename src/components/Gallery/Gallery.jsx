import { Trash2, Plus, ImagePlus } from 'lucide-react'
import './Gallery.css'

export default function Gallery({ images, editable = false, onAdd, onRemove }) {
  return (
    <div className="gallery-grid">
      {images.map((src, i) => (
        <div className="gallery-item" key={i}>
          <img src={src} alt={`Réalisation ${i + 1}`} />
          {editable && (
            <button className="gallery-remove" onClick={() => onRemove?.(i)} aria-label="Supprimer">
              <Trash2 size={15} />
            </button>
          )}
        </div>
      ))}
      {editable && (
        <button className="gallery-add" onClick={onAdd}>
          <ImagePlus size={22} />
          <span>Ajouter une photo</span>
        </button>
      )}
      {!editable && images.length === 0 && (
        <div className="empty-state">
          <ImagePlus size={36} />
          <h3>Aucune réalisation</h3>
          <p>Cet artisan n'a pas encore ajouté de photos.</p>
        </div>
      )}
    </div>
  )
}
