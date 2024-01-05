import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { BasketItemProps } from "./interface";
import BasketItemControl from "./BasketItemControl";

const BasketItem: React.FC<BasketItemProps> = ({ product }) => {
  return (
    <div className=" border border-gray-300 pr-4 rounded-md transition-transform ease-in duration-200 transform hover:scale-[1.02] flex gap-2 overflow-hidden">
      <BasketItemControl product={product} />

      <div className="flex flex-1 items-center py-4">
        <div className="w-24 h-24 mr-4 relative">
          <Image
            alt={product.name}
            className="w-full h-full object-contain"
            src={
              "https://rukminim2.flixcart.com/image/832/832/xif0q/shoe/5/l/r/-original-imagpb4zsezbzxft.jpeg?q=70"
            }
            width={200}
            height={200}
          />
        </div>
        <div className="flex-1">
          <Link
            href={`/product/${product.id}`}
            onClick={() => document.body.classList.remove("is-basket-open")}
          >
            <h4 className="underline mb-4 w-36 whitespace-nowrap overflow-hidden text-ellipsis relative font-semibold text-lg">
              {product.name}
            </h4>
          </Link>
          <div className="grid grid-cols-3">
            <div>
              <span className="text-gray-500 text-sm">Quantity</span>
              <h5 className="my-0">{product.quantity}</h5>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Size</span>
              <h5 className="my-0">{product.selectedSize} mm</h5>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Color</span>
              <div
                style={{
                  backgroundColor:
                    product.selectedColor || product.availableColors[0],
                  width: "15px",
                  height: "15px",
                  borderRadius: "50%",
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex-shrink-0 mr-8">
          <h4 className="my-0 font-bold">
            Rs. {product.price * product.quantity}
          </h4>
        </div>
        <button className="self-center " type="button">
          <XMarkIcon className="w-9 h-9 border border-gray-300 hover:bg-gray-100 rounded-md  p-1.5" />
        </button>
      </div>
    </div>
  );
};

export default BasketItem;
