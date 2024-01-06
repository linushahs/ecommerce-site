import React, { forwardRef } from "react";
import { CustomInputProps } from "./interface";

const CustomInput: React.ForwardRefRenderFunction<
  HTMLInputElement,
  CustomInputProps
> = ({ label, name, register, required = false, ...props }, ref) => (
  <div className="flex flex-1 flex-col">
    <label className="label-input" htmlFor={name}>
      {label}
    </label>
    <input
      type="text"
      id={name}
      className="py-2 px-3 border border-[var(--border-color-focus)] rounded"
      {...register(name, { required })}
      {...props}
      ref={ref}
    />
  </div>
);

export default forwardRef(CustomInput);
