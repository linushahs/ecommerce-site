import { Checkbox, CustomInput, CustomMobileInput } from "@/components/form";
import { useForm } from "react-hook-form";

//local component style ------------
// ---------------------------------
const checkoutFieldset = "flex gap-4 items-center mt-6";

const ShippingForm = () => {
  const { register, control, setValue } = useForm();
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
          />
          <CustomInput
            name="email"
            label="Email Address*"
            placeholder="Enter your email address"
            register={register}
          />
        </div>
        <div className={checkoutFieldset}>
          <CustomInput
            name="address"
            label="Shipping Address*"
            placeholder="Enter full shipping address"
            register={register}
          />
          <CustomMobileInput setValue={setValue} />
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
