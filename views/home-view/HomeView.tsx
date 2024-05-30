"use client";
import { Container, Section } from "@/components/layout";
import { PokeTable } from "@/components/table";
import { NamedAPIResourceList } from "pokenode-ts";
import React, { FC } from "react";

export type T_HomeView = {
  initialData: NamedAPIResourceList;
};
const HomeView: FC<T_HomeView> = ({ initialData }) => {
  const pokemonData = initialData.results;

  return (
    <Section>
      <Container>
        <PokeTable data={pokemonData} />
      </Container>
    </Section>
  );
};

export default HomeView;
