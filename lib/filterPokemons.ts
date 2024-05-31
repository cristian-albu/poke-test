import { T_FilterState } from "@/components/filter/types";
import { POKEMON_MAX_COUNT } from "./constants";
import { T_PokemonResource } from "@/views/home-view/HomeView";

export function filterPokemonsByName(
  pokemons: T_PokemonResource[],
  val: string
) {
  // at ~1300 length the performance of a normal for loop should be better than .filter()
  const results = [];
  for (let i = 0; i < pokemons.length; i++) {
    if (
      results.length <= POKEMON_MAX_COUNT &&
      pokemons[i].pokemon.name.includes(val)
    ) {
      results.push(pokemons[i]);
    }
  }

  return results;
}

export function filterPokemonsByType(
  pokemons: T_PokemonResource[],
  filterData: T_FilterState | null
) {
  if (filterData === null) {
    return null;
  }
  const activeFilters = Object.entries(filterData)
    .filter(([key, val]) => val === true)
    .map(([key]) => key);

  return pokemons.filter((item) =>
    activeFilters.some((filter) => item.type.toLowerCase().includes(filter))
  );
}
