import { useNavigate } from 'react-router-dom'
import './FeatureSection.css'

export default function FeatureSection() {
  const navigate = useNavigate()

  return (
    <section className="features">
      <div className="main-card">
        <span className="badge">DEMO LISTA</span>
        <h3>Una biblioteca conectada al backend y pensada para mostrar flujo real</h3>
        <p>
          La Home funciona como portada útil: te lleva al catálogo, a la gestión de autores y a las acciones que
          sí están disponibles hoy.
        </p>
        <button type="button" onClick={() => navigate('/books')}>
          Ver catálogo
        </button>
      </div>

      <div className="side">
        <div className="card">
          <h4>Búsqueda rápida</h4>
          <p>Filtra libros desde la portada y entra directamente al listado con la búsqueda aplicada.</p>
          <button type="button" onClick={() => navigate('/books')}>
            Ir a libros
          </button>
        </div>

        <div className="card green">
          <h4>Gestión de autores</h4>
          <p>Consulta, crea y edita autores desde una interfaz clara y preparada para la entrega.</p>
          <button type="button" onClick={() => navigate('/authors')}>
            Ir a autores
          </button>
        </div>
      </div>
    </section>
  )
}
