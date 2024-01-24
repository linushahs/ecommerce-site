import { Checkbox, CustomInput, CustomMobileInput } from "@/components/form";
import { useForm } from "react-hook-form";
import { ShippingFormProps } from "../interface";

//local component style ------------
// ---------------------------------
const checkoutFieldset = "flex gap-4 mt-6 *:flex-1";

const ShippingForm: React.FC<ShippingFormProps> = ({ register, errors }) => {
  // const { values } = useFormState({ control });
  // const isInternational = useWatch({
  //   control,
  //   name: "isInternational",
  //   defaultValue: values.isInternational,
  // });

  return (
    <div className="flex items-center">
      <div className="w-full mt-2">
        <div className={checkoutFieldset}>
          <CustomInput
            name="fullname"
            label="Full Name*"
            placeholder="Enter your full name"
            register={register}
            errors={errors}
          />
          <CustomInput
            name="email"
            label="Email Address*"
            placeholder="Enter your email address"
            register={register}
            errors={errors}
          />
        </div>
        <div className={checkoutFieldset}>
          <CustomInput
            name="address"
            label="Shipping Address*"
            placeholder="Enter full shipping address"
            register={register}
            errors={errors}
          />
          <CustomMobileInput />
        </div>
        <div className={checkoutFieldset}>
          <div className="w-full ">
            <label className="label-input" htmlFor="isInternational">
              Shipping Option
            </label>
            <div className="flex items-center justify-between py-4 px-3 border border-[var(--border-color)] bg-gray-100 rounded-md">
              <Checkbox id="isInternational" {...register("isInternational")} />
              <label className="flex w-full" htmlFor="isInternational">
                <h5 className="flex-1 m-0">
                  &nbsp; International Shipping &nbsp;
                  <span className="text-sm">7-14 days</span>
                </h5>
                <h4 className="m-0">$50.00</h4>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingForm;
