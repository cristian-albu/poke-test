import client from "@/lib/client";
import HomeView from "@/views/home-view/HomeView";
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

  // Wait for all fetch operations to complete
  const allPokemonsGroupedByTypes = await Promise.all(allTypesNames);

  return allPokemonsGroupedByTypes.map((group) =>
    group.pokemon.map((item) => ({
      pokemon: item.pokemon,
      type: group.name,
    }))
  );
}

const HomePage = async () => {
  const pokemonGroups = await fetchAllPokemons();

  return <HomeView initialData={pokemonGroups} />;
};

export default HomePage;
