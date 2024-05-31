"use client";
import { TextInput } from "@/components/inputs";
import { Container, Section } from "@/components/layout";
import { PokeTable } from "@/components/table";
import client from "@/lib/client";
import { POKEMON_MAX_COUNT } from "@/lib/constants";
import { filterPokemonsByName } from "@/lib/filterPokemons";
import { NamedAPIResource, Pokemon } from "pokenode-ts";
import React, { FC, useMemo, useState } from "react";
import { FaSearch } from "react-icons/fa";

export type T_HomeView = {
  initialData: {
    pokemons: NamedAPIResource[];
    type: string;
  }[];
};

const HomeView: FC<T_HomeView> = ({ initialData }) => {
  const allPokemons = useMemo(
    () => initialData.map((e) => e.pokemons).flat(1),
    [initialData]
  );

  const pageData = allPokemons.slice(0, POKEMON_MAX_COUNT);

  const [displayData, setDisplayData] =
    useState<Array<NamedAPIResource | Pokemon>>(pageData);

  const handleCancelSearch = () => {
    setDisplayData(pageData);
  };

  const handleSearch = async (val: string) => {
    const result = filterPokemonsByName(allPokemons, val);
    setDisplayData(result);
  };

  return (
    <Section>
      <Container>
        <TextInput
          icon={<FaSearch />}
          buttonCallback={handleSearch}
          handleCancel={handleCancelSearch}
        />
        <PokeTable data={displayData} />
      </Container>
    </Section>
  );
};

export default HomeView;
