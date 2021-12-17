import { GridCards } from "@components/atoms/GridCards";
import { Link } from "@components/atoms/Link";
import { ImageCard } from "@components/molecules/ImageCard";
import { Footer } from "@components/organisms/Footer";
import { Header } from "@components/organisms/Header";
import HomeData from "data/HomeData";
import { NextSeo } from "next-seo";
import { FC, Fragment } from "react";

export const CategoriesTemplate: FC = () => {
  return (
    <Fragment>
      <NextSeo title="AOShop - Catégories" />
      <Header />
      <main className="container py-4">
        <h1 className="text-3xl">Toutes les catégories</h1>
        <GridCards className="py-4">
          {HomeData.categories
            .concat(HomeData.categories)
            .concat(HomeData.categories)
            .concat(HomeData.categories)
            .concat(HomeData.categories)
            .concat(HomeData.categories)
            .map((category, index) => (
              <Link key={index}>
                <ImageCard {...category} />
              </Link>
            ))}
        </GridCards>
      </main>
      <Footer />
    </Fragment>
  );
};
