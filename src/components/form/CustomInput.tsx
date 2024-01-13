import React, { forwardRef } from "react";
import { CustomInputProps } from "./interface";
import { twMerge } from "tailwind-merge";

const CustomInput: React.ForwardRefRenderFunction<
  HTMLInputElement,
  CustomInputProps
> = (
  { type = "text", label, name, register, errors, required = false, ...props },
  ref
) => (
  <div>
    <label
      htmlFor={name}
      className="block mb-2 font-medium text-gray-900 dark:text-white"
    >
      {label}
    </label>
    <input
      type={type}
      {...register(name, { required: true })}
      className={twMerge(
        "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 ",
        errors[name] && "border-red-500 focus:ring-red-500 focus:border-0"
      )}
      {...props}
    />
    {/* Add error message display if there is an error */}
    {errors[name] && (
      <span className="text-sm  text-red-500">
        {(errors[name] as any).message}
      </span>
    )}
  </div>
);

export default forwardRef(CustomInput);
