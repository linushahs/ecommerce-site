import { Button, Spinner } from "@/components/common";
import { ACCOUNT } from "@/constants/routes";
import { useFileHandler } from "@/hooks";
import { ImageFileType } from "@/hooks/useFilehandler";
import { useUpdateUserProfileMutation } from "@/redux/api/profileSlice.api";
import { useAppSelector } from "@/redux/store";
import { UserProfileInputs, userProfileSchema } from "@/schemas/profile.schema";
import {
  ArrowLeftIcon,
  CheckIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import EditForm from "./EditForm";

const EditProfile: React.FC = () => {
  const router = useRouter();

  const { profile, loading } = useAppSelector((state) => ({
    profile: state.profile.data,
    loading: state.profile.loading,
  }));

  const { imageFile, isFileLoading, onFileChange } = useFileHandler({
    avatar: null,
    banner: null,
  });

  const [updateUserProfileMn, { isLoading: isUpdating }] =
    useUpdateUserProfileMutation();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserProfileInputs>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      full_name: profile.full_name || "",
      email: profile.email || "",
      address_city: profile.address_city || "",
      phone_number: profile.phone_number || "",
    },
  });

  const onSubmit: SubmitHandler<UserProfileInputs> = (data) => {
    const fieldsChanged = Object.keys(data).some((key) => {
      const Ikey = key as keyof UserProfileInputs;

      return profile[Ikey] !== undefined && profile[Ikey] !== data[Ikey];
    });

    if (fieldsChanged || Boolean(imageFile.avatar)) {
      if (data.email === profile.email) {
        updateUserProfile(data);
      }
    }
  };

  const updateUserProfile = async (data: UserProfileInputs) => {
    try {
      const profilePic = (imageFile?.avatar as ImageFileType).file;

      const formData = new FormData();
      Object.entries({ ...data }).forEach(([key, value]) => {
        formData.append(key, value as string);
      });

      profilePic && formData.append("profile_picture", profilePic);

      updateUserProfileMn({ id: profile.id || "", body: formData });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="edit-user mt-[var(--navbar-height)] mb-12 rounded-md ">
      <h3 className="text-center text-xl font-bold">Edit Account Details</h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="user-profile-banner">
          <div className="user-profile-banner-wrapper">
            <div className="bg-gray-100 w-full h-[160px] rounded-lg mt-4"></div>
            {/* <Image
            alt="Banner"
            className="user-profile-banner-img bg-gray-100"
            src={
              (Array.isArray(imageFile.banner)
                ? imageFile.banner[0]?.url
                : imageFile.banner?.url) || ""
            }
            width={800}
            height={200}
          /> */}
            {/* 
            {isFileLoading ? (
              <div className="loading-wrapper">
                <Spinner />
              </div>
            ) : (
              <label
                className="edit-button edit-banner-button"
                htmlFor="edit-banner"
              >
                <input
                  accept="image/x-png,image/jpeg"
                  hidden
                  id="edit-banner"
                  onChange={(e) =>
                    onFileChange(e, { name: "banner", type: "single" })
                  }
                  type="file"
                />
                <PencilSquareIcon className="w-6 h-6" />
              </label>
            )} */}
          </div>
          <div className="user-profile-avatar-wrapper">
            <Image
              alt="Avatar"
              className="user-profile-img"
              src={
                (imageFile.avatar as ImageFileType)?.url ||
                (profile.profile_picture as string) ||
                ""
              }
              width={100}
              height={100}
            />
            {isFileLoading ? (
              <div className="loading-wrapper">
                <Spinner />
              </div>
            ) : (
              <label
                className="edit-button edit-avatar-button"
                htmlFor="edit-avatar"
              >
                <input
                  accept="image/x-png,image/jpeg"
                  hidden
                  id="edit-avatar"
                  onChange={(e) =>
                    onFileChange(e, { name: "avatar", type: "single" })
                  }
                  type="file"
                />
                <PencilSquareIcon className="w-5 h-5" />
              </label>
            )}
          </div>
        </div>
        <EditForm
          isLoading={loading || false}
          register={register}
          errors={errors}
        />

        <div className="edit-user-action">
          <Button
            variant="muted"
            disabled={loading}
            onClick={() => router.push(ACCOUNT)}
            type="button"
          >
            <ArrowLeftIcon className="w-6 h-6" />
            Back to Profile
          </Button>
          <Button
            className="button w-100-mobile"
            disabled={isUpdating}
            type="submit"
          >
            {isUpdating ? (
              <Spinner className="w-5 h-5 text-white" />
            ) : (
              <CheckIcon className="w-5 h-5" />
            )}

            {isUpdating ? "Updating Profile" : "Update Profile"}
          </Button>
        </div>
      </form>
      {/* <ConfirmModal onConfirmUpdate={onConfirmUpdate} modal={modal} /> */}
    </div>
  );
};

export default EditProfile;
