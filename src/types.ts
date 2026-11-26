export interface Category {
  id: string
  name: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  categoryId: string
  image: string
  featured: boolean
  available: boolean
}

export interface GalleryImage {
  id: string
  url: string
  caption: string
}

export interface RestaurantInfo {
  name: string
  description: string
  phone: string
  whatsapp: string
  hours: string[]
  address: string
  instagram: string
  facebook: string
  youtube: string
}

export interface ActivityEntry {
  id: string
  text: string
  at: number
}
