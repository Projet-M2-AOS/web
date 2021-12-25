import { GridCards } from "@components/atoms/GridCards";
import { Link } from "@components/atoms/Link";
import { ProductCard } from "@components/molecules/ProductCard";
import { Footer } from "@components/organisms/Footer";
import { Header } from "@components/organisms/Header";
import HomeData from "data/HomeData";
import { NextSeo } from "next-seo";
import { FC, Fragment } from "react";

export const ProductsTemplate: FC = () => (
  <Fragment>
    <NextSeo title="AOShop - Produits" />
    <Header />
    <main className="container pt-4 pb-8">
      <h1 className="pb-1 mb-5 text-2xl border-b-2 border-neutral-200">
        Tous nos produits
      </h1>
      <GridCards>
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
