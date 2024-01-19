import { Spinner } from "@/components/common";
import { useFileHandler } from "@/hooks";
import { useAppSelector } from "@/redux/store";
import { UserProfileInputs, userProfileSchema } from "@/schemas/profile.schema";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import EditForm from "./EditForm";

const EditProfile: React.FC = () => {
  const dispatch = useDispatch();

  const { profile } = useAppSelector((state) => ({
    profile: state.profile,
  }));

  const { imageFile, isFileLoading, onFileChange } = useFileHandler({
    avatar: null,
    banner: null,
  });

  const { handleSubmit, control } = useForm<UserProfileInputs>({
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

      return (
        profile[Ikey] !== undefined &&
        profile[Ikey] !== data[Ikey]
      );
    });

    if (fieldsChanged || Boolean(imageFile?.banner || imageFile.avatar)) {
      if (data.email === profile.email) {
        updateProfile(data);
      }
    }
  };

  const updateProfile = (data: UserProfileInputs) => {};

  return (
    <div className="edit-user mt-[var(--navbar-height)] mb-12 rounded-md ">
      <h3 className="text-center">Edit Account Details</h3>

      <div className="user-profile-banner">
        <div className="user-profile-banner-wrapper">
          <Image
            alt="Banner"
            className="user-profile-banner-img bg-gray-100"
            src={
              (Array.isArray(imageFile.banner)
                ? imageFile.banner[0]?.url
                : imageFile.banner?.url) || ""
            }
            width={800}
            height={200}
          />

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
          )}
        </div>
        <div className="user-profile-avatar-wrapper">
          <Image
            alt="Avatar"
            className="user-profile-img"
            src={
              (Array.isArray(imageFile.avatar)
                ? imageFile.avatar[0]?.url
                : imageFile.avatar?.url) || profile.profile_picture
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
              <PencilSquareIcon className="w-6 h-6" />
            </label>
          )}
        </div>
      </div>
      <EditForm authProvider={auth.provider} />
      {/* <ConfirmModal onConfirmUpdate={onConfirmUpdate} modal={modal} /> */}
    </div>
  );
};

export default EditProfile;
