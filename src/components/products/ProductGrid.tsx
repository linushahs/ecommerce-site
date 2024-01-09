import { basketOfProduct } from "@/constants";

import React from "react";
import ProductCard from "./ProductCard";

const ProductGrid: React.FC = () => {
  return (
    <div className="lg:col-span-4">
      <main className="grid gap-4 grid-cols-4 ">
        {basketOfProduct.map((data) => (
          <ProductCard product={data} />
        ))}
      </main>
    </div>
  );
};

export default ProductGrid;
