import './LegalPage.css'

export default function LegalPage({ title }) {
  return (
    <div className="section legal-page">
      <div className="container container-narrow">
        <h2>{title}</h2>
        <p className="text-muted mt-16">Dernière mise à jour : 1er juillet 2026</p>

        <div className="legal-content">
          <h3>1. Objet</h3>
          <p>Prestavice est une plateforme de mise en relation entre clients et artisans au Cameroun. Ce document a pour objet d'informer les utilisateurs sur les conditions d'utilisation du service et le traitement de leurs données.</p>

          <h3>2. Utilisation du service</h3>
          <p>L'utilisation de Prestavice implique l'acceptation pleine et entière des présentes conditions. La plateforme met en relation les parties mais n'intervient pas directement dans l'exécution des prestations.</p>

          <h3>3. Données personnelles</h3>
          <p>Les informations collectées lors de l'inscription sont utilisées uniquement dans le cadre du fonctionnement de la plateforme et ne sont jamais partagées avec des tiers sans consentement.</p>

          <h3>4. Contact</h3>
          <p>Pour toute question relative à ce document, contactez-nous à contact@prestavice.cm.</p>
        </div>
      </div>
    </div>
  )
}
