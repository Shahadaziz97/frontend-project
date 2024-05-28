import api from "@/api"
import { Product } from "@/types"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { ChangeEvent, useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

export function Hero() {
  const [searchBy, setSearchBy] = useState("")
  const queryClient = useQueryClient()
  const getProducts = async () => {
    try {
      const res = await api.get(`/products?searchBy=${searchBy}`)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const { data: products, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts
  })
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchBy(value)
  }
  const handleSearch = (e) => {
    e.preventDefault()
    queryClient.invalidateQueries({ queryKey: ["products"] })
  }
  return (
    <>
      <div className="w-1/3 mt-7 mb-7 flex justify-between" id="hero">
        <img className="pl-4 mx-auto" src="hero.png" id="imgHero" />
        <div className="flex-col mt-24 ">
          <p className="title-text text-left">JAS</p>
          <p className="header-text mt-4 text-left ">
            handmade organic products
            <br />
            sanctuary of warmth, natural beauty, and eco-consciousness.
            <br />
            Each is meticulously crafted with a ... <br />
            <br />
            Blend of organic waxes, Carefully sourced essential oils, and botanical elements,
            creating a symphony of scents that evoke serenity and well-being.
          </p>
        </div>
      </div>

      <div>
        <form onSubmit={handleSearch} className="flex gap-4 w-full md:w-1/2 mx-auto mb-4 mt-48">
          <Input
            type="search"
            placeholder="Search for a product"
            onChange={handleChange}
            value={searchBy}
          />
          <Button type="submit">Search</Button>
        </form>
      </div>
    </>
  )
}
