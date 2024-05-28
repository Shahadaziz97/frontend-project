import { Link } from "react-router-dom"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from "./ui/navigation-menu"
import { Cart } from "./cart"
import { useContext } from "react"
import { GloblContext } from "@/App"
import { ROLE } from "@/types"
import { Button } from "./ui/button"
import { Home, LogOut } from "lucide-react"
// import image from "public/logo.jpeg"

export function NavBar() {
  const context = useContext(GloblContext)
  if (!context) throw Error("CONTEXT IS MISSING")
  const { state, handleRemoveUser } = context
  const handleLogout = () => {
    if (typeof window !== undefined) {
      window.location.reload()
    }

    localStorage.removeItem("token")
    localStorage.removeItem("user")

    handleRemoveUser()
  }

  return (
    <div className="flex justify-between bg-[#F6F5F2] p-4">
      <img src="logo.png" alt="logo" className=" w-16 h-16" />
      <NavigationMenu>
        <div className="flex  justify-center mb-4 ">
          <NavigationMenuList className="gap-8">
            <NavigationMenuItem>
              <Link to="/">
                <NavigationMenuLink>Home</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            {state.user?.role === ROLE.admin && (
              <NavigationMenuItem>
                <Link to="/Dashboard">
                  <NavigationMenuLink>Dashpoard</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            )}

            {!state.user && (
              <NavigationMenuItem>
                <Link to="/login">
                  <NavigationMenuLink>Login</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            )}

            {!state.user && (
              <NavigationMenuItem>
                <Link to="/signup">
                  <NavigationMenuLink>Create an accounte</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            )}
            {state.user && (
              <Button onClick={handleLogout}>
                <LogOut />
              </Button>
            )}
          </NavigationMenuList>
        </div>
      </NavigationMenu>
      <Cart />
    </div>
  )
}
