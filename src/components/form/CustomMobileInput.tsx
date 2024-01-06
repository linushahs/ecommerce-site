import React from "react";
import PhoneInput, { CountryData } from "react-phone-input-2";
import { CustomMobileInputProps } from "./interface";

const CustomMobileInput: React.FC<CustomMobileInputProps> = ({
  label = "Mobile Number",
  placeholder = "09254461351",
  defaultValue,
  setValue,
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
      <PhoneInput
        country="np"
        inputClass="w-full py-2 px-3 border border-[var(--border-color-focus)] rounded mt-1"
        placeholder={placeholder}
        value={""}
        specialLabel="Mobile number"
        onChange={onInputChange}
      />
    </div>
  );
};

export default CustomMobileInput;
