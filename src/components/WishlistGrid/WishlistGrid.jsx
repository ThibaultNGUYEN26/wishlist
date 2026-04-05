import WishlistCard from '../WishlistCard/WishlistCard'
import './WishlistGrid.css'

function WishlistGrid({ items }) {
  return (
    <section className="wishlist-section">
      <div className="section-heading">
        <div className="section-heading-copy">
          <p className="eyebrow">Wishlist</p>
          <h2>Wishlist collection</h2>
        </div>
      </div>

      <div className="wishlist-grid">
        {items.map((item, index) => (
          <WishlistCard key={item.name} item={item} index={index} />
        ))}
      </div>
    </section>
  )
}

export default WishlistGrid
