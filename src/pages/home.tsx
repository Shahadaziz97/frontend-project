import { GloblContext } from "@/App"
import api from "@/api"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Category, Product } from "@/types"
import { useQuery } from "@tanstack/react-query"
//import { useContext } from "react"

export function Home() {
  // const { state, handleAddToCart } = useContext(GloblContext)

  const getProducts = async () => {
    try {
      const res = await api.get("/products")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const getCategories = async () => {
    try {
      const res = await api.get("/categorys")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  // Queries
  const { data: products, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts
  })

  const { data: categories, error: catError } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getCategories
  })

  return (
    <>
      <h1 className="text-2xl uppercase mb-10">categories</h1>
      <section className="flex flex-col md:flex-row gap-4 justify-between max-w-6xl mx-auto">
        {categories?.map((product) => (
          <Card key={product.id} className="w-[350px]">
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              {/* <CardDescription>{product.des}</CardDescription> */}
            </CardHeader>
            <CardContent></CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                go to
              </Button>
            </CardFooter>
          </Card>
        ))}
      </section>
      <h1 className="text-2xl uppercase mb-10">Product</h1>
      <section className="flex flex-wrap flex-col mt-20 md:flex-row gap-4 justify-between max-w-6xl mx-auto">
        {products?.map((product) => (
          <Card key={product.id} className="w-[350px]">
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardContent></CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Add to cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </section>
      {error && <p className="text-red-500">{error.message}</p>}
    </>
  )
}
