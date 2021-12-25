import { Link } from "@components/atoms/Link";
import { Logo } from "@components/atoms/Logo";
import { AuthForm } from "@components/organisms/AuthForm";
import { NextSeo } from "next-seo";
import { FC, Fragment } from "react";

export const AuthTemplate: FC = () => (
  <Fragment>
    <NextSeo title="AOShop - Authentification" />
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <Link href="/" className="mb-3">
        <Logo className="w-32 h-auto fill-primary-700" />
      </Link>
      <AuthForm />
    </main>
  </Fragment>
);
