import React, { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
  variant?:
    | "default"
    | "disabled"
    | "link"
    | "muted"
    | "block"
    | "borderNone"
    | "danger"
    | "borderGray"
    | "small";
} & ButtonHTMLAttributes<HTMLButtonElement>;

const variants = {
  default:
    "rounded-md bg-[var(--button-color)] py-2 px-3 text-[var(--white)] font-medium relative flex items-center justify-center transition-all duration-300 ease-in hover:contrast-[var(--button-hover)] ",
  disabled: "opacity-50 cursor-not-allowed",
  link: "bg-none text-[var(--black)] border-none hover:bg-none hover:border-none",
  muted:
    "py-2 px-3 rounded-md bg-[var(--background-color-01)] text-[var(--paragraph-color)] border border-[var(--border-color)] hover:bg-[var(--background-color)] hover:border-[var(--border-color-focus)]",
  block: "block w-full",
  borderNone:
    "w-full flex items-center justify-center bg-transparent text-[var(--button-color)] hover:bg-[var(--border-color)] disabled:bg-[var(--background-color-01)]",
  danger: "bg-red text-[var(--white)] hover:bg-[var(--red-darker)]",
  borderGray:
    "rounded-md py-1.5 px-3 border border-[var(--border-color)] text-[var(--paragraph-color)] hover:border-[var(--border-color)] hover:bg-[var(--button-color-01)] disabled:bg-[var(--background-color-01)]",
  small: "text-[var(--font-small)] p-[var(--s-size)] p-[var(--m-size)]",
};

const Button: React.FC<ButtonProps> = ({
  className,
  variant = "default",
  ...props
}) => {
  return (
    <button
      className={twMerge(
        "flex gap-2 items-center",
        variants[variant],
        className
      )}
      {...props}
    >
      {props.children}
    </button>
  );
};

export default Button;
