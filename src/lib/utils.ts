import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getTokenFromStorage() {
  const token = localStorage.getItem("token")
  if (!token) return null

  return token
}
 export function reshapeUser (decodedToen : unknown ){
  const decodedUser: any = {}
  if (decodedToen) {
    for (const [key, value] of Object.entries(decodedToen)) {
      let cleanKey = ""
      if (key.startsWith("http")) {
        cleanKey = key.split("identity/claims/")[1]
      } else {
        cleanKey = key
      }
      decodedUser[cleanKey] = value
    }
  }
  return decodedUser
 }