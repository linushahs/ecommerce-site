import { Product } from "@/redux/slices/interface";
import { ReactNode } from "react";

interface BasketProduct extends Product {
  selectedSize: string;
  selectedColor: string;
  quantity: number;
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

export type { BasketItemProps, BasketToggleProps, BasketContentProps, BasketProduct };