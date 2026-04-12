import { useNavigate } from 'react-router-dom'
import './FeatureSection.css'

export default function FeatureSection() {
  const navigate = useNavigate()

  return (
    <section className="features">
      <div className="main-card">
        <span className="badge">Selección destacada</span>
        <h3>Un catálogo pensado para acompañar cada visita</h3>
        <p>
          Recorre la colección, vuelve a tus búsquedas y entra en las fichas principales desde una portada
          cuidada para sentirse como una biblioteca real.
        </p>
        <button type="button" onClick={() => navigate('/books')}>
          Ver catálogo
        </button>
      </div>

      <div className="side">
        <div className="card">
          <h4>Encuentra tu próxima lectura</h4>
          <p>Abre el catálogo completo y localiza títulos, ISBN o autores sin perder el hilo de tu consulta.</p>
          <button type="button" onClick={() => navigate('/books')}>
            Ir a libros
          </button>
        </div>

        <div className="card green">
          <h4>Ir a autores</h4>
          <p>
            Consulta perfiles, nacionalidades y obras relacionadas desde un espacio pensado para mantener
            cada ficha bien cuidada.
          </p>
          <button type="button" onClick={() => navigate('/authors')}>
            Ir a autores
          </button>
        </div>
      </div>
    </section>
  )
}
