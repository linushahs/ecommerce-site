import React from "react";
import Image from "next/image";
import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";

const ProductGrid: React.FC = () => {
  const article = [
    {
      url: "https://rukminim2.flixcart.com/image/832/832/xif0q/shoe/5/l/r/-original-imagpb4zsezbzxft.jpeg?q=70",
      headTitle: "AIR ZOOM PEGASUS",
      price1: "$990.00",
      price2: "$749.00",
    },
    {
      url: "https://rukminim2.flixcart.com/image/832/832/xif0q/shoe/5/l/r/-original-imagpb4zsezbzxft.jpeg?q=70",
      headTitle: "AIR ZOOM PEGASUS",
      price1: "$453.00",
      price2: "$562.00",
    },
    {
      url: "https://rukminim2.flixcart.com/image/832/832/xif0q/shoe/5/l/r/-original-imagpb4zsezbzxft.jpeg?q=70",
      headTitle: "AIR ZOOM PEGASUS",
      price1: "$576.00",
      price2: "$688.00",
    },
    {
      url: "https://rukminim2.flixcart.com/image/832/832/xif0q/shoe/5/l/r/-original-imagpb4zsezbzxft.jpeg?q=70",
      headTitle: "AIR ZOOM PEGASUS",
      price1: "$798.00",
      price2: "$895.00",
    },
  ];

  return (
    <div className="lg:col-span-4">
      <main className="grid gap-4 grid-cols-4 ">
        {article.map((data) => (
          <div className="border-2 transition-transform transform hover:shadow-lg relative items-center rounded-lg flex flex-col items-center justify-center overflow-hidden">
            <div className="flex items-center justify-center ">
              <Image
                src={data.url}
                alt="product thumbnail"
                width={300}
                height={220}
                className="w-full aspect-[6/5] object-cover"
              />
            </div>

            <div className="p-6">
              <div className="text-lg pb-2 font-medium text-center">
                <p className="!capitalize">{data.headTitle}</p>
              </div>
              <div className="w-full flex justify-between items-end transition duration-500">
                <a
                  href=""
                  className="text-1.5xl text-dark-color hover:text-[#FFE8DF]]"
                >
                  <HeartIcon className="w-6 h-6" />
                </a>

                <div className="flex flex-col items-center">
                  <span className=" text-xs text-gray-500 mb-1 font-medium">
                    {data.price1}
                  </span>
                  <span className="text-[17px] font-bold">{data.price2}</span>
                </div>
                <a href="" className="text-2xl">
                  <i className="bx bx-cart-alt "></i>
                </a>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default ProductGrid;
