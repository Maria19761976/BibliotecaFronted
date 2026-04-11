import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Hero.css'

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const categories = ['Ciencia', 'Literatura', 'Historia', 'Artes', 'Filosofía']

  const handleSubmit = (event) => {
    event.preventDefault()
    const query = searchQuery.trim()
    if (query) {
      navigate(`/books?q=${encodeURIComponent(query)}`)
    } else {
      navigate('/books')
    }
  }

  const handleCategoryClick = (category) => {
    navigate(`/books?q=${encodeURIComponent(category)}`)
  }

  return (
    <section className="hero">
      <h2>Tu biblioteca digital personal.</h2>

      <p>
        Explora miles de volúmenes, investigaciones y manuscritos históricos.
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

      <div className="categories">
        {categories.map((c) => (
          <button
            type="button"
            key={c}
            className="category-pill"
            onClick={() => handleCategoryClick(c)}
          >
            {c}
          </button>
        ))}
      </div>
    </section>
  )
}
