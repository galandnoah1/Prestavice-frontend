import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, RotateCcw, ChevronLeft, ChevronRight, SearchX } from 'lucide-react'
import ArtisanCard from '../../components/ArtisanCard/ArtisanCard.jsx'
import { artisanService } from '../../services/artisanService.js'
import { cityService } from '../../services/cityService.js'
import { serviceService } from '../../services/serviceService.js'
import './ExplorerPage.css'

const PAGE_SIZE = 6

export default function ExplorerPage() {
  const [searchParams] = useSearchParams()
  const [metier, setMetier] = useState(searchParams.get('metier') || '')
  const [ville, setVille] = useState(searchParams.get('ville') || '')
  const [page, setPage] = useState(1)

  const [villes, setVilles] = useState([])
  const [professions, setProfessions] = useState([])
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    cityService.getAll().then(setVilles).catch(() => { })
    serviceService.getAll().then(setProfessions).catch(() => { })
  }, [])

  useEffect(() => {
    setLoading(true)
    setError('')

    const fetchResults = metier && ville
      ? artisanService.getByCityAndService(ville, metier)
      : artisanService.getAll()

    fetchResults
      .then(setResults)
      .catch(() => setError('Impossible de charger les artisans'))
      .finally(() => setLoading(false))
  }, [metier, ville])

  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE))
  const pageResults = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const reset = () => {
    setMetier('')
    setVille('')
    setPage(1)
  }

  return (
    <div className="explorer-page">
      <div className="container">
        <div className="section-header explorer-header">
          <span className="section-eyebrow">Explorer</span>
          <h2>Trouvez le prestataire qu'il vous faut</h2>
          <p>{results.length} artisan{results.length > 1 ? 's' : ''} trouvé{results.length > 1 ? 's' : ''}</p>
        </div>

        <div className="explorer-filters ">
          <div className="explorer-filters-title"><SlidersHorizontal size={16} /> Filtres</div>
          <div className="explorer-filters-grid">
            <select className="form-select" value={metier} onChange={(e) => { setMetier(e.target.value); setPage(1) }}>
              <option value="">Tous les métiers</option>
              {professions.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
            <select className="form-select" value={ville} onChange={(e) => { setVille(e.target.value); setPage(1) }}>
              <option value="">Toutes les villes</option>
              {villes.map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
            <button className="btn btn-outline" onClick={reset}>
              <RotateCcw size={15} /> Réinitialiser
            </button>
          </div>
          {(metier && !ville) || (!metier && ville) ? (
            <p className="form-help mt-8">Sélectionnez un métier et une ville pour filtrer, ou aucun des deux pour voir tous les prestataires.</p>
          ) : null}
        </div>

        {error && <p className="auth-error">{error}</p>}

        {loading ? (
          <p>Chargement...</p>
        ) : pageResults.length > 0 ? (
          <div className="artisan-grid explorer-grid">
            {pageResults.map((a) => <ArtisanCard key={a.id} artisan={a} showBio />)}
          </div>
        ) : (
          <div className="empty-state">
            <SearchX size={40} />
            <h3>Aucun prestataire trouvé</h3>
            <p>Nous sommes en pleine campagne de communication pour attirer davantage de prestataire.</p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="pagination">
            <button className="btn btn-outline btn-sm" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
              <ChevronLeft size={15} />
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                className={`pagination-page ${page === i + 1 ? 'pagination-page-active' : ''}`}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button className="btn btn-outline btn-sm" disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>
              <ChevronRight size={15} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}