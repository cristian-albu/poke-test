"use client";
import { SPRITES_HOST } from "@/lib/constants";
import { NamedAPIResource } from "pokenode-ts";
import React, { FC, useMemo } from "react";
import PokeRow from "./PokeRow";

export type T_PokeTable = {
  data: NamedAPIResource[];
};

export type T_PokeRowData = {
  name: string;
  url: string;
  image: string;
};

const PokeTable: FC<T_PokeTable> = ({ data }) => {
  const processedData: T_PokeRowData[] = useMemo(() => {
    return data.map(({ name, url }) => {
      // build the image url without calling the api with all the data
      const urlSplit = url.split("/");
      const imgId = urlSplit[urlSplit.length - 2];

      return {
        name: name,
        url: `/${name}`,
        image: `${SPRITES_HOST}/${imgId}.png`,
      };
    });
  }, [data]);

  return (
    <div className="w-full flex flex-col justify-start items-start">
      {processedData.map((row) => (
        <PokeRow key={row.name} data={row} />
      ))}
    </div>
  );
};

export default PokeTable;
