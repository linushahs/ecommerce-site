"use client";

import withAuth from "@/components/hoc/withAuth";
import EditProfile from "@/views/account/edit_account";
import React from "react";

function AccountEditPage() {
  return <EditProfile />;
}

export default withAuth(AccountEditPage);
