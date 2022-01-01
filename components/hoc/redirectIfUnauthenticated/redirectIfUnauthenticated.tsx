import { GetDisplayName } from "@lib/react";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";

export type ProtectedPageProps = {
  active: boolean;
};

export const redirectIfUnauthenticated = (Page: NextPage) => {
  const RedirectIfUnauthenticated: FC = (props) => {
    const router = useRouter();
    const { status } = useSession({
      required: false,
    });

    useEffect(() => {
      if (status === "unauthenticated") router.push("/account/auth");
    }, [router, status]);

    if (status === "authenticated") return <Page {...props} />;
    else return null;
  };

  RedirectIfUnauthenticated.displayName = `RedirectIfUnauthenticated(${GetDisplayName(
    Page
  )})`;

  return RedirectIfUnauthenticated;
};
