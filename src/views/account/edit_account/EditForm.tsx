import { CustomInput } from "@/components/form";
import { UserProfileInputs } from "@/schemas/profile.schema";
import { useRouter } from "next/navigation";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface EditFormProps {
  isLoading: boolean;
  register: UseFormRegister<UserProfileInputs>;
  errors: FieldErrors;
}

const EditForm: React.FC<EditFormProps> = ({ isLoading, register, errors }) => {
  return (
    <div className="user-profile-details mt-16 flex flex-col gap-6">
      <CustomInput
        register={register}
        errors={errors}
        disabled={isLoading}
        name="full_name"
        type="text"
        label="* Full Name"
        placeholder="Enter your full name"
      />
      <CustomInput
        register={register}
        errors={errors}
        disabled={true}
        name="email"
        type="email"
        label="* Email Address"
        placeholder="test@example.com"
      />
      <CustomInput
        register={register}
        errors={errors}
        disabled={isLoading}
        name="address_city"
        type="text"
        label="Address (Will be used for checkout)"
        placeholder="#245 Brgy. Maligalig, Arayat Pampanga, Philippines"
      />
      {/* <CustomMobileInput
        // disabled={isLoading}
        placeholder="981230912"
        label="Mobile Number (Will be used for checkout)"
      /> */}
      <br />
    </div>
  );
};

export default EditForm;
