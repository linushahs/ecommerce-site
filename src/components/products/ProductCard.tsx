import React from "react";
import { HeartIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { ShoppingBagIcon as ShoppingBagIconSolid } from "@heroicons/react/20/solid";
import Image from "next/image";
import { ProductCardProps } from "./interface";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { addToBasket } from "@/redux/slices/basketSlice";

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { imageUrl, id, name, price } = product;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.basket);
  const isAddedToBasket = products.some((p) => p.id === product.id);

  return (
    <div
      key={id}
      className="w-full p-1 border-2 border-gray-200 transition-transform transform hover:shadow-lg relative items-center rounded-lg flex flex-col justify-center overflow-hidden"
    >
      <div
        className="flex items-center justify-center "
        onClick={() => router.push("/products/1")}
      >
        <Image
          src={imageUrl}
          alt="product thumbnail"
          width={300}
          height={220}
          className="w-full aspect-[6/5] object-cover rounded-lg"
        />
      </div>

      <div className="w-full p-6">
        <div className="text-lg pb-2 font-medium text-center">
          <p className="!capitalize">{name}</p>
        </div>
        <div className="w-full flex justify-between items-end transition duration-500">
          <button className="">
            <HeartIcon className="w-6 h-6" />
          </button>

          <div className="flex flex-col items-center">
            <span className=" text-xs text-gray-500 mb-1 font-medium">
              {price}
            </span>
            <span className="text-[17px] font-bold">{price}</span>
          </div>
          <button onClick={() => dispatch(addToBasket(product))}>
            {isAddedToBasket ? (
              <ShoppingBagIconSolid className="w-6 h-6" />
            ) : (
              <ShoppingBagIcon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
