import { ReactNode } from "react";


interface BasketProductDetails {
  id: number
  slug: string
  title: string
  cover_image: string
  available_quantity: number
  price: number
}


interface BasketProduct {
  product_id: number
  quantity: number
  base_price: number
  selected_color: any
  selected_size: any
  discounted_price: number
  product_discount: number
  amount: number
  product_details: BasketProductDetails
}

interface BasketItemProps {
  product: BasketProduct;

}

interface BasketToggleProps {
  onToggle?: () => void;
  children: ReactNode | ReactNode[];
}

interface BasketContentProps {
  isOpen: boolean;
  onClose: () => void;
}

export type { BasketContentProps, BasketItemProps, BasketProduct, BasketToggleProps, BasketProductDetails };
