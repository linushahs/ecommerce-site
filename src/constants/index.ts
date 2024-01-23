
import { IFootMenu } from "./interface";

/*
  Authentication toast messages
  (Incl. error, success, warning, ...)
*/
export const LOGIN_SUCESS = "You are successfully logged in."
export const REGISTER_SUCCESS = "Your email is registered successfully."
export const FORGOTPW_SUCCESS = "OTP Sent to registered email."
export const NEWPW_SUCCESS = "Your password has been changed."
export const OTPVERIFY_SUCCESS = "OTP is verified."


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


export { filters, footMenu, productData, sortOptions, subCategories };

