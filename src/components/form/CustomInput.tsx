import React from "react";
import { CustomInputProps } from "./interface";

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  name,
  register,
  required = false,
  ...props
}) => (
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
    />
  </div>
);

export default CustomInput;
