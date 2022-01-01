import { Button } from "@components/atoms/Button";
import { Checkbox } from "@components/atoms/Checkbox";
import { TextInput } from "@components/atoms/TextInput";
import { Drawer } from "@components/molecules/Drawer";
import { ProductList } from "@customTypes/productList";
import { createProductList } from "@lib/services/productList/createProductList";
import { getProductLists } from "@lib/services/productList/getProductLists";
import { toggleItemProductList } from "@lib/services/productList/toggleItemProductList";
import { useForm } from "@mantine/hooks";
import { useSession } from "next-auth/react";
import { forwardRef, useCallback, useEffect, useState } from "react";

export type WishListProps = {
  productId: string;
  hidden?: boolean;
  onClose?: () => void;
};

export const WishList = forwardRef<HTMLDivElement, WishListProps>(
  ({ hidden, onClose, productId }, ref) => {
    const createListForm = useForm({
      initialValues: {
        listName: "",
      },
      validationRules: {
        listName: (value) => value.length > 0,
      },
    });
    const { data: session } = useSession();
    const [wishLists, setWishLists] = useState<ProductList[]>([]);

    const getWishLists = useCallback(() => {
      if (session?.user.id && !hidden) getProductLists().then(setWishLists);
    }, [session, hidden]);

    const addWishList = useCallback(
      (name: string) => {
        if (session?.user.id)
          createProductList(session.user.id, name).then(getWishLists);
        else alert("Vous n'êtes pas connecté");
      },
      [session, getWishLists]
    );

    const toggleProduct = useCallback(
      (listId: string) => {
        if (session?.user.id)
          toggleItemProductList(session.user.id, listId, productId).then(
            getWishLists
          );
        else alert("Vous n'êtes pas connecté");
      },
      [getWishLists, productId, session]
    );

    useEffect(getWishLists, [getWishLists]);

    return (
      <Drawer
        ref={ref}
        hidden={hidden}
        onClose={onClose}
        title="Mes listes d'envies"
        className="divide-y divide-neutral-200"
      >
        <form
          className="px-3 py-3 space-y-3"
          onSubmit={createListForm.onSubmit(({ listName }) => {
            addWishList(listName);
            createListForm.reset();
          })}
        >
          <TextInput
            label="Ajouter une liste"
            placeholder="Nom de la liste"
            error={Boolean(createListForm.errors.listName)}
            value={createListForm.values.listName}
            onChange={(e) =>
              createListForm.setFieldValue("listName", e.currentTarget.value)
            }
          />
          <Button padding="px-3 py-2" widthFull type="submit">
            Créer
          </Button>
        </form>
        <div className="p-3">
          {wishLists.length === 0 && (
            <p>{"Vous n'avez aucune liste d'envies"}</p>
          )}
          <ul className="space-y-3 font-normal">
            {wishLists.map((wishList, index) => (
              <li
                className="relative flex items-center gap-2 cursor-pointer"
                key={index.toString() + wishList._id}
                onClick={() => toggleProduct(wishList._id)}
              >
                <Checkbox
                  checked={wishList.products.includes(productId)}
                  readOnly
                />
                <span className="flex-1">{wishList.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </Drawer>
    );
  }
);

WishList.displayName = "WishList";
