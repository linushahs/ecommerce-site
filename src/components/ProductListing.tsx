import { rootDomain } from "@/apis/info";
import axios from "axios";
import { useEffect } from "react";
import { fetchAllProducts } from "redux/slices/productSlice";
import { useAppDispatch, useAppSelector } from "redux/store";

function ProductListing() {
  const products = useAppSelector((state) => state.product.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchAllProducts(dispatch);
  }, []);

  console.log(products);
  return <div>ProductListing</div>;
}

export default ProductListing;
