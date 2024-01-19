import React from "react";
import PhoneInput, { CountryData } from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { CustomMobileInputProps } from "./interface";

const CustomMobileInput: React.FC<CustomMobileInputProps> = ({
  label = "Mobile Number",
  placeholder = "09254461351",
  defaultValue,
}) => {
  const onInputChange = (value: string, data: CountryData) => {
    const mob = {
      dialCode: data.dialCode,
      countryCode: data.countryCode,
      country: data.name,
      value,
    };

    setValue(data.name, value);
  };

  return (
    <div className="flex-1">
      <label
        htmlFor={"phoneNumber"}
        className="block mb-2 font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <PhoneInput
        country="np"
        containerClass="rounded-md min-h-full"
        inputClass="sm:!text-sm bg-gray-50 border border-gray-300 text-gray-900 !rounded-lg focus:outline-none focus:ring-primary-600 !w-full !h-full !py-[11.3px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500"
        dropdownClass="!rounded-lg"
        placeholder={placeholder}
        specialLabel="Mobile number"
        onChange={onInputChange}
      />
    </div>
  );
};

export default CustomMobileInput;
