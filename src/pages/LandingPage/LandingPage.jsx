
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Search, UserCheck, MessageCircle, Star, Zap, ShieldCheck,
  MessagesSquare, FileText, MapPinned, ArrowRight,
  Wrench, Hammer, Paintbrush, Home, Snowflake, Car, Sparkles, Leaf, Monitor,
} from 'lucide-react'
import SearchBar from '../../components/SearchBar/SearchBar.jsx'
import CategoryCard from '../../components/CategoryCard/CategoryCard.jsx'
import ArtisanCard from '../../components/ArtisanCard/ArtisanCard.jsx'
import { artisanService } from '../../services/artisanService.js'
import { serviceService } from '../../services/serviceService.js'
import { temoignages } from '../../data/mockData.js'
import './LandingPage.css'

const serviceIcons = {
  'Plomberie': Wrench,
  'Électricité': Zap,
  'Menuiserie': Hammer,
  'Peinture': Paintbrush,
  'Maçonnerie': Home,
  'Climatisation': Snowflake,
  'Mécanique auto': Car,
  'Ménage à domicile': Sparkles,
  'Jardinage': Leaf,
  'Informatique / Dépannage PC': Monitor,
}

const steps = [
  { icon: Search, title: 'Rechercher un prestataire', text: 'Filtrez par métier et par ville pour trouver le bon profil en quelques secondes.' },
  { icon: UserCheck, title: 'Consulter son profil', text: 'Réalisations, avis clients et informations vérifiées, tout est réuni au même endroit.' },
  { icon: MessageCircle, title: 'Le contacter', text: 'Échangez directement par WhatsApp, téléphone ou e-mail, sans intermédiaire.' },
  { icon: Star, title: 'Noter la prestation', text: 'Partagez votre expérience pour aider les prochains clients à bien choisir.' },
]

const avantages = [
  { icon: Zap, title: 'Recherche rapide', text: 'Trouvez un prestataire disponible en quelques clics, par métier et par ville.' },
  { icon: ShieldCheck, title: 'Prestataires vérifiés', text: 'Des profils contrôlés pour vous garantir des prestataires sérieux.' },
  { icon: Star, title: 'Avis clients', text: 'Des retours authentiques laissés par de vrais clients.' },
  { icon: MessagesSquare, title: 'Contact immédiat', text: 'Joignez un prestataire directement, sans attendre de validation.' },
  { icon: FileText, title: 'Publication de demandes', text: 'Décrivez votre besoin et laissez les prestataires venir à vous.' },
  { icon: MapPinned, title: 'Plusieurs villes', text: 'Disponible à Douala, Yaoundé et dans de nombreuses autres villes.' },
]

export default function LandingPage() {
  const [categories, setCategories] = useState([])
  const [recentArtisans, setRecentArtisans] = useState([])
  const [proCount, setProCount] = useState(0)
  const [villeCount, setVilleCount] = useState(0)

  useEffect(() => {
    Promise.all([serviceService.getAll(), artisanService.getAll()])
      .then(([services, artisans]) => {
        const counts = artisans.reduce((acc, a) => {
          acc[a.service] = (acc[a.service] || 0) + 1
          return acc
        }, {})

        setCategories(
          services.map((nom) => ({
            nom,
            icon: serviceIcons[nom] || Wrench,
            count: counts[nom] || 0,
          }))
        )

        setProCount(artisans.length)
        setVilleCount(new Set(artisans.map((a) => a.city)).size)

        const sorted = [...artisans].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
        setRecentArtisans(sorted.slice(0, 4))
      })
      .catch(() => { })
  }, [])

  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-text">
            <h1>Des professionnels qualifiés à votre service.</h1>
            <p>
              Prestavice connecte les clients aux prestataires de service qualifiés de leur ville : plombiers,
              électriciens, couturiers, informaticiens et bien d'autres, disponibles en quelques clics.
            </p>
            <div className="hero-actions">
              <Link to="/explorer" className="btn btn-primary">Trouver un prestataire <ArrowRight size={16} /></Link>
              <Link to="/inscription" className="btn btn-outline">Devenir prestataire</Link>
            </div>
            <div className="hero-stats">
              <div><strong>{proCount}+</strong><span>Pros actifs</span></div>
              <div><strong>{villeCount}</strong><span>Villes couvertes</span></div>
              <div><strong>4,7/5</strong><span>Note moyenne</span></div>
            </div>
          </div>
          <div className="hero-image">
            <img src="/images/hero.png" alt="Illustration Prestavice" />
          </div>
        </div>
      </section>

      <section className="search-section">
        <div className="container">
          <SearchBar />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Métiers populaires</span>
            <h2>Explorez les catégories les plus demandées</h2>

          </div>
          <div className="category-grid">
            {categories.map((cat) => (
              <CategoryCard key={cat.nom} category={cat} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt" id="comment-ca-marche">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Simple et rapide</span>
            <h2>Comment ça marche</h2>
            <p>Quatre étapes suffisent pour trouver et contacter le prestataire qu'il vous faut.</p>
          </div>
          <div className="steps-grid">
            {steps.map((step, i) => (
              <div className="step-card" key={step.title}>
                <span className="step-number">{String(i + 1).padStart(2, '0')}</span>
                <span className="step-icon"><step.icon size={20} /></span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Pourquoi Prestavice</span>
            <h2>Pourquoi choisir notre plateforme</h2>
            <p>Une expérience pensée pour la confiance, la rapidité et la simplicité.</p>
          </div>
          <div className="avantages-grid">
            {avantages.map((a) => (
              <div className="avantage-card" key={a.title}>
                <span className="avantage-icon"><a.icon size={20} /></span>
                <div>
                  <h3>{a.title}</h3>
                  <p>{a.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Nouveaux talents</span>
            <h2>Derniers prestataires inscrits</h2>
            <p>Découvrez les profils qui viennent de rejoindre Prestavice.</p>
          </div>
          <div className="artisan-grid">
            {recentArtisans.map((a) => (
              <ArtisanCard key={a.id} artisan={a} />
            ))}
          </div>
          <div className="text-center mt-32">
            <Link to="/explorer" className="btn btn-outline">Voir tous les professionnels <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Témoignages</span>
            <h2>Ce que disent nos utilisateurs</h2>
          </div>
          <div className="testimonial-grid">
            {temoignages.map((t) => (
              <div className="testimonial-card" key={t.id}>
                <div className="testimonial-stars">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <p>"{t.texte}"</p>
                <div className="testimonial-author">
                  <img src={t.photo} alt={t.nom} />
                  <div>
                    <strong>{t.nom}</strong>
                    <span>{t.ville}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container cta-band-inner">
          <div>
            <h2>Vous êtes un prestataire ?</h2>
            <p>Rejoignez Prestavice et recevez des demandes de clients près de chez vous.</p>
          </div>
          <Link to="/inscription" className="btn btn-primary">Créer mon profil pro <ArrowRight size={16} /></Link>
        </div>
      </section>
    </>
  )
}