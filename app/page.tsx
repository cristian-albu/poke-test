import client from "@/lib/client";
import HomeView from "@/views/home-view/HomeView";
import { Type } from "pokenode-ts";
import React from "react";

async function fetchAllPokemons() {
  // Fetch the total count of types
  const { count } = await client.listTypes(0, 1);
  // Fetch all types at once
  const allTypes = await client.listTypes(0, count);

  // Fetch details of each type in parallel
  const allTypesNames = allTypes.results.map((type) =>
    client.getTypeByName(type.name)
  );

  // Each type has a list of pokemons. The listAllPokemons client method does not contain the "type".
  // This makes only ~20 api calls compared to ~1300 for each item.
  const allPokemonsGroupedByTypes = await Promise.all(allTypesNames);
  return allPokemonsGroupedByTypes;
}

function processPokemons(groups: Type[]) {
  const types = groups.map((group) => group.name);

  const pokemons = groups
    .flatMap((group) =>
      group.pokemon.map((item) => ({
        pokemon: item.pokemon,
        type: group.name,
      }))
    )
    .sort((a, b) => a.pokemon.name.localeCompare(b.pokemon.name));

  const pokemonMap = new Map();

  // Handle duplicates and multiple types
  for (const item of pokemons) {
    const pokemonName = item.pokemon.name;
    if (pokemonMap.has(pokemonName)) {
      pokemonMap.get(pokemonName).type += `, ${item.type}`;
    } else {
      pokemonMap.set(pokemonName, item);
    }
  }

  return { allPokemons: Array.from(pokemonMap.values()), types };
}

const HomePage = async () => {
  const allPokemonsGroupedByTypes = await fetchAllPokemons();
  const { allPokemons, types } = processPokemons(allPokemonsGroupedByTypes);

  return <HomeView initialData={allPokemons} types={types} />;
};

export default HomePage;
