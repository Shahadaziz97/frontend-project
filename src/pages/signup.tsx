import api from "@/api"
import { NavBar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChangeEvent, FormEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export function Signup() {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    fullname: "",
    email: "",
    password: "",
    countryCode: "",
    phone: ""
  })

  const handleSignup = async () => {
    try {
      console.log("user object in signup ", user)
      const res = await api.post("/users/signup", user)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  console.log("user values when typing :", user)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setUser({
      ...user,
      [name]: value
    })
  }
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const response = await handleSignup()
    if (response) {
      navigate("/login")
    }
  }

  return (
    <div>
      <NavBar />
      <form action="POST" onSubmit={handleSubmit} className=" w-full md:w-1/3 mx-auto mt-9">
        <h1>Create an account </h1>
        <Input
          name="fullname"
          className="mt-4"
          type="text"
          placeholder="fullname"
          onChange={handleChange}
        />
        <Input
          name="email"
          className="mt-4"
          type="text"
          placeholder="Email"
          onChange={handleChange}
        />
        <Input
          name="password"
          className="mt-4 mb-4"
          type="password"
          placeholder="password"
          onChange={handleChange}
        />
        <Input
          name="countryCode"
          className="mt-4 mb-4"
          type="text"
          placeholder="countryCode"
          onChange={handleChange}
        />
        <Input
          name="phone"
          className="mt-4 mb-4"
          type="string"
          placeholder="Phone number"
          onChange={handleChange}
        />

        <div className="flex justify-between flex-col">
          <Button className="mt-7">SignUp</Button>
          <Button variant="link" className="mt-7">
            <Link to="/login">Have an account ?</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
