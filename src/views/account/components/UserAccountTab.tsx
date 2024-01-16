import { Button } from "@/components/common";
import { ACCOUNT_EDIT } from "@/constants/routes";
import { useGetUserProfileQuery } from "@/redux/api/profileSlice.api";
import Image from "next/image";
import { useRouter } from "next/navigation";

const UserProfile: React.FC = () => {
  const { data: profile, isLoading, error, isError } = useGetUserProfileQuery();
  const router = useRouter();

  const handleEditAccount = (): void => {
    router.push(ACCOUNT_EDIT);
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    console.log(error);
  }

  return (
    <div className="user-profile">
      <div className="user-profile-block">
        <div className="user-profile-banner">
          <div className="user-profile-banner-wrapper bg-gray-200 rounded-md">
            <Image
              alt="Banner"
              className="user-profile-banner-img"
              src={""}
              width={100}
              height={100}
              loading="lazy"
            />
          </div>
          <div className="user-profile-avatar-wrapper">
            <Image
              alt="Avatar"
              className="user-profile-img"
              src={profile?.profile_picture || ""}
              width={80}
              height={80}
            />
          </div>
          <Button
            variant="default"
            className="user-profile-edit !absolute"
            onClick={handleEditAccount}
            type="button"
          >
            Edit Account
          </Button>
        </div>
        <div className="user-profile-details mt-16 px-4 pb-6">
          <h2 className="user-profile-name">{profile?.full_name}</h2>
          <span>Email</span>
          <h5>{profile?.email}</h5>
          <span>Address</span>
          {profile?.address_city ? (
            <h5>{profile?.address_city}</h5>
          ) : (
            <h5 className="text-subtle text-italic">Address not set</h5>
          )}
          <span>Mobile</span>
          {profile?.phone_number ? (
            <h5>{profile?.phone_number}</h5>
          ) : (
            <h5 className="text-subtle text-italic">Mobile not set</h5>
          )}
          <span>Date Joined</span>
          {profile?.date_joined ? (
            <h5>{profile?.date_joined}</h5>
          ) : (
            <h5 className="text-subtle text-italic">Not available</h5>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
