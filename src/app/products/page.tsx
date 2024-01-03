"use client";

import { filters, sortOptions, subCategories } from "@/components/utils/constants";
import {
  FunnelIcon,
  Squares2X2Icon
} from "@heroicons/react/20/solid";
import {MobileFilterDialog, ProductGrid, SortMenu, FilterSection} from "components/products";
import { useState } from "react";

export default function Example() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
    <section className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <MobileFilterDialog
          open={mobileFiltersOpen}
          onClose={() => setMobileFiltersOpen(false)}
        />

        <main className="mx-auto max-w-screen-xl px-4">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              New Arrivals
            </h1>

            <div className="flex items-center">
              <SortMenu sortOptions={sortOptions}/>

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
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <a href={category.href}>{category.name}</a>
                    </li>
                  ))}
                </ul>

                {filters.map((section) => (
                  <FilterSection section={section} />
                ))}
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
