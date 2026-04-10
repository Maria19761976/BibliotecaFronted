import './Hero.css'

export default function Hero() {
  return (
    <section className="hero">
      <h2>Tu archivo digital personal.</h2>

      <p>
        Explora miles de volúmenes, investigaciones y manuscritos históricos.
      </p>

      <input placeholder="Busca por título, autor o ISBN..." />

      <div className="categories">
        {['Ciencia','Literatura','Historia','Artes','Filosofía'].map(c => (
          <span key={c}>{c}</span>
        ))}
      </div>
    </section>
  )
}