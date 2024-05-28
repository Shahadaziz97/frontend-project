import { useContext } from "react"
import { Button } from "./ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { GloblContext } from "@/App"
import { ShoppingBagIcon, ShoppingCart } from "lucide-react"

export function Cart() {
  const context = useContext(GloblContext)
  if (!context) throw Error("CONTEXT IS MISSING")

  const { state, handleDeleteFromCart } = context

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex gap-1 mt-4">
          <Button>
            <ShoppingCart className="cursor-pointer" />
            <span>({state.cart.length})</span>
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div>
          {state.cart.map((Product) => {
            return (
              <div className="mb-4 flex items-center gap-4" key={Product.id}>
                <img src={Product.image} alt={Product.name} className="w-10 h-10 object-contain" />
                <h4>{Product.name}</h4>
                <Button onClick={() => handleDeleteFromCart(Product.id)}> X </Button>
              </div>
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}
