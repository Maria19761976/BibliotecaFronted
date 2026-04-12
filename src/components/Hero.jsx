import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Hero.css'

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    const query = searchQuery.trim()
    if (query) {
      navigate(`/books?q=${encodeURIComponent(query)}`)
    } else {
      navigate('/books')
    }
  }

  return (
    <section className="hero">
      <h2>Consulta y gestiona tu catálogo con rapidez.</h2>

      <p>
        Busca libros por título, autor o ISBN y accede al catálogo para editar, crear y revisar registros
        reales de la demo.
      </p>

      <form className="hero-search" onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Busca por título, autor o ISBN..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>
    </section>
  )
}
