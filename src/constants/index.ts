import { Product } from "@/components/products/interface";

interface IFootMenu {
  id: number;
  title: string;
  menu: { id: number, link: string, path: string }[]
}

const productData = [
  {
    id: 0,
    png: "/images/image-product-1.jpg",
    thumbnail: "/images/image-product-1-thumbnail.jpg",
  },
  {
    id: 1,
    png: "/images/image-product-2.jpg",
    thumbnail: "/images/image-product-2-thumbnail.jpg",
  },
  {
    id: 2,
    png: "/images/image-product-3.jpg",
    thumbnail: "/images/image-product-3-thumbnail.jpg",
  },
  {
    id: 3,
    png: "/images/image-product-4.jpg",
    thumbnail: "/images/image-product-4-thumbnail.jpg",
  },
];

const subCategories = [
  { name: "Totes", href: "#" },
  { name: "Backpacks", href: "#" },
  { name: "Travel Bags", href: "#" },
  { name: "Hip Bags", href: "#" },
  { name: "Laptop Sleeves", href: "#" },
];

const filters = [
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White", checked: false },
      { value: "beige", label: "Beige", checked: false },
      { value: "blue", label: "Blue", checked: true },
      { value: "brown", label: "Brown", checked: false },
      { value: "green", label: "Green", checked: false },
      { value: "purple", label: "Purple", checked: false },
    ],
  },
  {
    id: "category",
    name: "Category",
    options: [
      { value: "new-arrivals", label: "New Arrivals", checked: false },
      { value: "sale", label: "Sale", checked: false },
      { value: "travel", label: "Travel", checked: true },
      { value: "organization", label: "Organization", checked: false },
      { value: "accessories", label: "Accessories", checked: false },
    ],
  },
  {
    id: "size",
    name: "Size",
    options: [
      { value: "2l", label: "2L", checked: false },
      { value: "6l", label: "6L", checked: false },
      { value: "12l", label: "12L", checked: false },
      { value: "18l", label: "18L", checked: false },
      { value: "20l", label: "20L", checked: false },
      { value: "40l", label: "40L", checked: true },
    ],
  },
];

const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];

const basketOfProduct: Product[] = [
  {

    id: "1",
    name: "Product 1",
    brand: "Brand A",
    price: 19.99,
    quantity: 1,
    maxQuantity: 10,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    keywords: ["keyword1", "keyword2"],
    selectedSize: "Medium",
    selectedColor: "Blue",
    imageCollection: ["image1.jpg", "image2.jpg"],
    sizes: [1, 2, 3],
    image: "main_image.jpg",
    imageUrl: "https://rukminim2.flixcart.com/image/832/832/xif0q/shoe/5/l/r/-original-imagpb4zsezbzxft.jpeg?q=70",
    isFeatured: true,
    isRecommended: false,
    availableColors: ["Blue", "Red", "Green"],
  },

  {

    id: "2",
    name: "Product 2",
    brand: "Brand B",
    price: 29.99,
    quantity: 1,
    maxQuantity: 5,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    keywords: ["keyword3", "keyword4"],
    selectedSize: "Large",
    selectedColor: "Red",
    imageCollection: ["image3.jpg", "image4.jpg"],
    sizes: [2, 3, 4],
    image: "main_image2.jpg",
    imageUrl: "https://rukminim2.flixcart.com/image/832/832/xif0q/shoe/5/l/r/-original-imagpb4zsezbzxft.jpeg?q=70",
    isFeatured: false,
    isRecommended: true,
    availableColors: ["Red", "Black", "White"],
  },

  {

    id: "3",
    name: "Product 3",
    brand: "Brand C",
    price: 39.99,
    quantity: 1,
    maxQuantity: 8,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    keywords: ["keyword5", "keyword6"],
    selectedSize: "Small",
    selectedColor: "Green",
    imageCollection: ["image5.jpg", "image6.jpg"],
    sizes: [1, 2, 3],
    image: "main_image3.jpg",
    imageUrl: "https://rukminim2.flixcart.com/image/832/832/xif0q/shoe/5/l/r/-original-imagpb4zsezbzxft.jpeg?q=70",
    isFeatured: true,
    isRecommended: true,
    availableColors: ["Green", "Yellow", "Blue"],

  },
];


const footMenu: IFootMenu[] = [
  {
    id: 1,
    title: "Help",
    menu: [
      {
        id: 1,
        link: "FAQs",
        path: "/",
      },
      {
        id: 2,
        link: "Track Order",
        path: "/",
      },
      {
        id: 3,
        link: "Cancel Order",
        path: "/",
      },
      {
        id: 4,
        link: "Return Order",
        path: "/",
      },
      {
        id: 5,
        link: "Warranty Info",
        path: "/",
      },
    ],
  },
  {
    id: 2,
    title: "Policies",
    menu: [
      {
        id: 1,
        link: "Return Policy",
        path: "/",
      },
      {
        id: 2,
        link: "Security",
        path: "/",
      },
      {
        id: 3,
        link: "Sitemap",
        path: "/",
      },
      {
        id: 4,
        link: "Privacy Policy",
        path: "/",
      },
      {
        id: 5,
        link: "Terms & Conditions",
        path: "/",
      },
    ],
  },
  {
    id: 3,
    title: "Company",
    menu: [
      {
        id: 1,
        link: "About Us",
        path: "/",
      },
      {
        id: 2,
        link: "Contact Us",
        path: "/",
      },
      {
        id: 3,
        link: "Service Centres",
        path: "/",
      },
      {
        id: 4,
        link: "Careers",
        path: "/",
      },
      {
        id: 5,
        link: "Affiliates",
        path: "/",
      },
    ],
  },
];


export { basketOfProduct, filters, footMenu, productData, sortOptions, subCategories };

