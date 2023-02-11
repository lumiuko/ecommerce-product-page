import useCounter from '../hooks/useCounter'
import { CSSTransition } from 'react-transition-group'
import nextIcon from '../assets/images/icon-next.svg'
import prevIcon from '../assets/images/icon-previous.svg'
import { useRef } from 'react'

export default function Images({ images, isLightbox = false, openLightbox }) {
  const [currentImage, nextImage, prevImage, goToImage] = useCounter(0, images.length - 1)
  const xDown = useRef(null)
  const yDown = useRef(null)

  function touchStart(event) {
    xDown.current = event.touches[0].clientX
    yDown.current = event.touches[0].clientY
  }

  function touchMove(event) {
    if (!xDown.current || !yDown.current) return

    const xUp = event.touches[0].clientX
    const yUp = event.touches[0].clientY
    const xDiff = xDown.current - xUp
    const yDiff = yDown.current - yUp

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        nextImage()
      } else {
        prevImage()
      }
    }

    xDown.current = null
    yDown.current = null
  }

  const imageElements = images.map((image, index) => {
    const heightClasses = isLightbox ? 'lg:h-[550px]' : 'lg:h-[445px]'

    return (
      <img
        key={index}
        src={image.main}
        alt={`Image ${index + 1}`}
        className={`shrink-0 h-[300px] ${heightClasses} w-full object-cover transition-transform`}
        style={{ transform: `translateX(-${100 * currentImage}%)` }}
        onTouchStart={touchStart}
        onTouchMove={touchMove}
      />
    )
  })

  const imageThumbnails = images.map((image, index) => {
    const isCurrent = index === currentImage
    const buttonClasses = isCurrent ? 'border-[2px]' : ''
    const imageClasses = isCurrent ? 'opacity-50' : ''

    return (
      <button
        key={index}
        className={`${buttonClasses} border-orange max-w-[88px] cursor-pointer rounded-10 overflow-hidden transition-all`}
        onClick={() => goToImage(index)}
        aria-label={`Image ${index + 1}`}
      >
        <img
          className={`${imageClasses} hover:opacity-50 transition-opacity`}
          alt="Image thumbnail"
          aria-hidden="true"
          src={image.thumbnail}
        />
      </button>
    )
  })

  function handleImageClick() {
    if (!isLightbox && window.innerWidth >= 1100) openLightbox()
  }

  return (
    <div>
      <div
        className={`relative ${isLightbox ? 'lg:max-w-[550px]' : 'lg:max-w-[445px] lg:cursor-pointer'}`}
        onClick={handleImageClick}
      >
        <CSSTransition in={currentImage > 0} timeout={200} classNames="fadeIn" unmountOnExit>
          <button
            className={`absolute top-2/4 -translate-y-1/2 bg-white w-[40px] h-[40px] rounded-full flex justify-center items-center ${
              isLightbox ? '-left-4' : 'lg:hidden left-4'
            } z-10`}
            aria-label="Previous image"
            onClick={prevImage}
          >
            <img className="h-[12px]" src={prevIcon} alt="Previous" aria-hidden="true" />
          </button>
        </CSSTransition>
        <div className="relative overflow-hidden flex lg:rounded-15">{imageElements}</div>
        <CSSTransition in={currentImage < images.length - 1} timeout={200} classNames="fadeIn" unmountOnExit>
          <button
            className={`absolute top-2/4 -translate-y-1/2 bg-white w-[40px] h-[40px] rounded-full flex justify-center items-center ${
              isLightbox ? '-right-4' : 'right-4 lg:hidden'
            } z-10`}
            aria-label="Next image"
            onClick={nextImage}
          >
            <img className="h-[12px]" src={nextIcon} alt="Next" aria-hidden="true" />
          </button>
        </CSSTransition>
      </div>
      <div className={`hidden lg:flex mt-8 ${isLightbox ? 'justify-center gap-8' : 'justify-between'}`}>
        {imageThumbnails}
      </div>
    </div>
  )
}
