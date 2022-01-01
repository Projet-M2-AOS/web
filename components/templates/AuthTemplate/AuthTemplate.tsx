import { Link } from "@components/atoms/Link";
import { Logo } from "@components/atoms/Logo";
import { SignInForm, SignUpForm } from "@components/organisms/AuthForm";
import { NextSeo } from "next-seo";
import { FC, Fragment, useState } from "react";

export type AuthTemplateType = "SignUp" | "SignIn";

export const AuthTemplate: FC = () => {
  const [formType, setFormType] = useState<AuthTemplateType>("SignIn");

  return (
    <Fragment>
      <NextSeo title="AOShop - Authentification" />
      <main className="flex flex-col items-center justify-center min-h-screen p-4">
        <Link href="/" className="mb-3">
          <Logo className="w-32 h-auto fill-primary-700" />
        </Link>
        {formType === "SignIn" ? (
          <SignInForm switchFormType={() => setFormType("SignUp")} />
        ) : (
          <SignUpForm switchFormType={() => setFormType("SignIn")} />
        )}
      </main>
    </Fragment>
  );
};
