"use client";

import { useGetAllProductsQuery } from "@/redux/api/productSlice.api";
import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/redux/slices/interface";

const ProductGrid: React.FC = () => {
  const { data, isLoading } = useGetAllProductsQuery();

  const products = data?.results;
  console.log(data);

  if (isLoading) return <h2>Loading...</h2>;
  return (
    <div className="lg:col-span-4">
      <main className="grid gap-4 grid-cols-4 ">
        {products?.map((data: Product) => (
          <ProductCard key={data.slug} product={data} />
        ))}
      </main>
    </div>
  );
};

export default ProductGrid;
