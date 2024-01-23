import {
  useAddProductToWishlistMutation,
  useRemoveProductFromWishlistMutation,
} from "@/redux/api/productSlice.api";
import { addToBasket, removeFromBasket } from "@/redux/slices/basketSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  HeartIcon as SHeartIcon,
  ShoppingBagIcon as SShoppingBagIcon,
} from "@heroicons/react/20/solid";
import { HeartIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { ProductCardProps } from "./interface";

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { cover_image, slug, title, price, is_in_wishlist } = product;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.basket);
  const isAddedToBasket = products.some((p) => p.slug === product.slug);

  const [addToWishlistMn] = useAddProductToWishlistMutation();
  const [removeFromWishlistMn] = useRemoveProductFromWishlistMutation();

  const handleRemoveBasket = () => {
    dispatch(removeFromBasket(product.slug));

    toast.error("Product has been removed", {
      action: {
        label: "Undo",
        onClick: () => dispatch(addToBasket(product)),
      },
    });
  };

  const handleAddToBasket = () => {
    dispatch(addToBasket(product));

    toast.success("Product has been added");
  };

  return (
    <div className="w-full p-1 border-2 border-gray-200 transition-transform transform hover:shadow-lg relative items-center rounded-lg flex flex-col justify-center overflow-hidden">
      <div className="w-full" onClick={() => router.push(`/product/${slug}`)}>
        <Image
          src={cover_image || ""}
          alt="product thumbnail"
          width={300}
          height={220}
          className="w-full aspect-[6/5] object-cover rounded-lg bg-gray-200"
        />
      </div>

      <div className="w-full p-6">
        <div className="text-lg pb-2 font-medium text-center">
          <p className="!capitalize">{title}</p>
        </div>
        <div className="w-full flex justify-between items-end transition duration-500">
          <button className="">
            {is_in_wishlist ? (
              <SHeartIcon
                className="w-6 h-6"
                onClick={() => removeFromWishlistMn(slug)}
              />
            ) : (
              <HeartIcon
                className="w-6 h-6"
                onClick={() => addToWishlistMn(slug)}
              />
            )}
          </button>

          <div className="flex flex-col items-center">
            <span className=" text-xs text-gray-500 mb-1 font-medium">
              {price}
            </span>
            <span className="text-[17px] font-bold">{price}</span>
          </div>
          <button>
            {isAddedToBasket ? (
              <SShoppingBagIcon
                className="w-6 h-6"
                onClick={handleRemoveBasket}
              />
            ) : (
              <ShoppingBagIcon
                className="w-6 h-6"
                onClick={handleAddToBasket}
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
