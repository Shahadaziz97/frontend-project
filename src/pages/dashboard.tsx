// import "./App.css"
import api from "@/api"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { ChangeEvent, FormEvent, useState } from "react"
import CategoryService from "../api/category"
import { Category, Product, ProductWithoutId } from "@/types"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { NavBar } from "@/components/navbar"
import { User } from "@/types"
import category from "../api/category"

export function Dashboard() {
  const queryClient = useQueryClient()

  const [product, setProduct] = useState({
    categoryId: "",
    name: "",
    image: "",
    description: ""
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

  const getUsers = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await api.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
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

  const { data: users, error: userError } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    console.log("{ name , value }:", { name, value })
    setProduct({
      ...product,
      [name]: value
    })
  }

  const handleSelect = (e) => {
    setProduct({
      ...product,
      categoryId: e.target.value
    })
    console.log("vsdcsdv", product)
  }

  const postProduct = async (product: ProductWithoutId) => {
    try {
      console.log("IS RUNNING")

      const res = await api.post("/products", product)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await postProduct(product)
    queryClient.invalidateQueries({ queryKey: ["products"] })
  }

  console.log("product object values ", product)

  const productWithCat = products?.map((product) => {
    const category = categories?.find((cat) => cat.id === product.categoryId)
    if (category) {
      return {
        ...product,
        categoryId: category.name
      }
    }
    return product
  })
  return (
    <>
      <NavBar />
      <form className="mt-20 w-1/2 mx-auto" onSubmit={handleSubmit}>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Add New Product</h3>

        <select name="categoryId" onChange={handleSelect}>
          <option selected>Select a choice</option>
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
          name="image"
          className="mt-4"
          type="text"
          placeholder="image"
          onChange={handleChange}
        />
        <Input
          name="description"
          className="mt-4"
          type="text"
          placeholder="description"
          onChange={handleChange}
        />

        <div className="flex justify-between">
          <Button variant="outline" type="reset" className="w-20 mt-4 ">
            Reset
          </Button>
          <Button className="w-20 mt-4 " type="submit">
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
              <TableHead>Img</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productWithCat?.map((product) => (
              <TableRow key={product.id}>
                <TableCell></TableCell>
                <TableCell className="text-left">{product.name}</TableCell>
                <TableCell className="text-left">{product.categoryId}</TableCell>
                <TableCell className="text-left">
                  {" "}
                  <img className="w-16" src={product.image}></img>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
