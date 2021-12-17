import { GridCards } from "@components/atoms/GridCards";
import { Link } from "@components/atoms/Link";
import { Section } from "@components/atoms/Section";
import { ImageCard } from "@components/molecules/ImageCard";
import { ProductCard } from "@components/molecules/ProductCard";
import { Footer } from "@components/organisms/Footer";
import { Header } from "@components/organisms/Header";
import HomeData from "data/HomeData";
import { NextSeo } from "next-seo";
import { FC, Fragment } from "react";

export const HomeTemplate: FC = () => {
  return (
    <Fragment>
      <NextSeo title="AOShop - Page d'accueil" />
      <Header />
      <main className="pt-4 pb-8 space-y-6">
        <Section title="Catégories">
          <GridCards className="pt-4">
            {HomeData.categories.map((category, index) => (
              <Link key={index}>
                <ImageCard {...category} />
              </Link>
            ))}
          </GridCards>
        </Section>
        <Section title="Meilleures ventes">
          <GridCards className="pt-4">
            {HomeData.products.map((product, index) => (
              <Link key={index}>
                <ProductCard {...product} />
              </Link>
            ))}
          </GridCards>
        </Section>
        <Section title="Nouveautés">
          <GridCards className="pt-4">
            {HomeData.products.map((product, index) => (
              <Link key={index}>
                <ProductCard {...product} />
              </Link>
            ))}
          </GridCards>
        </Section>
      </main>
      <Footer />
    </Fragment>
  );
};
