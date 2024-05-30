import { NamedAPIResource } from "pokenode-ts";
import { POKEMON_MAX_COUNT } from "./constants";

export function filterPokemonsByName(
  pokemons: NamedAPIResource[],
  val: string
) {
  // at ~1300 length the performance of a normal for loop should be better than .filter()
  const results = [];
  for (let i = 0; i < pokemons.length; i++) {
    if (results.length <= POKEMON_MAX_COUNT && pokemons[i].name.includes(val)) {
      results.push(pokemons[i]);
    }
  }

  return results;
}
