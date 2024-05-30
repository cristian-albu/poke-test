import client from "@/lib/client";
import { POKEMON_MAX_COUNT } from "@/lib/constants";
import HomeView from "@/views/home-view/HomeView";
import { NamedAPIResource } from "pokenode-ts";
import React from "react";

async function fetchAllPokemons() {
  const { count } = await client.listPokemons(0, 1);
  const data = await client.listPokemons(0, count);

  return data;
}

const HomePage = async () => {
  const pokemons = await fetchAllPokemons();

  return <HomeView initialData={pokemons.results} />;
};

export default HomePage;
