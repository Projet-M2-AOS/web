import { Button } from "@components/atoms/Button";
import { TextInput } from "@components/atoms/TextInput";
import type { FC } from "react";

export const AuthForm: FC = () => {
  return (
    <form
      className="flex flex-col items-center w-full max-w-sm px-4 pt-5 pb-4 space-y-4 bg-white border rounded-md border-neutral-200"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <TextInput label="Adresse email" type="email" />
      <TextInput label="Mot de passe" type="password" />
      <Button widthFull type="submit">
        Connexion
      </Button>
      <p className="leading-none">
        {"Vous n'avez pas de compte ?"}
        <Button variant="tertiary" className="ml-1">
          {" S'inscrire"}
        </Button>
      </p>
    </form>
  );
};
