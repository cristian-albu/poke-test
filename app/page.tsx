import client from "@/lib/client";
import { POKEMON_LIST_OFFSET } from "@/lib/constants";
import HomeView from "@/views/home-view/HomeView";
import React from "react";

const HomePage = async () => {
  const initialPokemons = await client.listPokemons(0, POKEMON_LIST_OFFSET);

  return <HomeView initialData={initialPokemons} />;
};

export default HomePage;
