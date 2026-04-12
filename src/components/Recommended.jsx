import { Link } from 'react-router-dom'
import './Recommended.css'

export default function Recommended() {
  const quickActions = [
    {
      title: 'Explorar libros',
      description: 'Recorre la colección completa y entra a cada ficha con una vista clara y ordenada.',
      to: '/books',
      cta: 'Abrir libros',
    },
    {
      title: 'Añadir un libro',
      description: 'Incorpora nuevas lecturas a la biblioteca y relaciónalas con el autor correspondiente.',
      to: '/books/new',
      cta: 'Crear libro',
    },
    {
      title: 'Gestionar autores',
      description: 'Consulta perfiles, revisa sus obras y mantén al día la información de cada autor.',
      to: '/authors',
      cta: 'Abrir autores',
    },
  ]

  return (
    <section className="recommended">
      <div className="header">
        <div className="header-copy">
          <p className="section-kicker">Atajos útiles</p>
          <h3>Accesos rápidos</h3>
          <p>Mueve lo importante sin rodeos y entra en las secciones que más se consultan.</p>
        </div>
        <Link to="/books" className="see-all">
          Abrir catálogo
        </Link>
      </div>

      <div className="list">
        {quickActions.map((action) => (
          <Link key={action.title} to={action.to} className="quick-card">
            <h4>{action.title}</h4>
            <p>{action.description}</p>
            <span className="quick-link">{action.cta}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
