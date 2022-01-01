import { GetDisplayName } from "@lib/react";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";

export const redirectIfAuthenticated = (Page: NextPage) => {
  const RedirectIfAuthenticated: FC = (props) => {
    const router = useRouter();
    const { status } = useSession({
      required: false,
    });

    useEffect(() => {
      if (status === "authenticated") router.push("/account");
    }, [router, status]);

    if (status === "unauthenticated") return <Page {...props} />;
    else return null;
  };

  RedirectIfAuthenticated.displayName = `RedirectIfAuthenticated(${GetDisplayName(
    Page
  )})`;

  return RedirectIfAuthenticated;
};
