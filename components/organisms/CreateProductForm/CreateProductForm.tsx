import { Button } from "@components/atoms/Button";
import { ListItems } from "@components/atoms/ListItems";
import { TextAreaInput } from "@components/atoms/TextAreaInput";
import { TextInput } from "@components/atoms/TextInput";
import { Role } from "@customTypes/user";
import { createProduct } from "@lib/services/product/createProduct";
import { useForm } from "@mantine/hooks";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FC, useCallback } from "react";

export const CreateProductForm: FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const form = useForm({
    initialValues: {
      name: "",
      imageUrl: "",
      price: "",
      description: "",
    },
    validationRules: {
      name: (value) => value.length > 0,
      imageUrl: (value) => value.length > 0,
      description: (value) => value.length > 0,
      price: (value) => !isNaN(Number(value)),
    },
  });

  const submitProduct = useCallback(
    (name: string, imageUrl: string, price: number, description: string) => {
      createProduct(name, imageUrl, price, description)
        .then((products) => products[0])
        .then((product) => router.push("/products/" + product._id));
    },
    [router]
  );

  if (session?.user.role !== Role.ADMIN) return null;
  else
    return (
      <ListItems className="w-full max-w-3xl bg-white">
        <h2 className="p-2.5 text-xl text-center">Créer un produit</h2>
        <form
          className="p-4 space-y-3"
          onSubmit={form.onSubmit(({ description, imageUrl, name, price }) => {
            submitProduct(name, imageUrl, Number(price), description);
          })}
        >
          <TextInput
            label="Nom du produit"
            error={Boolean(form.errors.name)}
            value={form.values.name}
            onChange={(e) => form.setFieldValue("name", e.currentTarget.value)}
          />
          <TextInput
            label="Image du produit (URL)"
            error={Boolean(form.errors.imageUrl)}
            value={form.values.imageUrl}
            onChange={(e) =>
              form.setFieldValue("imageUrl", e.currentTarget.value)
            }
          />
          <TextInput
            type="number"
            label="Prix du produit"
            error={Boolean(form.errors.price)}
            value={form.values.price}
            onChange={(e) => form.setFieldValue("price", e.currentTarget.value)}
          />
          <TextAreaInput
            label="Description du produit"
            error={Boolean(form.errors.description)}
            value={form.values.description}
            onChange={(e) =>
              form.setFieldValue("description", e.currentTarget.value)
            }
          />
          <Button type="submit" widthFull>
            Valider
          </Button>
        </form>
      </ListItems>
    );
};
