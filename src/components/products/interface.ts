import { Product } from "@/redux/slices/interface";

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

interface ProductCardProps {
  product: Product;
}

export type {
  SectionProps,
  SubCategoryProps,
  MobileFilterProps,
  OptionProps,
  SortMenuProps,
  ProductCardProps
};
