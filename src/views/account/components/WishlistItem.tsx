import { Product } from "@/redux/slices/interface";
import { useAppDispatch } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";

interface WishlistItemProps {
  product: Product;
}

const WishlistItem: React.FC<WishlistItemProps> = ({ product }) => {
  const { title, cover_image, slug } = product;

  const dispatch = useAppDispatch();

  return (
    <div className=" border border-gray-300 pr-4 rounded-md transition-transform ease-in duration-200 transform hover:scale-[1.02] flex gap-4 overflow-hidden">
      <div className="flex flex-1 items-center p-1.5">
        <div className="w-28 h-28 mr-4 relative">
          <Image
            alt={title}
            className="w-full h-full object-cover rounded-md"
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
            <h4 className="underline mb-4 w-36 whitespace-nowrap overflow-hidden text-ellipsis relative font-semibold text-lg capitalize">
              {title}
            </h4>
          </Link>

          <div className="grid grid-cols-3">
            <div>
              <span className="text-gray-500 text-sm">Quantity</span>
              <h5 className="my-0">2</h5>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Size</span>
              <h5 className="my-0 text-sm font-semibold">lg</h5>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Color</span>
              <div
                style={{
                  backgroundColor: "gray",
                  width: "15px",
                  height: "15px",
                  borderRadius: "50%",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistItem;
