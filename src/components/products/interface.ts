import { CategoryResponse } from "@/redux/api/interface";
import { Product } from "@/redux/slices/interface";

interface SubCategoryProps {
  name: string;
  href: string;
}


interface SectionProps {
  id?: string;
  name: string;
  options: CategoryResponse[];
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
  pathname: string;
}

interface ProductCardProps {
  product: Product;
}

export type {
  SectionProps,
  SubCategoryProps,
  MobileFilterProps,

  SortMenuProps,
  ProductCardProps
};
