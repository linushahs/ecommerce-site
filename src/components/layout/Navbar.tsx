"use client";

import { useAppDispatch, useAppSelector } from "@/redux/store";
import UserAvatar from "@/views/account/components/UserAvatar";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ShoppingCart from "../basket/ShoppingCart";
import { useEffect } from "react";
import { initializeAuthTokens } from "@/redux/slices/authSlice";

const menuVariants = {
  default:
    "capitalize block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700",
  active:
    "capitalize block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500",
};

const menus = [
  { title: "home", path: "/" },
  { title: "shop", path: "/shop" },
];

function Navbar() {
  const params = usePathname();
  const isAuthenticated = useAppSelector((state) => state.auth.access);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeAuthTokens());
  }, [dispatch]);

  return (
    <nav className="bg-gray-100 dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b-2 border-gray-200 dark:border-gray-600">
      <div className="container flex flex-wrap items-center justify-between py-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image src="/images/logo.svg" alt="logo" width={140} height={50} />
        </a>
        <div className="flex md:order-2 gap-3 md:items-center rtl:space-x-reverse">
          {/* cart button --------------  */}
          <ShoppingCart />

          {isAuthenticated ? (
            // user avatar icon --------------
            <UserAvatar />
          ) : (
            <>
              <Link
                href="/login"
                className="block ml-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Signup
              </Link>
            </>
          )}
          {/* navbar menu: bars for mobile screen ------------------ */}
          {/* --------------------------------------------------- */}
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-200 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {menus.map(({ title, path }) => (
              <li key={title}>
                <Link
                  href={path}
                  className={
                    params === path ? menuVariants.active : menuVariants.default
                  }
                  aria-current="page"
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
