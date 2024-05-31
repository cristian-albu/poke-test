"use client";
import Filter from "@/components/filter/Filter";
import {
  T_FilterDataCheckbox,
  T_FilterState,
  T_InitialFilterDataArr,
} from "@/components/filter/types";
import useFilterContext from "@/components/filter/useFilterContext";
import { TextInput } from "@/components/inputs";
import { Button, Container, Section } from "@/components/layout";
import { PokeTable } from "@/components/table";
import { POKEMON_MAX_COUNT } from "@/lib/constants";
import {
  filterPokemonsByName,
  filterPokemonsByType,
} from "@/lib/filterPokemons";
import { NamedAPIResource } from "pokenode-ts";
import React, { FC, useEffect, useMemo, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdCatchingPokemon } from "react-icons/md";

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
  const [batchIndex, setBatchIndex] = useState(0);
  const [searchData, setSearchData] = useState<T_PokemonResource[]>([]);
  const [filteredData, setFilteredData] = useState<T_PokemonResource[]>([]);

  const handleCancelSearch = () => {
    setSearchData([]);
  };

  const handleSearch = (val: string) => {
    setSearchValue(val);
  };

  const handleNextBatch = () => {
    if (batchIndex <= initialData.length) {
      setBatchIndex((prev) => prev + POKEMON_MAX_COUNT);
    }
  };

  const handlePrevBatch = () => {
    if (batchIndex >= POKEMON_MAX_COUNT) {
      setBatchIndex((prev) => prev - POKEMON_MAX_COUNT);
    }
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
      return allPokemons.slice(batchIndex, batchIndex + POKEMON_MAX_COUNT);
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
    <Section className="bg-[url('/background_1.png')] bg-cover">
      <Container className="mb-5">
        <div className="w-full pt-[5rem] pb-1 flex flex-wrap">
          <h1 className="text-xl md:text-4xl text-white mb-2 py-3 px-4 bg-black rounded-lg flex gap-3 items-center">
            <MdCatchingPokemon />
            Pokemon app
          </h1>
          <p className="w-full text-white mb-5">
            This app searches and filters {initialData.length} pokemons. You can
            click any one of them and see more details.
          </p>
        </div>
        <div className="w-full flex items-center gap-5 mb-5 flex-wrap md:flex-nowrap">
          <TextInput
            icon={<FaSearch />}
            name="search"
            aria-label="search"
            buttonCallback={handleSearch}
            handleCancel={handleCancelSearch}
            defaultValue={searchValue}
          />
          <Filter initialFilterDataArr={initialFilterDataArr} />
        </div>
      </Container>
      <Container className="bg-white/80 backdrop-blur-md p-5 rounded-lg">
        <PokeTable data={createTableData()} />
        <div className="w-full flex justify-between items-center">
          <Button onClick={handlePrevBatch}>Previous</Button>
          <Button onClick={handleNextBatch}>Next</Button>
        </div>
      </Container>
    </Section>
  );
};

export default HomeView;
