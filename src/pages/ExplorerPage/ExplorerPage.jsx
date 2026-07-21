import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { SlidersHorizontal, RotateCcw, ChevronLeft, ChevronRight, SearchX, LocateFixed } from 'lucide-react'
import ArtisanCard from '../../components/ArtisanCard/ArtisanCard.jsx'
import { artisanService } from '../../services/artisanService.js'
import { cityService } from '../../services/cityService.js'
import { serviceService } from '../../services/serviceService.js'
import 'leaflet/dist/leaflet.css'
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

  const [proximityMode, setProximityMode] = useState(false)
  const [userPosition, setUserPosition] = useState(null)
  const [geoError, setGeoError] = useState('')
  const [geoLoading, setGeoLoading] = useState(false)

  useEffect(() => {
    cityService.getAll().then(setVilles).catch(() => { })
    serviceService.getAll().then(setProfessions).catch(() => { })
  }, [])

  useEffect(() => {
    if (proximityMode && userPosition) return

    setLoading(true)
    setError('')

    const fetchResults = metier && ville
      ? artisanService.getByCityAndService(ville, metier)
      : artisanService.getAll()

    fetchResults
      .then(setResults)
      .catch(() => setError(''))
      .finally(() => setLoading(false))
  }, [metier, ville, proximityMode, userPosition])

  const handleUseLocation = () => {
    setGeoError('')
    setGeoLoading(true)

    if (!navigator.geolocation) {
      setGeoError('Géolocalisation non supportée par ce navigateur')
      setGeoLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setUserPosition({ lat: latitude, lng: longitude })
        setProximityMode(true)
        setLoading(true)

        artisanService.getNearby(latitude, longitude, 20)
          .then(setResults)
          .catch(() => setError('Impossible de charger les artisans à proximité'))
          .finally(() => {
            setLoading(false)
            setGeoLoading(false)
          })
      },
      () => {
        setGeoError('Impossible de récupérer votre position. Vérifiez les autorisations de votre navigateur.')
        setGeoLoading(false)
      }
    )
  }

  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE))
  const pageResults = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const reset = () => {
    setMetier('')
    setVille('')
    setProximityMode(false)
    setUserPosition(null)
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
            <select className="form-select" value={metier} disabled={proximityMode} onChange={(e) => { setMetier(e.target.value); setPage(1) }}>
              <option value="">Tous les métiers</option>
              {professions.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
            <select className="form-select" value={ville} disabled={proximityMode} onChange={(e) => { setVille(e.target.value); setPage(1) }}>
              <option value="">Toutes les villes</option>
              {villes.map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
            <button type="button" className="btn btn-primary btn-sm" onClick={handleUseLocation} disabled={geoLoading}>
              <LocateFixed size={15} /> {geoLoading ? 'Localisation...' : 'Près de moi'}
            </button>
            <button className="btn btn-outline btn-sm" onClick={reset}>
              <RotateCcw size={15} /> Réinitialiser
            </button>
          </div>
          {(metier && !ville) || (!metier && ville) ? (
            <p className="form-help mt-8">Sélectionnez un métier ET une ville pour filtrer, ou aucun des deux pour voir tous les artisans.</p>
          ) : null}
          {geoError && <p className="auth-error mt-8">{geoError}</p>}
        </div>

        {proximityMode && userPosition && (
          <div className="explorer-map card mt-16">
            <MapContainer center={[userPosition.lat, userPosition.lng]} zoom={12} style={{ height: '360px', width: '100%', borderRadius: 'var(--radius-lg)' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap contributors'
              />
              <Marker position={[userPosition.lat, userPosition.lng]}>
                <Popup>Votre position</Popup>
              </Marker>
              {results.map((a) => (
                a.latitude && a.longitude ? (
                  <Marker key={a.id} position={[a.latitude, a.longitude]}>
                    <Popup>
                      {a.firstname} {a.lastname} — {a.service}
                      {a.distanceKm != null && <><br />{a.distanceKm.toFixed(1)} km</>}
                    </Popup>
                  </Marker>
                ) : null
              ))}
            </MapContainer>
          </div>
        )}

        {error && <p className="auth-error mt-16">{error}</p>}

        {loading ? (
          <p>Chargement...</p>
        ) : pageResults.length > 0 ? (
          <div className="artisan-grid explorer-grid mt-16">
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