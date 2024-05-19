import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./App.css"
import { Home } from "./pages/home"
import { Dashboard } from "./pages/dashboard"
import { createContext, useState } from "react"
import { Product } from "./types"
import { ProductDetails } from "./pages/productDetails"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/Dashboard",
    element: <Dashboard />
  },
  {
    path: "/products/:productId",
    element: <ProductDetails />
  }
])

//type for value
type GlobalState = {
  cart: Product[]
}

export const GloblContext = createContext<GlobalState | null>(null)

function App() {
  const [state, setState] = useState<GlobalState>({
    cart: []
  })

  /*const handleAddToCart = (product: Product) => {
    setState({
      ...state,
      cart: [...state.cart, product]
    })
  }
  */

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
