import { ACCOUNT } from "@/constants/routes";
import {
  ArrowRightStartOnRectangleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

const UserAvatar = () => {
  // const { profile, isAuthenticating } = useSelector((state) => ({
  //   profile: state.profile,
  //   isAuthenticating: state.app.isAuthenticating
  // }));
  const userNav = useRef<HTMLDivElement>(null);
  // const dispatch = useDispatch();

  const toggleDropdown = (e: any) => {
    const closest = e.target.closest("div.user-nav");

    try {
      if (!closest && userNav.current?.classList.contains("user-sub-open")) {
        userNav.current?.classList.remove("user-sub-open");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    document.addEventListener("click", toggleDropdown);

    return () => document.removeEventListener("click", toggleDropdown);
  }, []);

  const onClickNav = () => {
    userNav.current?.classList.toggle("user-sub-open");
  };

  // return isAuthenticating ? (
  //   <div className="user-nav">
  //     <span>Signing Out</span>
  //     &nbsp;
  //     <LoadingOutlined />
  //   </div>
  // ) : (
  return (
    <div
      className="user-nav"
      onClick={onClickNav}
      ref={userNav}
      role="button"
      tabIndex={0}
    >
      <h5 className="text-overflow-ellipsis">
        {/* {profile.fullname && profile.fullname.split(" ")[0]} */}
        Sunil Shah
      </h5>
      <div className="user-nav-img-wrapper">
        <Image alt="profile avatar" className="user-nav-img" src={""} />
      </div>

      <div className="user-nav-sub">
        {/* {profile.role !== "ADMIN" && ( */}
        <Link
          href={ACCOUNT}
          className="user-nav-sub-link border-b border-gray-100"
        >
          View Account
          <UserIcon className="w-5 h-5" />
        </Link>
        {/* )} */}
        <h6 className="user-nav-sub-link m-0 flex" role="presentation">
          Sign Out
          <ArrowRightStartOnRectangleIcon className="w-5 h-5" />
        </h6>
      </div>
    </div>
  );
};

export default UserAvatar;
