"use client";
import Filter from "@/components/filter/Filter";
import {
  T_FilterDataCheckbox,
  T_FilterState,
  T_InitialFilterDataArr,
} from "@/components/filter/types";
import useFilterContext from "@/components/filter/useFilterContext";
import { TextInput } from "@/components/inputs";
import { Container, Section } from "@/components/layout";
import { PokeTable } from "@/components/table";
import { POKEMON_MAX_COUNT } from "@/lib/constants";
import {
  filterPokemonsByName,
  filterPokemonsByType,
} from "@/lib/filterPokemons";
import { NamedAPIResource } from "pokenode-ts";
import React, { FC, useEffect, useMemo, useState } from "react";
import { FaSearch } from "react-icons/fa";

export type T_PokemonResource = { pokemon: NamedAPIResource; type: string };

export type T_HomeView = {
  initialData: T_PokemonResource[];
  types: string[];
};

const HomeView: FC<T_HomeView> = ({ initialData, types }) => {
  const { allPokemons, initialFilterDataArr } = useMemo(() => {
    const pokemons = initialData;

    const pokemonTypesFilterData: T_FilterDataCheckbox = {
      type: "checkbox",
      contents: types.map((e) => ({
        label: e,
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
  }, [initialData, types]);

  const { filterData, searchValue, setSearchValue } = useFilterContext();

  const [searchData, setSearchData] = useState<T_PokemonResource[]>([]);
  const [filteredData, setFilteredData] = useState<T_PokemonResource[]>([]);

  const handleCancelSearch = () => {
    setSearchData([]);
  };

  const handleSearch = (val: string) => {
    setSearchValue(val);
  };

  useEffect(() => {
    if (filterData) {
      const filtered = filterPokemonsByType(allPokemons, filterData);
      filtered && setFilteredData(filtered);
    }

    if (searchValue) {
      const searchResults = filterPokemonsByName(allPokemons, searchValue);
      setSearchData(searchResults);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterData, searchValue]);

  const createTableData = () => {
    if (searchData.length === 0 && filteredData.length === 0) {
      return allPokemons.slice(0, POKEMON_MAX_COUNT);
    } else if (searchData.length === 0) {
      return filteredData.slice(0, POKEMON_MAX_COUNT);
    } else if (filteredData.length === 0) {
      return searchData.slice(0, POKEMON_MAX_COUNT);
    } else {
      const filterted = filteredData.filter((filterItem) =>
        searchData.some(
          (searchItem) => filterItem.pokemon.name === searchItem.pokemon.name
        )
      );

      return filterted.slice(0, POKEMON_MAX_COUNT);
    }
  };

  return (
    <Section>
      <Container>
        <div className="w-full pt-[5rem] pb-5">
          <h1 className="text-4xl">Pokemon app</h1>
        </div>

        <TextInput
          icon={<FaSearch />}
          name="search"
          aria-label="search"
          buttonCallback={handleSearch}
          handleCancel={handleCancelSearch}
        />
        <Filter initialFilterDataArr={initialFilterDataArr} />
        <PokeTable data={createTableData()} />
      </Container>
    </Section>
  );
};

export default HomeView;
