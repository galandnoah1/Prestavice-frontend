import { Link } from 'react-router-dom'
import { Hammer, Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="navbar-logo footer-logo">
            <img src="/images/logo.png" alt="" width={100} />
          </div>
          <p>Des professionnels qualifiés à votre service</p>
          <div className="footer-social">
            <a href="#" aria-label="Facebook"><Facebook size={18} /></a>
            <a href="#" aria-label="Instagram"><Instagram size={18} /></a>
            <a href="#" aria-label="Twitter"><Twitter size={18} /></a>
            <a href="#" aria-label="LinkedIn"><Linkedin size={18} /></a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Liens rapides</h4>
          <Link to="/">Accueil</Link>
          <Link to="/explorer">Explorer</Link>
          <Link to="/comment-ca-marche">Comment ça marche</Link>
          <Link to="/publier-demande">Publier une demande</Link>
        </div>

        <div className="footer-col">
          <h4>Légal</h4>
          <Link to="/mentions-legales">Mentions légales</Link>
          <Link to="/confidentialite">Politique de confidentialité</Link>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <span className="footer-contact-item"><Mail size={16} /> contact@prestavice.cm</span>
          <span className="footer-contact-item"><Phone size={16} /> +237 673 58 53 37</span>
          <span className="footer-contact-item"><MapPin size={16} /> Douala, Cameroun</span>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Prestavice. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
