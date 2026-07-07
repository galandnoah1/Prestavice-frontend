import { Link } from 'react-router-dom'
import { CompassIcon, ArrowLeft } from 'lucide-react'
import Navbar from '../../components/Navbar/Navbar.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import './NotFoundPage.css'

export default function NotFoundPage() {
  return (
    <>
      <Navbar />
      <div className="page-shell notfound-page">
        <CompassIcon size={48} />
        <h1>404</h1>
        <p>Cette page n'existe pas ou a été déplacée.</p>
        <Link to="/" className="btn btn-primary"><ArrowLeft size={16} /> Retour à l'accueil</Link>
      </div>
      <Footer />
    </>
  )
}
