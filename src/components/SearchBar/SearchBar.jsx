
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, MapPin } from 'lucide-react'
import { cityService } from '../../services/cityService.js'
import { serviceService } from '../../services/serviceService.js'
import './SearchBar.css'

export default function SearchBar({ compact = false }) {
  const [metier, setMetier] = useState('')
  const [ville, setVille] = useState('')
  const [professions, setProfessions] = useState([])
  const [villes, setVilles] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    serviceService.getAll().then(setProfessions).catch(() => { })
    cityService.getAll().then(setVilles).catch(() => { })
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (metier) params.set('metier', metier)
    if (ville) params.set('ville', ville)
    navigate(`/explorer?${params.toString()}`)
  }

  return (
    <form className={`search-bar ${compact ? 'search-bar-compact' : ''}`} onSubmit={handleSearch}>
      <div className="search-field">
        <Search size={18} />
        <select value={metier} onChange={(e) => setMetier(e.target.value)}>
          <option value="">Quelle profession ?</option>
          {professions.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>
      <div className="search-divider" />
      <div className="search-field">
        <MapPin size={18} />
        <select value={ville} onChange={(e) => setVille(e.target.value)}>
          <option value="">Quelle ville ?</option>
          {villes.map((v) => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn btn-primary search-btn">
        <Search size={16} /> Rechercher
      </button>
    </form>
  )
}