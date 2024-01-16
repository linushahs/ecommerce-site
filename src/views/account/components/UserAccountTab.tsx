import { Button } from "@/components/common";
import { ACCOUNT_EDIT } from "@/constants/routes";
import { useAppSelector } from "@/redux/store";
import Image from "next/image";
import { useRouter } from "next/navigation";

const UserProfile: React.FC = () => {
  const profile = useAppSelector((state) => state.profile);
  const router = useRouter();

  const handleEditAccount = (): void => {
    router.push(ACCOUNT_EDIT);
  };

  return (
    <div className="user-profile">
      <div className="user-profile-block">
        <div className="user-profile-banner">
          <div className="user-profile-banner-wrapper bg-gray-200 rounded-md">
            <Image
              alt="Banner"
              className="user-profile-banner-img"
              src={profile.banner}
              width={100}
              height={100}
              loading="lazy"
            />
          </div>
          <div className="user-profile-avatar-wrapper">
            <Image
              alt="Avatar"
              className="user-profile-img"
              src={profile.avatar}
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
          <h2 className="user-profile-name">{profile.fullname}</h2>
          <span>Email</span>
          <h5>{profile.email}</h5>
          <span>Address</span>
          {profile.address ? (
            <h5>{profile.address}</h5>
          ) : (
            <h5 className="text-subtle text-italic">Address not set</h5>
          )}
          <span>Mobile</span>
          {profile.mobile ? (
            <h5>{profile.mobile.value}</h5>
          ) : (
            <h5 className="text-subtle text-italic">Mobile not set</h5>
          )}
          <span>Date Joined</span>
          {profile.dateJoined ? (
            <h5>{profile.dateJoined}</h5>
          ) : (
            <h5 className="text-subtle text-italic">Not available</h5>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
