import {
  ArrowLeftOutlined,
  CheckOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { CustomInput, CustomMobileInput } from "@/components/form";
import { ACCOUNT } from "@/constants/routes";
import { Field, useFormikContext } from "formik";
import PropType from "prop-types";
import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Spinner } from "@/components/common";
import { CheckIcon } from "@heroicons/react/20/solid";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

const EditForm = ({ isLoading, authProvider }) => {
  const router = useRouter();

  return (
    <div className="user-profile-details">
      <CustomInput
        disabled={isLoading}
        name="fullname"
        type="text"
        label="* Full Name"
        placeholder="Enter your full name"
      />
      <CustomInput
        disabled={true}
        name="email"
        type="email"
        label="* Email Address"
        placeholder="test@example.com"
      />
      <CustomInput
        disabled={isLoading}
        name="address"
        type="text"
        label="Address (Will be used for checkout)"
        placeholder="#245 Brgy. Maligalig, Arayat Pampanga, Philippines"
      />
      <CustomMobileInput
        defaultValue={values.mobile}
        name="mobile"
        disabled={isLoading}
        label="Mobile Number (Will be used for checkout)"
      />
      <br />
      <div className="edit-user-action">
        <Button
          variant="muted"
          disabled={isLoading}
          onClick={() => router.push(ACCOUNT)}
          type="button"
        >
          <ArrowLeftIcon className="w-6 h-6" />
          &nbsp; Back to Profile
        </Button>
        <button
          className="button w-100-mobile"
          disabled={isLoading}
          onClick={submitForm}
          type="button"
        >
          {isLoading ? <Spinner /> : <CheckIcon className="w-5 h-5" />}
          &nbsp;
          {isLoading ? "Updating Profile" : "Update Profile"}
        </button>
      </div>
    </div>
  );
};

EditForm.propTypes = {
  isLoading: PropType.bool.isRequired,
  authProvider: PropType.string.isRequired,
};

export default EditForm;
