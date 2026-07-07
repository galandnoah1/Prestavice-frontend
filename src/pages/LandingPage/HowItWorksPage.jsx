import { Link } from 'react-router-dom'
import { Search, UserCheck, MessageCircle, Star, ArrowRight } from 'lucide-react'
import './LegalPage.css'

const steps = [
  { icon: Search, title: 'Rechercher un artisan', text: "Utilisez la barre de recherche pour filtrer par métier et par ville, et découvrez la liste des artisans disponibles." },
  { icon: UserCheck, title: 'Consulter son profil', text: "Chaque profil présente le parcours de l'artisan, ses réalisations en photos et les avis laissés par ses précédents clients." },
  { icon: MessageCircle, title: 'Le contacter', text: "Entrez en contact directement par WhatsApp, appel téléphonique ou e-mail, sans passer par un intermédiaire." },
  { icon: Star, title: 'Noter la prestation', text: "Une fois la prestation terminée, laissez une note et un commentaire pour aider les futurs clients à choisir." },
]

export default function HowItWorksPage() {
  return (
    <div className="section legal-page">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Guide</span>
          <h2>Comment fonctionne Prestavice</h2>
          <p>Une plateforme pensée pour rendre la mise en relation simple, rapide et fiable.</p>
        </div>

        <div className="legal-steps">
          {steps.map((step, i) => (
            <div className="legal-step" key={step.title}>
              <span className="step-icon"><step.icon size={20} /></span>
              <div>
                <h3>{String(i + 1).padStart(2, '0')} — {step.title}</h3>
                <p>{step.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-32">
          <Link to="/explorer" className="btn btn-primary">Commencer ma recherche <ArrowRight size={16} /></Link>
        </div>
      </div>
    </div>
  )
}
