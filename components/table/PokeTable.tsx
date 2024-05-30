"use client";
import { SPRITES_HOST } from "@/lib/constants";
import { NamedAPIResource, Pokemon } from "pokenode-ts";
import React, { FC, useMemo } from "react";
import PokeRow from "./PokeRow";

export type T_PokeTable = {
  data: Array<NamedAPIResource | Pokemon>;
};

export type T_PokeRowData = {
  name: string;
  url: string;
  image: string;
};

const PokeTable: FC<T_PokeTable> = ({ data }) => {
  const processedData: T_PokeRowData[] = useMemo(() => {
    return data.map((data) => {
      let img = "";
      if ("url" in data) {
        // build the image url without calling the api with all the data
        const urlSplit = data.url.split("/");
        const imgId = urlSplit[urlSplit.length - 2];
        img = `${SPRITES_HOST}/${imgId}.png`;
      } else {
        img = data.sprites.front_default || "/pokemon_ball.png";
      }

      return {
        name: data.name,
        url: `/${data.name}`,
        image: img,
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
