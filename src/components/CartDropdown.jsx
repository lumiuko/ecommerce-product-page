import { useState, useRef, useContext } from 'react'
import { CSSTransition } from 'react-transition-group'

import useOutside from '../hooks/useOutside'
import { CartContext } from '../context/CartContext'
import deleteIcon from '../assets/images/icon-delete.svg'
import iconCart from '../assets/images/icon-cart.svg'

export default function CartDropdown() {
  const [isDropdownOpened, setIsDropdownOpened] = useState(false)
  const { shoppingCart, dispatchCart } = useContext(CartContext)
  const ref = useRef(null)
  useOutside(ref, isDropdownOpened, setIsDropdownOpened)

  function toggleDropdown() {
    setIsDropdownOpened(prevState => !prevState)
  }

  function removeFromCart(event, id) {
    event.stopPropagation()
    dispatchCart({ type: 'REMOVE_ITEM', payload: { id } })
  }

  const hasCartItems = shoppingCart.length > 0

  const cartItems = shoppingCart.map(item => (
    <div key={item.id} className="flex mb-6">
      <img src={item.photo} className="w-[50px] h-[50px] object-cover rounded-[4px]" />
      <div className="ml-4 text-gray">
        <span>{item.name}</span>
        <div>
          <span>
            ${item.price.toFixed(2)} x {item.count}
          </span>
          <span className="font-bold text-black ml-[0.625rem]">${(item.price * item.count).toFixed(2)}</span>
        </div>
      </div>
      <button onClick={event => removeFromCart(event, item.id)} aria-label="Remove item" className="ml-auto">
        <img src={deleteIcon} alt="Delete icon" aria-hidden="true" />
      </button>
    </div>
  ))

  return (
    <div className="relative" ref={ref}>
      <button aria-label="Open a cart" className="relative" onClick={toggleDropdown}>
        <img src={iconCart} alt="Cart icon" className="w-[20px]" />
        {hasCartItems && (
          <span className="absolute -right-[8px] -top-[8px] rounded-[7px] bg-orange text-white font-bold px-[0.375rem] text-badge min-w-[19px]">
            {shoppingCart.length}
          </span>
        )}
      </button>
      <CSSTransition in={isDropdownOpened} timeout={200} unmountOnExit classNames="dropdown">
        <div className="absolute z-30 rounded-10 right-[-310%] top-[60px] min-h-[256px] w-[360px] shadow-dropdown bg-white">
          <div className="p-6 border-b-border border-b-[1px] font-bold">Cart</div>
          {hasCartItems ? (
            <div className="px-4 pt-6 pb-8">
              {cartItems}
              <button className="bg-orange text-white font-bold w-full py-[1.125rem] rounded-10 leading-button">
                Checkout
              </button>
            </div>
          ) : (
            <div className="flex justify-center font-bold text-gray mt-[4.5rem]">Your cart is empty.</div>
          )}
        </div>
      </CSSTransition>
    </div>
  )
}
