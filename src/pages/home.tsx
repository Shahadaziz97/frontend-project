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
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Link } from "react-router-dom"

import { ChangeEvent, useContext, useState } from "react"
import { NavBar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Footer } from "@/components/footer"

export function Home() {
  const queryClient = useQueryClient()
  const [searchBy, setSearchBy] = useState("")
  const context = useContext(GloblContext)
  if (!context) throw Error("CONTEXT IS MISSING")
  const { handleAddToCart } = context

  const getProducts = async () => {
    try {
      const res = await api.get(`/products?searchBy=${searchBy}`)
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchBy(value)
  }
  const handleSearch = (e) => {
    e.preventDefault()
    queryClient.invalidateQueries({ queryKey: ["products"] })
  }
  console.log("products ", products)
  return (
    <>
      <NavBar />
      <Hero />
      <section className="flex flex-wrap flex-col mt-20 md:flex-row gap-4 justify-between max-w-6xl mx-auto">
        {products?.map((product) => (
          <Card key={product.id} className="w-[350px]">
            <CardHeader>
              <img src={product.image} />
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardContent></CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <Link to={`/products/${product.id}`}>Details</Link>
              </Button>
              <Button onClick={() => handleAddToCart(product)}>Add to cart</Button>
            </CardFooter>
          </Card>
        ))}
      </section>
      {error && <p className="text-red-500">{error.message}</p>}
      <Footer />
    </>
  )
}
