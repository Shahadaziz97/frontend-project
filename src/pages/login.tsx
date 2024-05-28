import { GloblContext } from "@/App"
import api from "@/api"
import { NavBar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { reshapeUser } from "@/lib/utils"
import { ChangeEvent, FormEvent, useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import iwt from "jwt-decode"

export function Login() {
  const navigate = useNavigate()
  const context = useContext(GloblContext)
  if (!context) throw Error("CONTEXT IS MISSING")
  const { handleStoreUser } = context
  const [user, setUser] = useState({
    email: "",
    password: ""
  })
  console.log("user", user)

  const handleLogin = async () => {
    try {
      console.log("user object in login ", user)
      const res = await api.post("/users/login", user)
      console.log("res data ", res.data)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    setUser({
      ...user,
      [name]: value
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const token = await handleLogin()
    if (token) {
      const decodedToen = iwt(token)
      const user = reshapeUser(decodedToen)
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))

      handleStoreUser(user)
      navigate("/")
    }
  }

  return (
    <div>
      <NavBar />

      <form action="POST" className=" w-full md:w-1/3 mx-auto mt-9" onSubmit={handleSubmit}>
        <h1>login </h1>
        <Input
          name="Email"
          className="mt-4"
          type="text"
          placeholder="Email"
          onChange={handleChange}
        />
        <Input
          name="Password"
          className="mt-4 mb-4"
          type="password"
          placeholder="password"
          onChange={handleChange}
        />

        <div className="flex justify-between flex-col">
          <Button className="mt-7" type="submit">
            login
          </Button>
          <Button variant="link" className="mt-4">
            <Link to="/signup">Create an account</Link>
          </Button>
        </div>
      </form>
      <Footer />
    </div>
  )
}
