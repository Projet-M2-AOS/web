import { redirectIfUnauthenticated } from "@components/hoc/redirectIfUnauthenticated";
import { ProductCardProps } from "@components/molecules/ProductCard";
import {
  ProductsTemplate,
  ProductsTemplateProps,
} from "@components/templates/ProductsTemplate";
import axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import { Product } from "types/product";

const Products: NextPage<ProductsTemplateProps> = (props) => (
  <ProductsTemplate {...props} />
);

export const getServerSideProps: GetServerSideProps<
  ProductsTemplateProps
> = async () => {
  const products: ProductCardProps[] = await axios
    .get<Product[]>(`${process.env.NEXT_PUBLIC_GATEWAY_URL}/products`)
    .then(({ data }) => {
      const products = data.map<ProductCardProps>((e) => ({
        productID: e._id,
        title: e.title,
        description: e.description,
        price: e.price,
        imageUrl: e.imageUrls[0],
        notation: 2,
      }));
      return products;
    })
    .catch(() => []);

  return {
    props: {
      products,
    },
  };
};

export default redirectIfUnauthenticated(Products);
