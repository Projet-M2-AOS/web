import { redirectIfUnauthenticated } from "@components/hoc/redirectIfUnauthenticated";
import { Product } from "@customTypes/product";
import axios from "axios";
import { GetServerSideProps, NextPage } from "next";

const RandomPage: NextPage = () => null;

export const getServerSideProps: GetServerSideProps = async () => {
  const productID = await axios
    .get<Product[]>(`${process.env.NEXT_PUBLIC_GATEWAY_URL}/products`)
    .then(async ({ data }) => {
      return data[Math.floor(Math.random() * data.length)]._id;
    })
    .catch(() => []);

  return {
    redirect: {
      permanent: false,
      destination: "/products/" + productID,
    },
  };
};

export default redirectIfUnauthenticated(RandomPage);
