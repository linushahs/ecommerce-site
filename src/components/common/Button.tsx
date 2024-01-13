import React, { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { Spinner } from ".";

type ButtonProps = {
  variant?: "default" | "link" | "borderNone" | "borderGray" | "small" | "form";
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const variants = {
  default:
    "rounded-md bg-[var(--button-color)] py-2 px-3 text-[var(--white)] font-medium relative flex items-center justify-center transition-all duration-300 ease-in hover:contrast-[var(--button-hover)] ",
  link: "bg-none text-[var(--black)] border-none hover:bg-none hover:border-none",
  borderNone:
    "w-full flex items-center justify-center bg-transparent text-[var(--button-color)] hover:bg-[var(--border-color)] disabled:bg-[var(--background-color-01)]",
  borderGray:
    "rounded-md py-1.5 px-3 border border-[var(--border-color)] text-[var(--paragraph-color)] hover:border-[var(--border-color)] hover:bg-[var(--button-color-01)] disabled:bg-[var(--background-color-01)]",
  small: "text-[var(--font-small)] p-[var(--s-size)] p-[var(--m-size)]",
  form: "w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg px-5 py-2.5 text-center disabled:bg-primary-700/70",
};

const Button: React.FC<ButtonProps> = ({
  className,
  isLoading = false,
  variant = "default",
  ...props
}) => {
  return (
    <button
      className={twMerge(
        "flex gap-2 justify-center items-center",
        variants[variant],
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading && <Spinner className="w-5 h-5 animate-spin" />}
      {props.children}
    </button>
  );
};

export default Button;
