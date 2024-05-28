import { ReactElement } from "react"
import jwt from "jwt-decode"
import { ROLE } from "@/types"
import { Navigate } from "react-router-dom"
import { reshapeUser } from "@/lib/utils"

export function PrivateRoute({ children }: { children: ReactElement }) {
  console.log("glopal data")

  //logic is here
  const token = localStorage.getItem("token") || ""

  const decodedToen = jwt(token)

  const decodedUser = reshapeUser(decodedToen)

  console.log(decodedUser.role === ROLE.customer)
  return decodedUser.role === ROLE.customer ? <Navigate to="/" /> : children
}
