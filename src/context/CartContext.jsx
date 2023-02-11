import { createContext, useReducer } from 'react'

const initialState = []

const CartContext = createContext()

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { id, name, photo, price, count } = action.payload
      return [...state, { id, name, photo, price, count }]
    }
    case 'REMOVE_ITEM': {
      return state.filter(item => item.id !== action.payload.id)
    }
    default: {
      return state
    }
  }
}

export default function CartProvider(props) {
  const [shoppingCart, dispatchCart] = useReducer(reducer, initialState)
  return <CartContext.Provider value={{ shoppingCart, dispatchCart }}>{props.children}</CartContext.Provider>
}

export { CartContext, CartProvider }
