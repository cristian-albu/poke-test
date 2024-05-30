import React from "react";
import { notFound } from "next/navigation";
import client from "@/lib/client";
import PokemonView from "@/views/pokemon-view/PokemonView";

const DynamicPokemonPage = async ({ params }: { params: { name: string } }) => {
  const pokemon = await client.getPokemonByName(params.name);

  if (!pokemon) {
    notFound();
  }

  //   const species = (await client.getPokemonSpeciesByName(pokemon.species.name))
  //     .evolution_chain;

  //   if (!species) {
  //     notFound();
  //   }

  return <PokemonView data={pokemon} />;
};

export default DynamicPokemonPage;
