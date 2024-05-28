import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
import { Link } from "react-router-dom"

export function Footer() {
  return (
    <footer className="bg-[#F6F5F2] mt-8 mb-1 p-6">
      <div className="container max-w-7xl flex flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="text-sm ">© Copyright 2024 .</p>

        <div className="flex items-center gap-4">
          <Link className="text-gray-500 hover:text-gray-800 dark:text-gray-400 " to="#">
            <Twitter className="h-5 w-5" />
            <span className="sr-only">whatsapp</span>
          </Link>
          <Link className="text-gray-500 hover:hover:text-gray-800 dark:text-gray-400" to="#">
            <Instagram className="h-5 w-5" />
            <span className="sr-only">Instagram</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
