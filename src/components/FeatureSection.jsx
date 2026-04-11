import { useNavigate } from 'react-router-dom'
import './FeatureSection.css'

export default function FeatureSection() {
  const navigate = useNavigate()

  return (
    <section className="features">
      <div className="main-card">
        <span className="badge">COLECCIÓN ESPECIAL</span>
        <h3>Manuscritos de la Era de la Ilustración</h3>
      </div>

      <div className="side">
        <div className="card">
          <h4>Nuevas Adquisiciones</h4>
          <p>Descubre los últimos títulos añadidos.</p>
        </div>

        <div className="card green">
          <h4>Reserva una Sala de Estudio</h4>
          <p>Busca libros y prepara tu próxima visita.</p>
          <button type="button" onClick={() => navigate('/books')}>
            Reservar ahora
          </button>
        </div>
      </div>
    </section>
  )
}
