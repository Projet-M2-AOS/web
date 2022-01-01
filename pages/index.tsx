import { redirectIfUnauthenticated } from "@components/hoc/redirectIfUnauthenticated";
import { ProductCardProps } from "@components/molecules/ProductCard";
import {
  HomeTemplate,
  HomeTemplateProps,
} from "@components/templates/HomeTemplate";
import axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import { Product } from "types/product";

const Home: NextPage<HomeTemplateProps> = (props) => (
  <HomeTemplate {...props} />
);

export const getServerSideProps: GetServerSideProps<
  HomeTemplateProps
> = async () => {
  const [bestProducts, newProducts]: ProductCardProps[][] = await axios
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
      return [products.slice(0, 4), products.slice(-4)];
    })
    .catch(() => [[], []]);

  return {
    props: {
      bestProducts,
      newProducts,
    },
  };
};

export default redirectIfUnauthenticated(Home);
