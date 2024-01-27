"use client";

import { useGetAllProductsQuery } from "@/redux/api/productSlice.api";
import React, { memo } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/redux/slices/interface";
import ProductGridLoading from "../loaders/ProductGridLoading";
import { useSearchParams } from "next/navigation";
import { OrderType } from "@/redux/api/interface";

const ProductGrid: React.FC = memo(() => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const query = searchParams.get("query");
  const orderQueryParam = searchParams.get("order");
  const order: OrderType | null =
    orderQueryParam &&
    ["price_asc", "price_desc", "created_desc", "created_asc"].includes(
      orderQueryParam
    )
      ? (orderQueryParam as OrderType)
      : null;

  const { data, isLoading } = useGetAllProductsQuery({
    category,
    query,
    order,
  });

  const products = data?.results;

  if (isLoading) return <ProductGridLoading />;
  return (
    <div className="lg:col-span-4">
      <main className="grid gap-4 grid-cols-4 ">
        {products?.map((data: Product) => (
          <ProductCard key={data.slug} product={data} />
        ))}
      </main>
    </div>
  );
});

export default ProductGrid;
