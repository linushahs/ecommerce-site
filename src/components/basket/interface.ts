import { Product } from "@/redux/slices/interface";
import { ReactNode } from "react";

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