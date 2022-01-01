import { DisplayComments } from "@components/organisms/DisplayComments";
import { Footer } from "@components/organisms/Footer";
import { Header } from "@components/organisms/Header";
import { ProductDetail } from "@components/organisms/ProductDetail";
import { Ratings } from "@components/organisms/Ratings";
import { Product } from "@customTypes/product";
import { NextSeo } from "next-seo";
import { FC, Fragment } from "react";

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
        <div className="md:w-2/3">
          <DisplayComments productId={product._id} />
        </div>
      </section>
    </main>
    <Footer />
  </Fragment>
);
