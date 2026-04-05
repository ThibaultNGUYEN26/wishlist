import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import './TiltedCard.css'

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2,
}

function TiltedCard({
  imageSrc,
  altText = 'Tilted card image',
  captionText = '',
  containerHeight = '300px',
  containerWidth = '100%',
  imageHeight = '300px',
  imageWidth = '300px',
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showMobileWarning = true,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false,
}) {
  const ref = useRef(null)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useMotionValue(0), springValues)
  const rotateY = useSpring(useMotionValue(0), springValues)
  const scale = useSpring(1, springValues)
  const opacity = useSpring(0)
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1,
  })

  const [lastY, setLastY] = useState(0)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return
    }

    const mediaQuery = window.matchMedia('(hover: none), (pointer: coarse)')
    const updateTouchState = (event) => {
      setIsTouchDevice(event.matches)
    }

    setIsTouchDevice(mediaQuery.matches)

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updateTouchState)
      return () => mediaQuery.removeEventListener('change', updateTouchState)
    }

    mediaQuery.addListener(updateTouchState)
    return () => mediaQuery.removeListener(updateTouchState)
  }, [])

  const handleMouse = (event) => {
    if (!ref.current || isTouchDevice) {
      return
    }

    const rect = ref.current.getBoundingClientRect()
    const offsetX = event.clientX - rect.left - rect.width / 2
    const offsetY = event.clientY - rect.top - rect.height / 2

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude

    rotateX.set(rotationX)
    rotateY.set(rotationY)

    x.set(event.clientX - rect.left)
    y.set(event.clientY - rect.top)

    const velocityY = offsetY - lastY
    rotateFigcaption.set(-velocityY * 0.6)
    setLastY(offsetY)
  }

  const handleMouseEnter = () => {
    if (isTouchDevice) {
      return
    }

    scale.set(scaleOnHover)
    opacity.set(1)
  }

  const handleMouseLeave = () => {
    opacity.set(0)
    scale.set(1)
    rotateX.set(0)
    rotateY.set(0)
    rotateFigcaption.set(0)
  }

  return (
    <figure
      ref={ref}
      className="tilted-card-figure"
      style={{
        height: containerHeight,
        width: containerWidth,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouse}
    >
      {showMobileWarning ? (
        <div className="tilted-card-mobile-alert">
          This effect is not optimized for mobile. Check on desktop.
        </div>
      ) : null}

      <motion.div
        className="tilted-card-inner"
        style={{
          width: imageWidth,
          height: imageHeight,
          rotateX: isTouchDevice ? 0 : rotateX,
          rotateY: isTouchDevice ? 0 : rotateY,
          scale: isTouchDevice ? 1 : scale,
        }}
      >
        <motion.img
          alt={altText}
          className="tilted-card-img"
          src={imageSrc}
          style={{
            width: imageWidth,
            height: imageHeight,
          }}
        />

        {displayOverlayContent && overlayContent ? (
          <motion.div className="tilted-card-overlay">{overlayContent}</motion.div>
        ) : null}
      </motion.div>

      {showTooltip && !isTouchDevice ? (
        <motion.figcaption
          className="tilted-card-caption"
          style={{
            x,
            y,
            opacity,
            rotate: rotateFigcaption,
          }}
        >
          {captionText}
        </motion.figcaption>
      ) : null}
    </figure>
  )
}

export default TiltedCard
