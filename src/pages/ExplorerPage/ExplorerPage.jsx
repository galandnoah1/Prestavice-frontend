import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, RotateCcw, ChevronLeft, ChevronRight, SearchX } from 'lucide-react'
import ArtisanCard from '../../components/ArtisanCard/ArtisanCard.jsx'
import { artisans, villes, professions } from '../../data/mockData.js'
import './ExplorerPage.css'

const PAGE_SIZE = 6

export default function ExplorerPage() {
  const [searchParams] = useSearchParams()
  const [metier, setMetier] = useState(searchParams.get('metier') || '')
  const [ville, setVille] = useState(searchParams.get('ville') || '')
  const [noteMin, setNoteMin] = useState('')
  const [disponible, setDisponible] = useState(false)
  const [page, setPage] = useState(1)

  const results = useMemo(() => {
    return artisans.filter((a) => {
      if (metier && a.metier !== metier) return false
      if (ville && a.ville !== ville) return false
      if (noteMin && a.note < Number(noteMin)) return false
      if (disponible && !a.disponible) return false
      return true
    })
  }, [metier, ville, noteMin, disponible])

  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE))
  const pageResults = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const reset = () => {
    setMetier('')
    setVille('')
    setNoteMin('')
    setDisponible(false)
    setPage(1)
  }

  return (
    <div className="explorer-page">
      <div className="container">
        <div className="section-header explorer-header">
          <span className="section-eyebrow">Explorer</span>
          <h2>Trouvez l'artisan qu'il vous faut</h2>
          <p>{results.length} artisan{results.length > 1 ? 's' : ''} trouvé{results.length > 1 ? 's' : ''}</p>
        </div>

        <div className="explorer-filters card">
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
            <select className="form-select" value={noteMin} onChange={(e) => { setNoteMin(e.target.value); setPage(1) }}>
              <option value="">Note minimale</option>
              <option value="4.5">4.5 et plus</option>
              <option value="4">4 et plus</option>
              <option value="3">3 et plus</option>
            </select>
            <label className="explorer-check">
              <input type="checkbox" checked={disponible} onChange={(e) => { setDisponible(e.target.checked); setPage(1) }} />
              Disponible maintenant
            </label>
            <button className="btn btn-outline btn-sm" onClick={reset}>
              <RotateCcw size={15} /> Réinitialiser
            </button>
          </div>
        </div>

        {pageResults.length > 0 ? (
          <div className="artisan-grid explorer-grid">
            {pageResults.map((a) => <ArtisanCard key={a.id} artisan={a} showBio />)}
          </div>
        ) : (
          <div className="empty-state">
            <SearchX size={40} />
            <h3>Aucun artisan trouvé</h3>
            <p>Essayez d'élargir vos critères de recherche.</p>
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
