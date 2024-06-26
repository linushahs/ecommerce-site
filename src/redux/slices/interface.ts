interface ProductDetails {
    id: number
    slug: string
    code: string
    title: string
    tags: string[]
    brand: any
    description: string
    available_quantity: number
    cover_image: string
    product_images: ProductImage[]
    available_sizes: string[]
    available_colors: string[]
    product_features: ProductFeature[]
    price: number
    created_at: string
    updated_at: string
    is_in_wishlist: any
    is_featured: boolean
    is_recommended: boolean
}

interface ProductImage {
    image: string
}

interface ProductFeature {
    feature: string
    text: string
}

interface Product {
    title: string
    slug: string
    cover_image: string
    price: number
    categories: Category[]
    is_in_wishlist: any
    is_featured: boolean
    is_recommended: boolean
}

interface Category {
    slug: string
    name: string
}


export type { Product, ProductDetails };
