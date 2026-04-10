import './FeatureSection.css'

export default function FeatureSection() {
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
          <button>Reservar ahora</button>
        </div>
      </div>
    </section>
  )
}
