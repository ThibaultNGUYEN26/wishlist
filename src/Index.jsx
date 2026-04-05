import Silk from './components/Silk/Silk'
import WishlistHero from './components/WishlistHero/WishlistHero'
import WishlistGrid from './components/WishlistGrid/WishlistGrid'
import { wishlistItems, wishlistMeta } from './data/wishlist'
import './Index.css'

function Index() {
  return (
    <>
      <Silk
        color="#6f47ff"
        noiseIntensity={1.2}
        rotation={0}
        scale={1}
        speed={5}
      />
      <main className="page-shell">
        <WishlistHero
          itemCount={wishlistItems.length}
          title={wishlistMeta.title}
          description={wishlistMeta.description}
          badge={wishlistMeta.badge}
        />
        <WishlistGrid items={wishlistItems} />
      </main>
    </>
  )
}

export default Index
