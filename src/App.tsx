import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./App.css"
import { Home } from "./pages/home"
import { Dashboard } from "./pages/dashboard"
import { createContext, useEffect, useState } from "react"
import { DecodedUser, Product } from "./types"
import { ProductDetails } from "./pages/productDetails"
import { Login } from "./pages/login"
import { Signup } from "./pages/signup"
import { PrivateRoute } from "./components/privateRoute"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/Dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    )
  },
  {
    path: "/products/:productId",
    element: <ProductDetails />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  }
])
//type for GlobalState
type GlobalContextType = {
  state: GlobalState
  handleAddToCart: (product: Product) => void
  handleDeleteFromCart: (id: string) => void
  handleStoreUser: (user: DecodedUser) => void
  handleRemoveUser: () => void
}
//type for value
type GlobalState = {
  cart: Product[]
  user: DecodedUser | null
}

export const GloblContext = createContext<GlobalContextType | null>(null)

function App() {
  const [state, setState] = useState<GlobalState>({
    cart: [],
    user: null
  })
  useEffect(() => {
    const user = localStorage.getItem("user")
    if (user) {
      const DecodedUser = JSON.parse(user)
      setState({
        ...state,
        user: DecodedUser
      })
    }
  }, [])

  const handleAddToCart = (product: Product) => {
    const isDuplicated = state.cart.find((cartItem) => cartItem.id === product.id)
    if (isDuplicated) return

    setState({
      ...state,
      cart: [...state.cart, product]
    })
  }
  const handleDeleteFromCart = (id: string) => {
    const filteredCart = state.cart.filter((item) => item.id !== id)
    setState({
      ...state,
      cart: filteredCart
    })
  }
  const handleStoreUser = (user: DecodedUser) => {
    setState({
      ...state,
      user
    })
  }
  const handleRemoveUser = () => {
    setState({
      ...state,
      user: null
    })
  }
  return (
    <div className="App">
      <GloblContext.Provider
        value={{ state, handleAddToCart, handleDeleteFromCart, handleStoreUser, handleRemoveUser }}
      >
        <RouterProvider router={router} />
      </GloblContext.Provider>
    </div>
  )
}

export default App
