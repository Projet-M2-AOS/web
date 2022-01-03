import { Button } from "@components/atoms/Button";
import { DateInput } from "@components/atoms/DateInput";
import { TextInput } from "@components/atoms/TextInput";
import { useForm } from "@mantine/hooks";
import axios from "axios";
import type { FC } from "react";

export type SignUpFormProps = {
  switchFormType: () => void;
};

export const SignUpForm: FC<SignUpFormProps> = ({ switchFormType }) => {
  const form = useForm({
    initialValues: {
      birthDate: new Date(),
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      mail: "",
      password: "",
    },
    validationRules: {
      birthDate: (value) =>
        value instanceof Date && value.getTime() < new Date().getTime(),
      firstName: (value) => value.length > 0,
      lastName: (value) => value.length > 0,
      address: (value) => value.length > 0,
      phoneNumber: (value) => value.length > 0,
      mail: (value) => value.length > 0,
      password: (value) => value.length > 0,
    },
  });

  return (
    <form
      className="flex flex-col items-center w-full max-w-sm px-4 pt-5 pb-4 space-y-4 bg-white border rounded-md border-neutral-200"
      onSubmit={form.onSubmit((userInfo) =>
        axios
          .post(`/api/users`, [{ ...userInfo }])
          .then(() => alert("Votre compte a été créé"))
          .then(switchFormType)
          .catch(() => alert("Votre compte n'a pas pu être créé"))
      )}
    >
      <TextInput
        label="Adresse email"
        type="email"
        error={Boolean(form.errors.mail)}
        value={form.values.mail}
        onChange={(event) =>
          form.setFieldValue("mail", event.currentTarget.value)
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
      <TextInput
        label="Prénom"
        type="text"
        error={Boolean(form.errors.firstName)}
        value={form.values.firstName}
        onChange={(event) =>
          form.setFieldValue("firstName", event.currentTarget.value)
        }
      />
      <TextInput
        label="Nom de famille"
        type="text"
        error={Boolean(form.errors.lastName)}
        value={form.values.lastName}
        onChange={(event) =>
          form.setFieldValue("lastName", event.currentTarget.value)
        }
      />
      <TextInput
        label="Adresse"
        type="text"
        error={Boolean(form.errors.address)}
        value={form.values.address}
        onChange={(event) =>
          form.setFieldValue("address", event.currentTarget.value)
        }
      />
      <TextInput
        label="Numéro de téléphone"
        type="tel"
        error={Boolean(form.errors.phoneNumber)}
        value={form.values.phoneNumber}
        onChange={(event) =>
          form.setFieldValue("phoneNumber", event.currentTarget.value)
        }
      />
      <DateInput
        label="Date de naissance"
        error={Boolean(form.errors.birthDate)}
        value={new Date()}
        onChange={(event) =>
          form.setFieldValue("birthDate", new Date(event.currentTarget.value))
        }
      />
      <Button widthFull type="submit">
        Inscription
      </Button>
      <p className="leading-none">
        {"Vous avez déjà un compte ?"}
        <Button variant="tertiary" className="ml-1" onClick={switchFormType}>
          {" Se connecter"}
        </Button>
      </p>
    </form>
  );
};
