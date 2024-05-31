"use client";
import Filter from "@/components/filter/Filter";
import {
  T_FilterDataCheckbox,
  T_InitialFilterDataArr,
} from "@/components/filter/types";
import { TextInput } from "@/components/inputs";
import { Container, Section } from "@/components/layout";
import { PokeTable } from "@/components/table";
import { POKEMON_MAX_COUNT } from "@/lib/constants";
import { filterPokemonsByName } from "@/lib/filterPokemons";
import { NamedAPIResource, Pokemon } from "pokenode-ts";
import React, { FC, useMemo, useState } from "react";
import { FaSearch } from "react-icons/fa";

export type T_PokemonResource = { pokemon: NamedAPIResource; type: string };

export type T_HomeView = {
  initialData: T_PokemonResource[][];
};

const HomeView: FC<T_HomeView> = ({ initialData }) => {
  const { allPokemons, initialFilterDataArr } = useMemo(() => {
    const pokemons = initialData
      .map((e) => e)
      .flat(1)
      .sort((a, b) => {
        if (a.pokemon.url < b.pokemon.url) return -1;
        if (a.pokemon.url > b.pokemon.url) return 1;
        return 0;
      });

    const pokemonTypesFilterData: T_FilterDataCheckbox = {
      type: "checkbox",
      contents: initialData
        .filter((e) => e[0]?.type)
        .map((e) => ({
          label: e[0]?.type,
          default: false,
        })),
    };

    const initialFilterDataArr: T_InitialFilterDataArr = [
      ["Pokemon types", pokemonTypesFilterData],
    ];
    return {
      allPokemons: pokemons,
      initialFilterDataArr: initialFilterDataArr,
    };
  }, [initialData]);

  console.log(allPokemons.length);
  const pageData = allPokemons.slice(0, POKEMON_MAX_COUNT);

  const [displayData, setDisplayData] =
    useState<Array<T_PokemonResource>>(pageData);

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
        <Filter initialFilterDataArr={initialFilterDataArr} />
        <PokeTable data={displayData} />
      </Container>
    </Section>
  );
};

export default HomeView;
