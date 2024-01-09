
interface SubCategoryProps {
  name: string;
  href: string;
}

interface OptionProps {
  value: string;
  label: string;
  checked: boolean;
}

interface SectionProps {
  id: string;
  name: string;
  options: OptionProps[];
}

interface MobileFilterProps {
  open: boolean;
  onClose: () => void;
}

interface SortOption {
  name: string;
  href: string;
  current?: boolean;
}

interface SortMenuProps {
  sortOptions: SortOption[];
}

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

interface ProductCardProps {
  product: Product;
}

export type {
  SectionProps,
  SubCategoryProps,
  MobileFilterProps,
  OptionProps,
  SortMenuProps,
  Product,
  ProductCardProps
};
