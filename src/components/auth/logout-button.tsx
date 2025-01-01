"use client";
import { Button, ButtonProps } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React from "react";

const LogoutButton = ({
  children,
  ...props
}: ButtonProps & { children: React.ReactNode }) => {
  const { push } = useRouter();

  const logoutUser = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => push("/auth/login"),
      },
    });
  };

  return (
    <Button {...props} onClick={logoutUser}>
      {children}
    </Button>
  );
};

export default LogoutButton;
