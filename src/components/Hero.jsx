import './Hero.css'

export default function Hero() {
  return (
    <section className="hero">
      <h2>Tu archivo digital personal.</h2>

      <p>
        Explora miles de volumenes, investigaciones y manuscritos historicos.
      </p>

      <input placeholder="Busca por titulo, autor o ISBN..." />

      <div className="categories">
        {['Ciencia', 'Literatura', 'Historia', 'Artes', 'Filosofia'].map((c) => (
          <span key={c}>{c}</span>
        ))}
      </div>
    </section>
  )
}
