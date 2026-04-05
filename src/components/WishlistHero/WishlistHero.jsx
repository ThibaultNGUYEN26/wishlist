import './WishlistHero.css'

function WishlistHero({ title, description, badge, itemCount }) {
  return (
    <section className="hero-panel">
      <div className="hero-topline">
        <p className="eyebrow">{badge}</p>
        <div className="hero-chip-row">
          <span className="hero-chip">{itemCount} wishes</span>
        </div>
      </div>

      <div className="hero-main">
        <div className="hero-copy">
          <h1>{title}</h1>
          <p className="hero-text">{description}</p>
        </div>

        <div className="hero-summary">
          <div className="hero-summary-card">
            <span className="hero-summary-label">Collection</span>
            <strong>Visual wishlist</strong>
          </div>
          <div className="hero-summary-card">
            <span className="hero-summary-label">Style</span>
            <strong>Silk, glass, tilt</strong>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WishlistHero
