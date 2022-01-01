import { redirectIfUnauthenticated } from "@components/hoc/redirectIfUnauthenticated";
import { ProductCardProps } from "@components/molecules/ProductCard";
import {
  ProductsTemplate,
  ProductsTemplateProps,
} from "@components/templates/ProductsTemplate";
import { getProductRatingAverage } from "@lib/api/getProductRatingAverage";
import axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import { Product } from "types/product";

const NewProducts: NextPage<ProductsTemplateProps> = (props) => (
  <ProductsTemplate {...props} />
);

export const getServerSideProps: GetServerSideProps<
  ProductsTemplateProps
> = async () => {
  const products: ProductCardProps[] = await axios
    .get<Product[]>(`${process.env.NEXT_PUBLIC_GATEWAY_URL}/products`)
    .then(async ({ data }) => {
      const products = await Promise.all(
        data
          .slice(-12)
          .reverse()
          .map<Promise<ProductCardProps>>(async (e) => ({
            productID: e._id,
            title: e.title,
            description: e.description,
            price: e.price,
            imageUrl: e.imageUrls[0],
            notation: await getProductRatingAverage(e._id),
          }))
      );
      return products;
    })
    .catch(() => []);

  return {
    props: {
      title: "Nouveaux produits",
      products,
    },
  };
};

export default redirectIfUnauthenticated(NewProducts);
