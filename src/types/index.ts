export type Product = {
  id: string
  categoryId: string
  name: string
  image: string 
  description: string
}
export type ProductWithoutId = Omit<Product, "id">; 

export type Category = {
  id: string
  name: string
}

export type User = { 
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    fullName: "string",
    email: "string",
    countryCode: "string",
    phone: "string",
    role: "string"

}
export const ROLE={
  admin : "Admin",
  customer:"Customer"
} 

export type DecodedUser = {
aud:string
emailaddress:string
exp:number
iss:string
name:string
nameidentifier : string
role:keyof typeof ROLE
}
