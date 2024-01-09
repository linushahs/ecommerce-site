import { ReactNode } from "react";
import { Product } from "../products/interface";

interface BasketItemProps {
  product: Product;
}

interface BasketToggleProps {
  onToggle?: () => void;
  children: ReactNode | ReactNode[];
}

interface BasketContentProps {
  isOpen: boolean;
  onClose: () => void;
}

export type { BasketItemProps, BasketToggleProps, BasketContentProps };