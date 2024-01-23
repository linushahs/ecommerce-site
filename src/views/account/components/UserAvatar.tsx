"use client";

import { ACCOUNT } from "@/constants/routes";
import { useGetUserProfileQuery } from "@/redux/api/profileSlice.api";
import { logout } from "@/redux/slices/authSlice";
import { useAppDispatch } from "@/redux/store";
import {
  ArrowRightStartOnRectangleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

const UserAvatar = () => {
  const { data: profile, isLoading } = useGetUserProfileQuery();
  const userNav = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const toggleDropdown = (e: any) => {
    const closest = e.target.closest("div.user-nav");

    try {
      if (!closest && userNav.current?.classList.contains("user-sub-open")) {
        userNav.current?.classList.remove("user-sub-open");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onClickNav = () => {
    userNav.current?.classList.toggle("user-sub-open");
  };

  useEffect(() => {
    document.addEventListener("click", toggleDropdown);

    return () => document.removeEventListener("click", toggleDropdown);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="user-nav"
      onClick={onClickNav}
      ref={userNav}
      role="button"
      tabIndex={0}
    >
      <h5 className="text-overflow-ellipsis">
        {profile?.full_name && profile?.full_name.split(" ")[0]}
      </h5>
      <div className="user-nav-img-wrapper">
        <Image
          alt="profile avatar"
          className="user-nav-img"
          src={(profile?.profile_picture as string) || ""}
          width={60}
          height={60}
        />
      </div>

      <div className="user-nav-sub">
        <Link
          href={ACCOUNT}
          className="user-nav-sub-link border-b border-gray-100"
        >
          View Account
          <UserIcon className="w-5 h-5" />
        </Link>

        <div
          className="user-nav-sub-link m-0 flex"
          onClick={() => dispatch(logout())}
        >
          Sign Out
          <ArrowRightStartOnRectangleIcon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default UserAvatar;
