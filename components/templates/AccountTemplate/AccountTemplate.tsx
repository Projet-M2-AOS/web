import { Footer } from "@components/organisms/Footer";
import { Header } from "@components/organisms/Header";
import { UserInfo } from "@components/organisms/UserInfo";
import { NextSeo } from "next-seo";
import { FC, Fragment } from "react";

export type AccountTemplateProps = {
  //
};

export const AccountTemplate: FC<AccountTemplateProps> = ({}) => (
  <Fragment>
    <NextSeo title="AOShop - Page d'accueil" />
    <Header />
    <main className="container flex flex-col items-center pt-4 pb-8 space-y-6">
      <UserInfo />
    </main>
    <Footer />
  </Fragment>
);
