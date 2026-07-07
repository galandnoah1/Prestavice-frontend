import { useState } from 'react'
import Gallery from '../../components/Gallery/Gallery.jsx'
import { galerieArtisan } from '../../data/mockData.js'

export default function ArtisanRealisations() {
  const [images, setImages] = useState(galerieArtisan)

  const handleAdd = () => {
    setImages((imgs) => [...imgs, 'https://placehold.co/400x400'])
  }

  const handleRemove = (index) => {
    setImages((imgs) => imgs.filter((_, i) => i !== index))
  }

  return (
    <div>
      <div className="dashboard-header">
        <h1>Mes réalisations</h1>
        <p>Ajoutez des photos de vos travaux pour convaincre plus facilement les clients.</p>
      </div>

      <Gallery images={images} editable onAdd={handleAdd} onRemove={handleRemove} />
    </div>
  )
}
