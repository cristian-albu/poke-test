import React from "react";
import client from "@/client";

const HomePage = async () => {
  const pokemons = await client.listPokemons(0, 30);
  console.log(pokemons);

  return <div>HomePage</div>;
};

export default HomePage;
