import { ListItems } from "@components/atoms/ListItems";
import { Comment } from "@components/molecules/Comment";
import { Footer } from "@components/organisms/Footer";
import { Header } from "@components/organisms/Header";
import { ProductDetail } from "@components/organisms/ProductDetail";
import { Ratings } from "@components/organisms/Ratings";
import { NextSeo } from "next-seo";
import { FC, Fragment } from "react";
import { Product } from "types/product";

export type ViewProductTemplateProps = {
  product: Product;
};

export const ViewProductTemplate: FC<ViewProductTemplateProps> = ({
  product,
}) => (
  <Fragment>
    <NextSeo title="AOShop - Page d'accueil" />
    <Header />
    <main className="py-6 space-y-6">
      <ProductDetail product={product} />
      <section className="container flex flex-col gap-4 md:flex-row md:items-start">
        <div className="flex justify-center md:w-1/3">
          <Ratings productId={product._id} />
        </div>
        <ListItems className="bg-white md:w-2/3">
          <h2 className="p-2.5 text-xl text-center">
            Commentaires des clients
          </h2>
          <Comment />
          <Comment />
          <Comment />
          <Comment />
        </ListItems>
        {/* <CommentForm /> */}
      </section>
    </main>
    <Footer />
  </Fragment>
);
