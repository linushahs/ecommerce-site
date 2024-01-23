import { useRemoveFromCartMutation } from "@/redux/api/cartSlice.api";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import BasketItemControl from "./BasketItemControl";
import { BasketItemProps } from "./interface";

const BasketItem: React.FC<BasketItemProps> = ({ product }) => {
  const {
    title,
    cover_image,
    id,
    slug,
    price,
    quantity,
    selectedColor,
    selectedSize,
  } = product;

  const [removeFromCartMn] = useRemoveFromCartMutation();

  return (
    <div className=" border border-gray-300 pr-4 rounded-md transition-transform ease-in duration-200 transform hover:scale-[1.02] flex gap-2 overflow-hidden">
      {<BasketItemControl product={product} />}

      <div className="flex flex-1 items-center py-1.5">
        <div className="w-28 h-28 mr-2 relative">
          <Image
            alt={title}
            className="w-full h-full object-contain"
            src={cover_image}
            width={300}
            height={200}
          />
        </div>
        <div className="flex-1">
          <Link
            href={`/product/${slug}`}
            onClick={() => document.body.classList.remove("is-basket-open")}
          >
            <h4 className="underline mb-4 w-36 whitespace-nowrap overflow-hidden text-ellipsis relative font-semibold text-lg">
              {title}
            </h4>
          </Link>
          <div className="grid grid-cols-3">
            <div>
              <span className="text-gray-500 text-sm">Quantity</span>
              <h5 className="my-0">{quantity}</h5>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Size</span>
              <h5 className="my-0 text-sm font-semibold">{selectedSize}</h5>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Color</span>
              <div
                style={{
                  backgroundColor: selectedColor,
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
            Rs. {(price * quantity).toFixed(2)}
          </h4>
        </div>

        <button
          onClick={() => removeFromCartMn({ product_id: id })}
          className="self-center "
          type="button"
        >
          <XMarkIcon className="w-9 h-9 border border-gray-300 hover:bg-gray-100 rounded-md  p-1.5" />
        </button>
      </div>
    </div>
  );
};

export default BasketItem;
