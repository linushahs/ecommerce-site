"use client";

import withAuth from "@/components/hoc/withAuth";
import UserAccount from "@/views/account/user_account";
import React from "react";

function UserAccountPage() {
  return <UserAccount />;
}

export default withAuth(UserAccountPage);
