interface Product {
    id: string;
    name: string;
    brand: string;
    price: number;
    quantity: number;
    maxQuantity: number;
    description: string;
    keywords: string[];
    selectedSize: string;
    selectedColor: string;
    imageCollection: string[];
    sizes: number[];
    image: string;
    imageUrl: string;
    isFeatured: boolean;
    isRecommended: boolean;
    availableColors: string[];
}

interface BasketItemProps {
  product: Product;
}

export type {Product, BasketItemProps};