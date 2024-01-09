import React from "react";
import Image from "next/image";
import {
  HeartIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { productItems } from "@/constants";

const ProductGrid: React.FC = () => {
  const router = useRouter();

  return (
    <div className="lg:col-span-4">
      <main className="grid gap-4 grid-cols-4 ">
        {productItems.map((data, id) => (
          <div
            key={id}
            className="p-1 border-2 border-gray-200 transition-transform transform hover:shadow-lg relative items-center rounded-lg flex flex-col justify-center overflow-hidden"
          >
            <div
              className="flex items-center justify-center "
              onClick={() => router.push("/products/1")}
            >
              <Image
                src={data.url}
                alt="product thumbnail"
                width={300}
                height={220}
                className="w-full aspect-[6/5] object-cover rounded-lg"
              />
            </div>

            <div className="py-6">
              <div className="text-lg pb-2 font-medium text-center">
                <p className="!capitalize">{data.headTitle}</p>
              </div>
              <div className="w-full flex justify-between items-end transition duration-500">
                <button className="">
                  <HeartIcon className="w-6 h-6" />
                </button>

                <div className="flex flex-col items-center">
                  <span className=" text-xs text-gray-500 mb-1 font-medium">
                    {data.price1}
                  </span>
                  <span className="text-[17px] font-bold">{data.price2}</span>
                </div>
                <button>
                  <ShoppingBagIcon className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default ProductGrid;
