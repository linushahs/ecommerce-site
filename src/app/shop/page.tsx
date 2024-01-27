"use client";

import { sortOptions } from "@/constants/";
import { useGetCategoriesQuery } from "@/redux/api/productSlice.api";
import { FunnelIcon, Squares2X2Icon } from "@heroicons/react/20/solid";
import { MobileFilterDialog, ProductGrid, SortMenu } from "components/products";
import { debounce } from "lodash";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

const priceInput = "flex-1 w-full rounded-md border border-gray-300 px-3 p-2";

export default function ShopPage() {
  const searchParams = useSearchParams();
  const params = searchParams.get("category");
  const queryPath = searchParams.has("category") ? `?category=${params}&` : "?";
  const pathname = usePathname() + queryPath;

  const defaultPriceRange = {
    lowPrice: searchParams.get("lp"),
    highPrice: searchParams.get("hp"),
  };
J
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [prices, setPrices] = useState(defaultPriceRange);
  const router = useRouter();

  const { data: categories } = useGetCategoriesQuery();

  // Handle low and high price change
  // =====================================
  const pricesRef = useRef({ lowPrice: "0", highPrice: "1000" });

  useEffect(() => {
    // Update the ref whenever prices state changes
    pricesRef.current = prices;
  }, [prices]);

  // Whenever path changes price range goes to default
  useEffect(() => {
    setPrices(defaultPriceRange);
  }, [pathname]);

  const debouncePriceChange = debounce(() => {
    // Trigger the actual price change after the debounce period
    router.push(
      queryPath +
        `lp=${pricesRef.current.lowPrice}&` +
        `hp=${pricesRef.current.highPrice}`
    );
  }, 500); // Adjust the debounce delay as needed

  const handleLowPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newLowPrice = e.target.value;
    setPrices((currPrices) => ({ ...currPrices, lowPrice: newLowPrice }));
    debouncePriceChange();
  };

  const handleHighPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newHighPrice = e.target.value;
    setPrices((currPrices) => ({ ...currPrices, highPrice: newHighPrice }));
    debouncePriceChange();
  };

  return (
    <section className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <MobileFilterDialog
          open={mobileFiltersOpen}
          onClose={() => setMobileFiltersOpen(false)}
        />

        <main className="container">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              New Arrivals
            </h1>

            <div className="flex items-center">
              <SortMenu pathname={pathname} sortOptions={sortOptions} />

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
              {/* Filters */}
              <form className="hidden lg:block text-black">
                <h3 className="sr-only">Categories</h3>
                <ul
                  role="list"
                  className="space-y-4 pb-6 text-sm font-medium text-black"
                >
                  {categories?.map(({ name, slug }) => (
                    <li key={slug}>
                      <Link
                        href={`/shop?category=${slug}`}
                        className={twMerge(
                          "capitalize text-base",
                          params === slug && "font-semibold text-primary"
                        )}
                      >
                        {name}
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Price range section -----------------  */}
                <div className="border-t border-gray-200 py-4">
                  <h3 className="font-medium text-gray-600">Price</h3>

                  <div className="w-full flex gap-3 mt-2 items-center">
                    <input
                      type="number"
                      name="low-price"
                      placeholder="1000"
                      className={priceInput}
                      value={prices.lowPrice}
                      onChange={handleLowPriceChange}
                    />
                    to
                    <input
                      type="number"
                      name="high-price"
                      placeholder="20,000"
                      className={priceInput}
                      value={prices.highPrice}
                      onChange={handleHighPriceChange}
                    />
                  </div>
                </div>
                {/* <FilterSection
                    section={{ name: "price", options: categories }}
                  /> */}
              </form>

              {/* Product grid */}
              <ProductGrid />
            </div>
          </section>
        </main>
      </div>
    </section>
  );
}
