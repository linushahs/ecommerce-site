import { Product } from "@/components/basket/interface";

interface OrderSummaryProps {
  basket: Product[];
  subtotal: number;
}

export type { OrderSummaryProps };
