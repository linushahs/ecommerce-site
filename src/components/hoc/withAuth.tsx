import { useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const AuthenticatedComponent: React.FC<P> = (props) => {
    const isAuthenticated = useAppSelector((state) => state.auth.access);
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated) {
        // Redirect to the login page if the user is not authenticated
        router.push("/login");
      }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
      // You can show a loading spinner or some other UI while checking authentication
      return <div>Loading...</div>;
    }

    // Render the wrapped component if the user is authenticated
    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
