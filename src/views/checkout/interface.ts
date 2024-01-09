import { Product } from "@/components/products/interface";

interface OrderSummaryProps {
  basket: Product[];
  subtotal: number;
}

interface Mobile {
  country: string;
  countryCode: string;
  dialCode: string;
  value: string;
}

interface Profile {
  fullname?: string;
  email?: string;
  address?: string;
  mobile?: Mobile;
}

interface ShippingDetailsProps {
  subtotal: number;
  profile: Profile;
  shipping: {
    fullname?: string;
    email?: string;
    address?: string;
    mobile?: Mobile;
    isInternational?: boolean;
    isDone?: boolean;
  };
}

interface ShippingTotalProps {
  subtotal: number;
}

interface PaymentProps {
  shipping: {
    isDone: boolean;
    isInternational: boolean;
  };
  payment: {
    name: string;
    cardnumber: string;
    expiry: string;
    ccv: string;
    type: string;
  };
  subtotal: number;
}

export type { OrderSummaryProps, ShippingDetailsProps, Profile, Mobile, ShippingTotalProps, PaymentProps };
