"use client";

import { productData } from "@/constants";
import { ProductDetailsResponse } from "@/redux/api/interface";
import { useGetProductDetailsQuery } from "@/redux/api/productSlice.api";
import { addToBasket } from "@/redux/slices/basketSlice";
import { useAppDispatch } from "@/redux/store";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export default function ProductPage() {
  const params = useParams();
  const dispatch = useAppDispatch();

  const { data, isLoading } = useGetProductDetailsQuery(
    params.productId as string
  );
  const [currentProductImage, setCurrentProductImage] = useState(0);

  const handleAddToCart = () => {
    dispatch(addToBasket(productDetails));
  };

  console.log(data?.product);
  let productDetails = (data as ProductDetailsResponse)?.product;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="mt-[var(--navbar-height)] mb-12">
      <div className="container flex gap-12">
        <div className="w-[40%] flex flex-col gap-4">
          <Image
            src={productData[currentProductImage].png}
            alt="product image"
            className="rounded-lg w-full"
            width={400}
            height={400}
          />
          <div className="flex items-center gap-4 justify-between">
            {productData.map(({ id, thumbnail }) => (
              <div key={id} className="">
                <Image
                  onClick={() => setCurrentProductImage(id)}
                  className={twMerge(
                    "rounded-lg cursor-pointer",
                    currentProductImage === id &&
                      "border-[3px] border-orange-500 opacity-60"
                  )}
                  src={thumbnail}
                  alt="thumbnail"
                  width={100}
                  height={100}
                />
              </div>
            ))}
          </div>
        </div>

        {/* product description -----------------------------  */}
        <div className="flex-1 py-15 mt-6">
          <p className="uppercase tracking-wide text-orange-500">
            {productDetails?.brand?.name}
          </p>
          <h1 className="font-bold capitalize text-[36px]">
            {productDetails?.title}
          </h1>
          <p className="fw-400  text-base text-gray-500">
            {productDetails?.description}
          </p>
          <div className="my-4">
            <div className="flex items-center mb-2 gap-4 ">
              <span className="font-medium  text-lg">
                {productDetails?.price}
              </span>
              <span className=" font-medium text-base text-orange-500">
                50%
              </span>
            </div>

            <span className="font-medium text-base line-through">
              {productDetails?.price}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-4 p-2 rounded-md bg-gray-200">
              <MinusIcon className=" cursor-pointer w-7 h-7" />
              <span className="font-medium text-base ">0</span>
              <PlusIcon className="w-7 h-7 cursor-pointer" />
            </div>
            <button
              onClick={handleAddToCart}
              className=" flex font-medium text-base items-center justify-center cursor-pointer py-2 px-4 rounded-md bg-primary text-white shadow-md gap-2"
            >
              <svg width="22" height="20" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
                  fill="#ffffff"
                  fillRule="nonzero"
                />
              </svg>
              Add to cart
            </button>
          </div>
        </div>
      </div>

      {/* {lightbox && (
        <Lightbox productData={productData} setLightbox={setLightbox} />
      )} */}
    </main>
  );
}
