import { Button } from "@components/atoms/Button";
import { TextInput } from "@components/atoms/TextInput";
import { useForm } from "@mantine/hooks";
import { signIn } from "next-auth/react";
import type { FC } from "react";

export type SignInFormProps = {
  switchFormType: () => void;
};

export const SignInForm: FC<SignInFormProps> = ({ switchFormType }) => {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validationRules: {
      email: (value) => /^\S+@\S+$/.test(value),
      password: (value) => value.length >= 4,
    },
  });

  return (
    <form
      className="flex flex-col items-center w-full max-w-sm px-4 pt-5 pb-4 space-y-4 bg-white border rounded-md border-neutral-200"
      onSubmit={form.onSubmit(({ email, password }) =>
        signIn("credentials", {
          callbackUrl: "/",
          redirect: true,
          email,
          password,
        })
      )}
    >
      <TextInput
        label="Adresse email"
        type="email"
        error={Boolean(form.errors.email)}
        value={form.values.email}
        onChange={(event) =>
          form.setFieldValue("email", event.currentTarget.value)
        }
      />
      <TextInput
        label="Mot de passe"
        type="password"
        error={Boolean(form.errors.password)}
        value={form.values.password}
        onChange={(event) =>
          form.setFieldValue("password", event.currentTarget.value)
        }
      />
      <Button widthFull type="submit">
        Connexion
      </Button>
      <p className="leading-none">
        {"Vous n'avez pas de compte ?"}
        <Button variant="tertiary" className="ml-1" onClick={switchFormType}>
          {" S'inscrire"}
        </Button>
      </p>
    </form>
  );
};
