// import "./App.css"
import api from "@/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { ChangeEvent, useState } from "react"
import CategoryService from "../api/category"
import { Category, Product } from "@/types"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"

export function Dashboard() {
  const queryClient = useQueryClient()

  const [product, setProduct] = useState({
    categoryId: "",
    name: "",
    Description: ""
  })
  const getProducts = async () => {
    try {
      const res = await api.get("/products")
      console.log("res ", res)
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
    queryFn: CategoryService.getAll
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    console.log("{ name , value }:", { name, value })
    setProduct({
      ...product,
      [name]: value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    await postProduct()
    queryClient.invalidateQueries({ queryKey: ["products"] })
  }

  const handleSelect = (e) => {
    setProduct({
      ...product,
      categoryId: e.target.value
    })
  }
  const postProduct = async () => {
    try {
      console.log("IS RUNNING")

      const res = await api.post("/products", product)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  console.log("products ", products)

  return (
    <>
      <form className="mt-20 w-1/2 mx-auto" onSubmit={handleSubmit}>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Add New Product</h3>

        <select onChange={handleSelect} name="categoryId">
          {categories?.map((cat) => {
            return (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            )
          })}
        </select>
        <Input
          name="name"
          className="mt-4"
          type="text"
          placeholder="name"
          onChange={handleChange}
        />
        <Input
          name="Description"
          className="mt-4"
          type="text"
          placeholder="Description"
          onChange={handleChange}
        />

        <div className="flex justify-between">
          <Button variant="outline" type="reset" className="w-20 mt-4 ">
            Reset
          </Button>
          <Button type="submit" className="w-20 mt-4 ">
            Submit
          </Button>
        </div>
      </form>
      <div>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Products</h3>
        <Table className="mt-20 w-1/2 mx-auto">
          <TableCaption></TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>CategoryId</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((product) => (
              <TableRow key={product.id}>
                <TableCell></TableCell>
                <TableCell className="text-left">{product.name}</TableCell>
                <TableCell className="text-left">{product.categoryId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
