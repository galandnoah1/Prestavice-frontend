
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Star, MapPin, Phone, Mail, MessageCircle, Flag, Images, MessagesSquare } from 'lucide-react'
import ReviewCard from '../../components/ReviewCard/ReviewCard.jsx'
import { artisanService } from '../../services/artisanService.js'
import { avisService } from '../../services/avisService.js'
import { useAuth } from '../../context/AuthContext.jsx'
import './ArtisanPage.css'

export default function ArtisanPage() {
  const { id } = useParams()
  const { user } = useAuth()

  const [artisan, setArtisan] = useState(null)
  const [avis, setAvis] = useState([])
  const [averageRating, setAverageRating] = useState(null)
  const [loading, setLoading] = useState(true)

  const [rating, setRating] = useState(0)
  const [commentaire, setCommentaire] = useState('')
  const [envoye, setEnvoye] = useState(false)
  const [avisError, setAvisError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    Promise.all([
      artisanService.getById(id),
      avisService.getByArtisan(id),
      avisService.getAverageRating(id),
    ])
      .then(([artisanData, avisData, avgData]) => {
        setArtisan(artisanData)
        setAvis(avisData)
        setAverageRating(avgData)
      })
      .finally(() => setLoading(false))
  }, [id])

  const handleSubmitAvis = async (e) => {
    e.preventDefault()
    setAvisError('')
    setSubmitting(true)
    try {
      await avisService.create({
        artisanId: id,
        userId: user.id,
        rating,
        comment: commentaire,
      })
      setEnvoye(true)
      const updatedAvis = await avisService.getByArtisan(id)
      setAvis(updatedAvis)
    } catch (err) {
      setAvisError(err.response?.data?.responseMessage || 'Impossible de publier votre avis')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <p style={{ width: "200px", margin: "auto", }}>Chargement...</p>
  if (!artisan) {
    return (
      <div className="section">
        <div className="container container-narrow text-center">
          <div className="empty-state">
            <h3>Connectez-vous pour voir ce profil</h3>
            <p>Vous devez avoir un compte Prestavice pour consulter les informations de ce prestataire.</p>
            <div className="flex gap-8  mt-16" style={{ display: "flex", justifyContent: "center" }}>
              <Link to="/connexion" className="btn btn-primary btn-sm">Se connecter</Link>
              <Link to="/inscription" className="btn btn-outline btn-sm">Créer un compte</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const fullName = `${artisan.firstname} ${artisan.lastname}`
  const initials = `${artisan.firstname?.[0] ?? ''}${artisan.lastname?.[0] ?? ''}`.toUpperCase()
  const whatsappLink = `https://wa.me/${artisan.phoneNumber?.replace(/\s|\+/g, '')}`

  return (
    <div className="artisan-page">
      <div className="container artisan-page-container">
        <div className="artisan-page-main">
          <div className="artisan-page-header">
            <span className="artisan-card-avatar-initials">{initials}</span>
            <div className="artisan-page-headinfo">
              <h1>{fullName}</h1>
              <p className="artisan-page-metier">{artisan.service}</p>
              <div className="artisan-page-meta">
                <span><MapPin size={14} /> {artisan.city}</span>
                <span>
                  <Star size={14} fill="currentColor" className="rating-star" />
                  {averageRating !== null ? averageRating.toFixed(1) : '—'} ({avis.length} avis)
                </span>
              </div>
              <p className="artisan-page-bio">{artisan.bio}</p>

              <div className="contacts">
                <p><Phone size={14} /> {artisan.phoneNumber}</p>
                <p><Mail size={14} /> {artisan.email}</p>
              </div>
            </div>
          </div>

          <div className="artisan-page-actions">
            <a href={whatsappLink} target="_blank" rel="noreferrer" className="btn btn-primary">
              <MessageCircle size={16} /> Contacter sur WhatsApp
            </a>
            <a href={`tel:${artisan.phoneNumber}`} className="btn btn-outline">
              <Phone size={16} /> Appeler
            </a>
            <a href={`mailto:${artisan.email}`} className="btn btn-outline">
              <Mail size={16} /> Envoyer un e-mail
            </a>
            <button className="btn btn-ghost artisan-page-report" disabled>
              <Flag size={16} /> Signaler cet artisan
            </button>
          </div>

          <section className="artisan-page-section">
            <h2><Images size={18} /> Réalisations</h2>
            <p className="text-muted">Bientôt disponible.</p>
          </section>

          <section className="artisan-page-section">
            <h2><MessagesSquare size={18} /> Avis clients ({avis.length})</h2>

            {user ? (
              !envoye ? (
                <form className="review-form card" onSubmit={handleSubmitAvis}>
                  <p className="form-label">Votre note</p>
                  <div className="review-form-stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <button type="button" key={i} onClick={() => setRating(i + 1)}>
                        <Star size={22} fill={i < rating ? 'currentColor' : 'none'} />
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
                  {avisError && <p className="auth-error">{avisError}</p>}
                  <button type="submit" className="btn btn-primary" disabled={rating === 0 || submitting}>
                    {submitting ? 'Publication...' : 'Publier mon avis'}
                  </button>
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
              {avis.map((a) => <ReviewCard key={a.id} review={a} />)}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}