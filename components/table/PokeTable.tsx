"use client";
import { SPRITES_HOST } from "@/lib/constants";
import React, { FC, useMemo } from "react";
import PokeRow from "./PokeRow";
import { T_PokemonResource } from "@/views/home-view/HomeView";

export type T_PokeTable = {
  data: Array<T_PokemonResource>;
};

export type T_PokeRowData = {
  name: string;
  url: string;
  image: string;
  type: string;
};

const PokeTable: FC<T_PokeTable> = ({ data }) => {
  const processedData: T_PokeRowData[] = useMemo(() => {
    return data.map((data) => {
      let img = "";
      // build the image url without calling the api with all the data
      const urlSplit = data.pokemon.url.split("/");
      const imgId = urlSplit[urlSplit.length - 2];
      img = `${SPRITES_HOST}/${imgId}.png`;

      return {
        name: data.pokemon.name,
        url: `/${data.pokemon.name}`,
        image: img,
        type: data.type,
      };
    });
  }, [data]);

  return (
    <div className="w-full flex flex-col justify-start items-start">
      {processedData.length === 0 && <p>No pokemons found...</p>}
      {processedData.map((row) => (
        <PokeRow key={row.name} data={row} />
      ))}
    </div>
  );
};

export default PokeTable;
