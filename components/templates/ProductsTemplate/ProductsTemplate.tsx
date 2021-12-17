import { GridCards } from "@components/atoms/GridCards";
import { Link } from "@components/atoms/Link";
import { ProductCard } from "@components/molecules/ProductCard";
import { Footer } from "@components/organisms/Footer";
import { Header } from "@components/organisms/Header";
import HomeData from "data/HomeData";
import { NextSeo } from "next-seo";
import { FC, Fragment } from "react";

export const ProductsTemplate: FC = () => {
  return (
    <Fragment>
      <NextSeo title="AOShop - Produits" />
      <Header />
      <main className="container py-4">
        <h1 className="text-3xl">Tous nos produits</h1>
        <GridCards className="py-4">
          {HomeData.products
            .concat(HomeData.products)
            .concat(HomeData.products)
            .concat(HomeData.products)
            .concat(HomeData.products)
            .concat(HomeData.products)
            .map((product, index) => (
              <Link key={index}>
                <ProductCard {...product} />
              </Link>
            ))}
        </GridCards>
      </main>
      <Footer />
    </Fragment>
  );
};
