import api from "@/api"
import { Product } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

export function ProductDetails() {
  const params = useParams()

  const getProducts = async () => {
    try {
      const res = await api.get(`/products/${params.product}`)
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

  return (
    <div>
      <h3>{product?.name}</h3>
    </div>
  )
}
