import { Link } from 'react-router-dom'
import './Recommended.css'

export default function Recommended() {
  const quickActions = [
    {
      title: 'Explorar libros',
      description: 'Abre el catálogo completo y revisa los resultados filtrados o el listado general.',
      to: '/books',
      cta: 'Abrir libros',
    },
    {
      title: 'Añadir un libro',
      description: 'Accede al formulario para crear un nuevo registro y asignarle un autor existente.',
      to: '/books/new',
      cta: 'Crear libro',
    },
    {
      title: 'Gestionar autores',
      description: 'Consulta autores, actualiza sus fichas o crea uno nuevo desde el panel correspondiente.',
      to: '/authors',
      cta: 'Ver autores',
    },
  ]

  return (
    <section className="recommended">
      <div className="header">
        <h3>Accesos rápidos para la demo</h3>
        <Link to="/books" className="see-all">
          Abrir catálogo
        </Link>
      </div>

      <div className="list">
        {quickActions.map((action) => (
          <Link key={action.title} to={action.to} className="quick-card">
            <span className="quick-label">Acción</span>
            <h4>{action.title}</h4>
            <p>{action.description}</p>
            <span className="quick-link">{action.cta}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
