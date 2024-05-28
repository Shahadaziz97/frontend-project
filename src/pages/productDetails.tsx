import api from "@/api"
import { Cart } from "@/components/cart"
import { Footer } from "@/components/footer"
import { NavBar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Product } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { Link, useParams } from "react-router-dom"

export function ProductDetails() {
  const params = useParams()
  console.log("productId params ", params.productId)

  const getProducts = async () => {
    try {
      const res = await api.get(`/products/${params.productId}`)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const { data: product, error } = useQuery<Product>({
    queryKey: ["product"],
    queryFn: getProducts
  })

  if (!product) {
    return <h1>Data is loading</h1>
  }

  return (
    <div>
      <NavBar />
      <Card className="w-1/2 mx-auto mt-4 mb-4">
        <CardHeader>
          <img src={product.image} />
          <CardTitle>{product.name}</CardTitle>
          <CardDescription>{product.description}</CardDescription>
          <CardContent>
            Handmade organic diffuser is a sanctuary of warmth, natural beauty, and
            eco-consciousness. Each candle is meticulously crafted with a blend of organic waxes,
            carefully sourced essential oils, and botanical elements, creating a symphony of scents
            that evoke serenity and well-being.
          </CardContent>
        </CardHeader>
      </Card>
      <Footer />
    </div>
  )
}
