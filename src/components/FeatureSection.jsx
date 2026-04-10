import './FeatureSection.css'

export default function FeatureSection() {
  return (
    <section className="features">
      <div className="main-card">
        <span className="badge">COLECCION ESPECIAL</span>
        <h3>Manuscritos de la Era de la Ilustracion</h3>
      </div>

      <div className="side">
        <div className="card">
          <h4>Nuevas Adquisiciones</h4>
          <p>Descubre los ultimos titulos anadidos.</p>
        </div>

        <div className="card green">
          <h4>Reserva una Sala de Estudio</h4>
          <button>Reservar ahora</button>
        </div>
      </div>
    </section>
  )
}
