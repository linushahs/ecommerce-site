import React, { forwardRef, useState } from "react";
import { CustomInputProps } from "./interface";
import { twMerge } from "tailwind-merge";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const CustomInput: React.ForwardRefRenderFunction<
  HTMLInputElement,
  CustomInputProps
> = (
  { type = "text", label, name, register, errors, required = false, ...props },
  ref
) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2 font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <div className="flex justify-between items-center relative">
        <input
          type={showPassword ? "text" : type}
          {...register(name, { required })}
          className={twMerge(
            "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 ",
            errors[name] && "border-red-500 focus:ring-red-500 focus:border-0"
          )}
          {...props}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={handleTogglePassword}
            className="cursor-pointer absolute right-2.5 top-3 text-gray-400"
          >
            {showPassword ? (
              <EyeSlashIcon width={20} height={20} />
            ) : (
              <EyeIcon width={20} height={20} />
            )}
          </button>
        )}
      </div>
      {/* Add error message display if there is an error */}
      {errors[name] && (
        <span className="text-sm  text-red-500">
          {(errors[name] as any).message}
        </span>
      )}
    </div>
  );
};

export default forwardRef(CustomInput);
