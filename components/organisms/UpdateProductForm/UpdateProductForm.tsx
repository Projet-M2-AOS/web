import { Button } from "@components/atoms/Button";
import { TextAreaInput } from "@components/atoms/TextAreaInput";
import { TextInput } from "@components/atoms/TextInput";
import { Drawer } from "@components/molecules/Drawer";
import { Product } from "@customTypes/product";
import { deleteProduct } from "@lib/services/product/deleteProduct";
import { updateProduct } from "@lib/services/product/updateProduct";
import { useForm } from "@mantine/hooks";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { forwardRef, useCallback } from "react";

export type UpdateProductFormProps = {
  product: Product;
  hidden?: boolean;
  onClose?: () => void;
};

export const UpdateProductForm = forwardRef<
  HTMLDivElement,
  UpdateProductFormProps
>(({ hidden, onClose, product }, ref) => {
  const router = useRouter();
  const { data: session } = useSession();
  const form = useForm({
    initialValues: {
      name: product.title,
      imageUrl: product.imageUrls[0],
      price: product.price.toFixed(2),
      description: product.description,
    },
    validationRules: {
      name: (value) => value.length > 0,
      imageUrl: (value) => value.length > 0,
      description: (value) => value.length > 0,
      price: (value) => !isNaN(Number(value)),
    },
  });

  const onSubmitForm = useCallback(
    (name: string, imageUrl: string, price: number, description: string) => {
      if (session?.user.id)
        updateProduct(product._id, name, imageUrl, price, description).then(
          router.reload
        );
      else alert("Vous n'êtes pas connecté");
    },
    [product, router, session]
  );

  const onClickDelete = useCallback(() => {
    deleteProduct(product._id).then(() => router.push("/"));
  }, [product._id, router]);

  return (
    <Drawer ref={ref} hidden={hidden} onClose={onClose} title="Mon Avis">
      <form
        className="px-3 py-3 space-y-3"
        onSubmit={form.onSubmit(({ description, imageUrl, name, price }) => {
          onSubmitForm(name, imageUrl, Number(price), description);
        })}
      >
        <TextInput
          label="Nom du produit"
          error={Boolean(form.errors.name)}
          value={form.values.name}
          onChange={(e) => form.setFieldValue("name", e.currentTarget.value)}
        />
        {/* <TextInput
          label="Image du produit (URL)"
          error={Boolean(form.errors.imageUrl)}
          value={form.values.imageUrl}
          onChange={(e) =>
            form.setFieldValue("imageUrl", e.currentTarget.value)
          }
        /> */}
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
        <Button padding="px-3 py-2" widthFull type="submit">
          Modifier le produit
        </Button>
      </form>
      <div className="px-3">
        <Button
          variant="secondary"
          padding="px-3 py-2"
          widthFull
          onClick={onClickDelete}
        >
          Supprimer le produit
        </Button>
      </div>
    </Drawer>
  );
});

UpdateProductForm.displayName = "UpdateProductForm";
