import Navbar from './components/Navbar'
import Product from './components/Product'
import CartProvider from './context/CartContext'
import item from './data'

function App() {
  return (
    <CartProvider>
      <Navbar />
      <Product item={item} />
    </CartProvider>
  )
}

export default App
