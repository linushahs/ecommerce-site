"use client";

import { FormEvent } from "react";
import { footMenu } from "@/constants";
import SocialIcons from "../common/SocialIcons";
import Image from "next/image";

const Footer = () => {
  // const [subValue, setSubValue] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // setSubValue("");
    alert("Thankyou, you are subscribed to receive our daily newsletter");
  };

  const currYear = new Date().getFullYear();

  return (
    <footer className="bg-black py-10 ">
      <div className="container flex justify-between items-center">
        <div className="w-[25%] -mt-5">
          <h2>
            <a className="text-white text-3xl" href="/">
              Sneakers
            </a>
          </h2>
          <p className="text-white my-4 text-sm opacity-80">
            Subscribe to our Email alerts to receive early discount offers, and
            new products info.
          </p>
          <form>
            <input
              type="email"
              className="bg-gray-100 border border-gray-300 w-full px-3 py-2 rounded-md  "
              placeholder="Email Address*"
              required
              // value={subValue}
              // onChange={(e) => setSubValue(e.target.value)}
            />
            <button
              type="submit"
              className="text-white bg-primary mt-4 rounded-md px-4 py-1.5  hover:contrast-75"
            >
              Subscribe
            </button>
          </form>
        </div>
        {footMenu.map((item) => {
          const { id, title, menu } = item;
          return (
            <div className="text-white" key={id}>
              <h4 className="underline text-lg font-semibold">{title}</h4>
              <ul className=" mt-7 grid gap-4">
                {menu.map((item) => {
                  const { id, link, path } = item;
                  return (
                    <li key={id}>
                      <a
                        className="flex   text-sm hover:text-primary"
                        href={path}
                      >
                        {link}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="container mt-12 mb-4 border-t border-gray-700 pt-6 flex justify-between items-center ">
        <p className="text-sm font-normal text-gray-400">
          {currYear} | XBeat. All Rights Reserved.
        </p>
        <SocialIcons />
      </div>
    </footer>
  );
};

export default Footer;
