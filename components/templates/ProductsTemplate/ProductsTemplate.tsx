import { GridCards } from "@components/atoms/GridCards";
import {
  ProductCard,
  ProductCardProps,
} from "@components/molecules/ProductCard";
import { Footer } from "@components/organisms/Footer";
import { Header } from "@components/organisms/Header";
import { NextSeo } from "next-seo";
import { FC, Fragment } from "react";

export type ProductsTemplateProps = {
  title: string;
  products: ProductCardProps[];
};

export const ProductsTemplate: FC<ProductsTemplateProps> = ({
  title,
  products,
}) => (
  <Fragment>
    <NextSeo title="AOShop - Produits" />
    <Header />
    <main className="container pt-4 pb-8">
      <h1 className="pb-1 mb-5 text-2xl border-b-2 border-neutral-200">
        {title}
      </h1>
      <GridCards>
        {products.map((product) => (
          <ProductCard key={product.productID} {...product} />
        ))}
      </GridCards>
    </main>
    <Footer />
  </Fragment>
);
