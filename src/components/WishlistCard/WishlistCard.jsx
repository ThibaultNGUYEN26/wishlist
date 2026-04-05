import { useState } from 'react'
import TiltedCard from '../TiltedCard/TiltedCard'
import './WishlistCard.css'

function WishlistCard({ item, index }) {
  const [isFlipped, setIsFlipped] = useState(false)
  const flipCard = () => setIsFlipped((current) => !current)

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      flipCard()
    }
  }

  return (
    <article className="wish-card" style={{ '--card-index': index }}>
      <div
        className={`wish-flip-button ${isFlipped ? 'is-flipped' : ''}`}
        onClick={flipCard}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
      >
        <div className="wish-flip-inner">
          <div className="wish-face wish-face-front">
            <TiltedCard
              altText={item.altText ?? item.name}
              captionText={item.captionText ?? item.name}
              containerHeight="320px"
              containerWidth="100%"
              displayOverlayContent
              imageHeight="320px"
              imageSrc={item.imageSrc}
              imageWidth="100%"
              overlayContent={
                <div className="wish-overlay">
                  <p className="wish-overlay-title">{item.name}</p>
                </div>
              }
              rotateAmplitude={12}
              scaleOnHover={1.05}
              showMobileWarning={false}
              showTooltip={false}
            />
          </div>

          <div className="wish-face wish-face-back">
            <div className="wish-description-panel">
              <div className="wish-back-top">
                <span className="wish-back-label">Details</span>
                {item.shopUrl ? (
                  <a
                    className="wish-shop-link"
                    href={item.shopUrl}
                    onClick={(event) => event.stopPropagation()}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {item.actionLabel ?? 'Shop'}
                  </a>
                ) : null}
              </div>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <span className="wish-back-hint">Click to flip back</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default WishlistCard
