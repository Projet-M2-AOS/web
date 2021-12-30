import {
  ViewProductTemplate,
  ViewProductTemplateProps,
} from "@components/templates/ViewProductTemplate";
import axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import { Product } from "types/product";

const ViewProduct: NextPage<ViewProductTemplateProps> = (props) => (
  <ViewProductTemplate {...props} />
);

export const getServerSideProps: GetServerSideProps<
  ViewProductTemplateProps
> = async ({ params }) => {
  const productID = typeof params?.id === "string" && params.id;

  try {
    if (!productID) throw new Error("Product ID missing");
    const product = await axios
      .get<Product[]>(`${process.env.NEXT_PUBLIC_GATEWAY_URL}/products`)
      .then(({ data }) => data.find(({ _id }) => _id === productID));
    if (!product) throw new Error("Product Not Found");

    return {
      props: {
        product: product,
      },
    };
  } catch {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
};

export default ViewProduct;
