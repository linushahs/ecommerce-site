"use client";

import { BasketItem } from "@/components/basket";
import { useGetUserWishlistQuery } from "@/redux/api/profileSlice.api";
import React from "react";
import WishlistItem from "./WishlistItem";

const UserWishListTab = () => {
  const { data: userWishlist, isLoading } = useGetUserWishlistQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className=" h-[60vh]">
      {userWishlist?.length === 0 && (
        <>
          <h3 className="text-gray-500">My Wish List</h3>
          <strong>
            <span className="text-subtle">You don&apos;t have a wish list</span>
          </strong>
        </>
      )}

      <div className="flex flex-col gap-4">
        {userWishlist?.map((p) => (
          <WishlistItem key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
};

export default UserWishListTab;
