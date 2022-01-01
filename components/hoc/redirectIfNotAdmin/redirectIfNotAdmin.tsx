import { GetDisplayName } from "@lib/react";
import axios from "axios";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { Role } from "types/next-auth";

export const redirectIfNotAdmin = (Page: NextPage) => {
  const RedirectIfNotAdmin: FC = (props) => {
    const router = useRouter();
    const { status } = useSession({
      required: false,
    });
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

    useEffect(() => {
      axios
        .get<{ role: Role }>("/api/user/role")
        .then(({ data }) => setIsAdmin(data.role === Role.ADMIN));
    }, []);

    useEffect(() => {
      if (isAdmin === false || status === "unauthenticated") router.push("/");
    }, [isAdmin, router, status]);

    if (isAdmin) return <Page {...props} />;
    else return null;
  };

  RedirectIfNotAdmin.displayName = `RedirectIfNotAdmin(${GetDisplayName(
    Page
  )})`;

  return RedirectIfNotAdmin;
};
