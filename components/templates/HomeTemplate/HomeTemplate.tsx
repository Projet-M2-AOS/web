import { GridCards } from "@components/atoms/GridCards";
import { Section } from "@components/atoms/Section";
import {
  ProductCard,
  ProductCardProps,
} from "@components/molecules/ProductCard";
import { Footer } from "@components/organisms/Footer";
import { Header } from "@components/organisms/Header";
import { NextSeo } from "next-seo";
import { FC, Fragment } from "react";

export type HomeTemplateProps = {
  bestProducts?: ProductCardProps[];
  newProducts?: ProductCardProps[];
};

export const HomeTemplate: FC<HomeTemplateProps> = ({
  bestProducts = [],
  newProducts = [],
}) => (
  <Fragment>
    <NextSeo title="AOShop - Page d'accueil" />
    <Header />
    <main className="pt-4 pb-8 space-y-6">
      <Section title="Meilleures ventes">
        <GridCards>
          {bestProducts.slice(0, 4).map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </GridCards>
      </Section>
      <Section title="Nouveautés">
        <GridCards>
          {newProducts.slice(0, 4).map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </GridCards>
      </Section>
    </main>
    <Footer />
  </Fragment>
);
