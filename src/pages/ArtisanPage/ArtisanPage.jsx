import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  Star, MapPin, Phone, Mail, MessageCircle, Flag, Images, MessagesSquare,
} from 'lucide-react'
import Gallery from '../../components/Gallery/Gallery.jsx'
import ReviewCard from '../../components/ReviewCard/ReviewCard.jsx'
import { artisans, galerieArtisan, avisArtisan } from '../../data/mockData.js'
import { useAuth } from '../../context/AuthContext.jsx'
import './ArtisanPage.css'

export default function ArtisanPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const artisan = artisans.find((a) => String(a.id) === id) || artisans[0]
  const [note, setNote] = useState(0)
  const [commentaire, setCommentaire] = useState('')
  const [envoye, setEnvoye] = useState(false)

  const handleSubmitAvis = (e) => {
    e.preventDefault()
    setEnvoye(true)
  }

  const whatsappLink = `https://wa.me/${artisan.telephone.replace(/\s|\+/g, '')}`

  return (
    <div className="artisan-page">
      <div className="artisan-page-cover">
        <img src={artisan.cover} alt="" />
      </div>

      <div className="container artisan-page-container">
        <div className="artisan-page-main">
          <div className="artisan-page-header card">
            <img src={artisan.photo} alt={artisan.nomProfessionnel} className="artisan-page-avatar" />
            <div className="artisan-page-headinfo">
              <h1>{artisan.nomProfessionnel}</h1>
              <p className="artisan-page-metier">{artisan.metier}</p>
              <div className="artisan-page-meta">
                <span><MapPin size={14} /> {artisan.ville}</span>
                <span><Star size={14} fill="currentColor" className="rating-star" /> {artisan.note} ({artisan.avis} avis)</span>
                {artisan.disponible && <span className="badge badge-success">Disponible</span>}
              </div>
              <p className="artisan-page-bio">{artisan.bio}</p>
            </div>
          </div>

          <div className="artisan-page-actions">
            <a href={whatsappLink} target="_blank" rel="noreferrer" className="btn btn-primary">
              <MessageCircle size={16} /> Contacter sur WhatsApp
            </a>
            <a href={`tel:${artisan.telephone}`} className="btn btn-outline">
              <Phone size={16} /> Appeler
            </a>
            <a href={`mailto:${artisan.email}`} className="btn btn-outline">
              <Mail size={16} /> Envoyer un e-mail
            </a>
            <button className="btn btn-ghost artisan-page-report">
              <Flag size={16} /> Signaler cet artisan
            </button>
          </div>

          <section className="artisan-page-section">
            <h2><Images size={18} /> Réalisations</h2>
            <Gallery images={galerieArtisan} />
          </section>

          <section className="artisan-page-section">
            <h2><MessagesSquare size={18} /> Avis clients ({avisArtisan.length})</h2>

            {user ? (
              !envoye ? (
                <form className="review-form card" onSubmit={handleSubmitAvis}>
                  <p className="form-label">Votre note</p>
                  <div className="review-form-stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <button type="button" key={i} onClick={() => setNote(i + 1)}>
                        <Star size={22} fill={i < note ? 'currentColor' : 'none'} />
                      </button>
                    ))}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Votre commentaire</label>
                    <textarea
                      className="form-textarea"
                      placeholder="Partagez votre expérience avec cet artisan..."
                      value={commentaire}
                      onChange={(e) => setCommentaire(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary" disabled={note === 0}>Publier mon avis</button>
                </form>
              ) : (
                <div className="review-form card text-center">
                  <p>Merci, votre avis a bien été enregistré !</p>
                </div>
              )
            ) : (
              <div className="review-form card text-center">
                <p>
                  <Link to="/connexion" className="artisan-page-link">Connectez-vous</Link> pour laisser une note et un commentaire.
                </p>
              </div>
            )}

            <div className="review-list mt-24">
              {avisArtisan.map((r) => <ReviewCard key={r.id} review={r} />)}
            </div>
          </section>
        </div>

        <aside className="artisan-page-side">
          <div className="card artisan-page-contact-card">
            <h3>Coordonnées</h3>
            <p><Phone size={14} /> {artisan.telephone}</p>
            <p><Mail size={14} /> {artisan.email}</p>
            <p><MapPin size={14} /> {artisan.ville}</p>
          </div>
        </aside>
      </div>
    </div>
  )
}
