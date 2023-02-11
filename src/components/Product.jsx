import { useContext, useState } from 'react'
import { CSSTransition } from 'react-transition-group'

import { CartContext } from '../context/CartContext'
import Images from './Images'
import useCounter from '../hooks/useCounter'
import plusIcon from '../assets/images/icon-plus.svg'
import minusIcon from '../assets/images/icon-minus.svg'
import cartIcon from '../assets/images/icon-cart-btn.svg'
import closeLightboxIcon from '../assets/images/close-lightbox.svg'

export default function Product({ item }) {
  const [count, incrementCount, decrementCount] = useCounter(1, 10)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const { shoppingCart, dispatchCart } = useContext(CartContext)

  const finalPrice = item.discount.has ? item.price - (item.price * item.discount.percent) / 100 : item.price
  const isAddedToCart = shoppingCart.find(cartItem => cartItem.id === item.id)

  function addToCart() {
    if (count < 1) return
    dispatchCart({
      type: 'ADD_ITEM',
      payload: { id: item.id, name: item.name, photo: item.images[0].thumbnail, price: finalPrice, count }
    })
  }

  function openLightbox() {
    setIsLightboxOpen(true)
  }

  return (
    <main className="flex flex-col gap-6 mt-[4.25rem] mb-20 lg:px-12 lg:flex-row lg:container lg:mt-[12.625rem] lg:justify-between lg:items-center">
      <Images images={item.images} openLightbox={openLightbox} />
      <div className="px-6 lg:px-0 lg:max-w-[445px]">
        <h5 className="text-orange font-bold uppercase text-small-title tracking-small-title">{item.series}</h5>
        <h1 className="mt-4 lg:mt-6 text-title leading-title font-bold lg:text-lg-title lg:leading-lg-title">
          {item.name}
        </h1>
        <p className="text-gray mt-4 lg:mt-8">{item.description}</p>
        <div className="flex justify-between items-center mt-6 font-bold md:flex-col md:items-start">
          <div className="flex items-center gap-6">
            <span className="text-title">${finalPrice.toFixed(2)}</span>
            {item.discount.has && (
              <span className="text-orange bg-light-orange rounded-badge py-1 px-2">{item.discount.percent}%</span>
            )}
          </div>
          {item.discount.has && <span className="text-dark-gray line-through">${item.price.toFixed(2)}</span>}
        </div>
        <div className="mt-4 lg:mt-8 flex flex-col gap-4 md:flex-row">
          <div className="flex justify-between bg-light-gray px-6 py-4 rounded-10 md:px-4 md:w-[157px]">
            <button aria-label="Decrement product count" onClick={decrementCount}>
              <img src={minusIcon} alt="Minus icon" />
            </button>
            <span className="font-bold">{count}</span>
            <button aria-label="Increment product count" onClick={incrementCount}>
              <img src={plusIcon} alt="Plus icon" />
            </button>
          </div>
          <button
            className={`flex justify-center w-full bg-orange text-white py-4 rounded-10 shadow-button transition-colors md:max-w-[272px] lg:shadow-none lg:hover:bg-very-light-orange disabled:cursor-not-allowed disabled:bg-very-light-orange`}
            onClick={addToCart}
            disabled={count < 1 || isAddedToCart}
          >
            <img src={cartIcon} alt="Cart icon" aria-hidden="true" />
            <span className="font-bold ml-4">{isAddedToCart ? 'In cart' : 'Add to cart'}</span>
          </button>
        </div>
      </div>
      <CSSTransition in={isLightboxOpen} timeout={200} classNames="fadeIn" unmountOnExit>
        <div className="hidden lg:flex fixed justify-center items-center w-full h-full bg-overlay left-0 top-0 z-30">
          <div className="max-w-[550px] flex flex-col">
            <button className="self-end mb-6" onClick={() => setIsLightboxOpen(false)}>
              <img src={closeLightboxIcon} />
            </button>
            <Images images={item.images} isLightbox={true} />
          </div>
        </div>
      </CSSTransition>
    </main>
  )
}
