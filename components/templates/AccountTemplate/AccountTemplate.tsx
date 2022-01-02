import { CreateProductForm } from "@components/organisms/CreateProductForm";
import { Footer } from "@components/organisms/Footer";
import { Header } from "@components/organisms/Header";
import { ManageUsers } from "@components/organisms/ManageUsers";
import { UserComments } from "@components/organisms/UserComments";
import { UserInfo } from "@components/organisms/UserInfo";
import { UserOrders } from "@components/organisms/UserOrders";
import { UserProductLists } from "@components/organisms/UserProductLists";
import { UserRatings } from "@components/organisms/UserRatings";
import { User } from "@customTypes/user";
import { getUser } from "@lib/services/user/getUser";
import { useSession } from "next-auth/react";
import { NextSeo } from "next-seo";
import { FC, Fragment, useEffect, useState } from "react";

export const AccountTemplate: FC = () => {
  const { data: session } = useSession();
  const [currentuser, setCurrentUser] = useState<User | undefined>();

  useEffect(() => {
    if (session) getUser(session.user.id).then(setCurrentUser);
  }, [session]);

  return (
    <Fragment>
      <NextSeo title="AOShop - Page d'accueil" />
      <Header />
      <main className="container flex flex-col items-center pt-4 pb-8 space-y-6">
        {currentuser && <UserInfo user={currentuser} />}
        <UserOrders />
        <UserComments />
        <UserProductLists />
        <UserRatings />
        <ManageUsers />
        <CreateProductForm />
      </main>
      <Footer />
    </Fragment>
  );
};
