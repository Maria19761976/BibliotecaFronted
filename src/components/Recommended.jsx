import { Link } from 'react-router-dom'
import './Recommended.css'

export default function Recommended() {
  const books = [
    'Estructuras de la Realidad',
    'El Origen del Comercio',
    'Visiones Periféricas',
    'Ecos del Invierno',
    'Espacio Urbano'
  ]

  return (
    <section className="recommended">
      <div className="header">
        <h3>Lecturas recomendadas</h3>
        <Link to="/books" className="see-all">
          Ver todo
        </Link>
      </div>

      <div className="list">
        {books.map((b, i) => (
          <div key={i} className="book">
            <div className="cover" />
            <p>{b}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
